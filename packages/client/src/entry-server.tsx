import { renderToString } from 'react-dom/server';
import App from './App';
export function render() {
  return renderToString(
    // TODO: GAM-37. Add router
    // <App />
    <div>hello world</div>
  );
}
