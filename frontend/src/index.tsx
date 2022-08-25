import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from './context/api';
import { AuthProvider } from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApiProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</ApiProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
