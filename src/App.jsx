import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Booking from './sections/Booking';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-green-50">
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
  );
}
