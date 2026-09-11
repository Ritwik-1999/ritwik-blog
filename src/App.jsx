import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import Home from './pages/Home'
import Work from './pages/Work'
import Blog from './pages/Blog'
import ArticleDetail from './pages/ArticleDetail'
import NotFound from './pages/NotFound'
export default function App({ data }) {
  const Page = { home: Home, work: Work, blog: Blog, article: ArticleDetail, notfound: NotFound }[data.kind]
  return <><SiteHeader pathname={data.pathname} /><Page {...data} /><SiteFooter /></>
}
