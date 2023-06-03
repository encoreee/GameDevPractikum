import { renderToString } from 'react-dom/server';
export function render() {
  return renderToString(<div>hello</div>);
}
