// src/App.tsx (usando react-router-dom v6)
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ventas from './ventas/Ventas.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/" element={<h1>Bienvenido a nuestra aplicación</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
