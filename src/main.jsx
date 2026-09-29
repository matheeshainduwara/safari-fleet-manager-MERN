import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import AdminGallery from './admin/pages/AdminGallery.jsx';
import AdminJeeps from './admin/pages/AdminJeeps.jsx';
import AdminBookings from './admin/pages/AdminBookings.jsx';
import AdminMessages from './admin/pages/AdminMessages.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<App />} />

        {/* Admin panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="jeeps" element={<AdminJeeps />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
