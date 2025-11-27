import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Start from './pages/Start';
import Rules from './pages/Rules';
import About from './pages/About';
import Login from './pages/Login';
import Passwordreset from './pages/Passwordreset';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passwordreset" element={<Passwordreset />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;