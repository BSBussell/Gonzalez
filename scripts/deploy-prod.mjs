import { execFileSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { loadEnv } from 'vite'

// Build in the source checkout; create the output commit with an isolated index.
// Never clear the source checkout or force-push deployment history.
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
const args = process.argv.slice(2)
if (args.some(arg => arg !== '--push')) throw new Error('Usage: npm run deploy:prod -- [--push]')
process.chdir(git('rev-parse', '--show-toplevel'))
if (git('branch', '--show-current') === 'prod') throw new Error('Run this command from your source branch, usually main.')
if (git('status', '--porcelain')) throw new Error('Commit or stash source changes before deploying.')
if (git('worktree', 'list', '--porcelain').split('\n').includes('branch refs/heads/prod')) {
  throw new Error('Switch any prod checkout to a source branch before deploying.')
}
const source = git('rev-parse', 'HEAD')
const ref = 'refs/heads/prod'
const exists = git('for-each-ref', '--format=%(objectname)', ref)
const parent = exists || git('for-each-ref', '--format=%(objectname)', 'refs/remotes/origin/prod')
let cname = ''
if (parent && git('ls-tree', '--name-only', parent, '--', 'CNAME')) cname = git('show', `${parent}:CNAME`)
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const publicCname = await readFile('public/CNAME', 'utf8').catch(error => {
  if (error.code !== 'ENOENT') throw error
  return ''
})
cname = publicCname.trim() || cname
if (!env.VITE_BASE_PATH) {
  if (cname || env.VITE_SITE_URL) env.VITE_BASE_PATH = '/'
  else {
    const remote = git('remote', 'get-url', 'origin')
    const match = remote.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/)
    if (!match) throw new Error('Set VITE_BASE_PATH explicitly for a non-GitHub origin.')
    env.VITE_BASE_PATH = match[2].toLowerCase() === `${match[1].toLowerCase()}.github.io` ? '/' : `/${match[2]}/`
  }
}
if (!/^\/(?:[A-Za-z0-9._~-]+\/)*$/.test(env.VITE_BASE_PATH)) {
  throw new Error('VITE_BASE_PATH must be / or an absolute directory path ending in /.')
}
console.log(`Building ${source.slice(0, 7)} for ${env.VITE_BASE_PATH}`)
execFileSync('npm', ['run', 'build'], { env, stdio: 'inherit' })
execFileSync(process.execPath, ['scripts/check-build.mjs'], { env, stdio: 'inherit' })
await writeFile('dist/.nojekyll', '')
if (cname) await writeFile('dist/CNAME', `${cname}\n`)
const temporary = await mkdtemp(join(tmpdir(), 'gonzalez-prod-'))
try {
  const indexEnv = {
    ...process.env,
    GIT_DIR: git('rev-parse', '--absolute-git-dir'),
    GIT_WORK_TREE: resolve('dist'),
    GIT_INDEX_FILE: join(temporary, 'index'),
  }
  const indexGit = (...command) => execFileSync('git', command, { env: indexEnv, cwd: resolve('dist'), encoding: 'utf8' }).trim()
  indexGit('read-tree', '--empty')
  indexGit('add', '--all', '--force', '--', '.')
  const tree = indexGit('write-tree')
  if (exists && git('rev-parse', `${exists}^{tree}`) === tree) console.log('prod already contains this build.')
  else {
    const commit = git('commit-tree', tree, ...(parent ? ['-p', parent] : []), '-m', `Deploy site from ${source}`)
    git('update-ref', ref, commit, exists || '0'.repeat(source.length))
    console.log(`Updated local prod to ${commit.slice(0, 7)}. Source checkout unchanged.`)
  }
} finally {
  await rm(temporary, { recursive: true, force: true })
}
if (args.includes('--push')) execFileSync('git', ['push', 'origin', 'prod'], { stdio: 'inherit' })
else console.log('Ready to publish: git push origin prod (or rerun with --push).')
