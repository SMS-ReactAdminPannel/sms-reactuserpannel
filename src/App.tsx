import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.tsx';
import { AuthProvider } from './pages/auth/AuthContext.tsx';
import 'react-toastify/dist/ReactToastify.css';


function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<AppRoutes />
					<ToastContainer
						position='top-right'
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme='colored'
					/>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
