import ReactDOM from 'react-dom/client';
import App from './App';
import { audioBootstrap } from './features/Audio';

if (typeof document !== 'undefined') {
  ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />);
  audioBootstrap();
}
