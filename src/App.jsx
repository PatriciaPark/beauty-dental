import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ClinicDetail from './pages/ClinicDetail';

import AdminPage from './pages/AdminPage';
import AdminByClinic from './pages/AdminByClinic';
import AdminLogin from './pages/AdminLogin';
import AdminRoute from './components/AdminRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/clinic/:id" element={<ClinicDetail />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
                <Route path="/admin/clinics" element={<AdminRoute><AdminByClinic /></AdminRoute>} />
            </Routes>
        </Router>
    );
}

export default App;