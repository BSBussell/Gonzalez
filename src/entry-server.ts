import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import App, { type Page } from './App'
export { BUSINESS } from './data/business'
export { SERVICES } from './data/services'
export function render(page: Page = 'home') { return renderToString(createElement(App, { page })) }
