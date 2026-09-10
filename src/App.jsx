import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import Home from './pages/Home'
import Blog from './pages/Blog'
import ArticleDetail from './pages/ArticleDetail'
import NotFound from './pages/NotFound'
export default function App({ data }) {
  const Page = { home: Home, blog: Blog, article: ArticleDetail, notfound: NotFound }[data.kind]
  return <><SiteHeader pathname={data.pathname} /><Page {...data} /><SiteFooter /></>
}
