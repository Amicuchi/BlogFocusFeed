import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './styles/globals.css';

function App() {
  return (
    <div className="font-sans bg-[#f8fafc] text-gray-800 min-h-screen">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;