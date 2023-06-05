import ReactDOM from 'react-dom/client';
import App from './App';
import { audioBootstrap } from './features/Audio';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

audioBootstrap();
