import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(<App />);
} else {
    console.error('Root element not found');
}
