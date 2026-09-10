import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import './index.css'

const data = JSON.parse(document.getElementById('page-data').textContent)
const pages = {
  home: () => import('./pages/Home'),
  blog: () => import('./pages/Blog'),
  article: () => import('./pages/ArticleDetail'),
  notfound: () => import('./pages/NotFound'),
}
const { default: Page } = await pages[data.kind]()
hydrateRoot(document.getElementById('root'), <StrictMode><SiteHeader pathname={data.pathname} /><Page {...data} /><SiteFooter /></StrictMode>)
document.documentElement.dataset.interactive = 'true'
