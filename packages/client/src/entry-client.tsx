import ReactDOM from 'react-dom/client';
import App from './App';
import { audioBootstrap } from './features/Audio';

if (typeof document !== 'undefined') {
  ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    // TODO: GAM-37. Add router
    // <App />
    <div>hello world</div>
  );
  audioBootstrap();
}
