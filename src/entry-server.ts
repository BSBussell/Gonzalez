import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
export { BUSINESS } from './data/business'
export { SERVICES } from './data/services'
export function render() { return renderToString(createElement(App)) }
