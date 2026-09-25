import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Booking from './sections/Booking';
import Contact from './sections/Contact';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#0a0f0d] dark:bg-[#0a0f0d]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Gallery />
          <Booking />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
