import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import ServiceCentersPage from './ServiceCentersPage'; 

const ServiceNavigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/service-center" element={<ServiceCentersPage />} />
      </Routes>
    </Router>
  );
};

export default ServiceNavigation;
