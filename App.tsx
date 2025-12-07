import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Service from './pages/Service';
import VisaDetails from './pages/VisaDetails';
import Query from './pages/Query';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="service" element={<Service />} />
          <Route path="details" element={<VisaDetails />} />
          <Route path="query" element={<Query />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
