import { renderToString } from 'react-dom/server'
import App from './App'
export function render(data) { return renderToString(<App data={data} />) }
