import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <AppRoutes />
        <Footer />
        <ToastContainer />
      </AuthProvider>
    </Router>
  )
}

export default App
