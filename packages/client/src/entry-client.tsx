import ReactDOM from 'react-dom/client';
import App from './App';
import { audioBootstrap } from './features/Audio';

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />);

audioBootstrap();
