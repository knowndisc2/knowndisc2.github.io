import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import ShowcaseSection from './components/ShowcaseSection';
import About from './components/About';
import HallOfArt from './components/HallOfArt';
import Contact from './components/Contact';
import AboutPage from './pages/AboutPage';
import CommissionsShopPage from './pages/CommissionsShopPage';

function Home() {
  return (
    <>
      <Hero />
      <About id="about" />
      <HallOfArt id="hallofframes" />
      <ShowcaseSection id="showcase" />
      <Contact id="contact" />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/commissions" element={<CommissionsShopPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
