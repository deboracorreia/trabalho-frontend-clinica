import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Cliente from './pages/Cadastros/Cliente';
import Tratamento from './pages/Cadastros/Tratamento';
import Usuario from './pages/Cadastros/Usuario';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
          <div className={`content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path='/cadastros/usuario' element={<Usuario />} />
              <Route 
                path="/cadastros/cliente"
                element={
                  <ProtectedRoute>
                    <Cliente />
                  </ProtectedRoute>
                }
              />
             <Route
                path="/cadastros/tratamento"
                element={
                  <ProtectedRoute>
                    <Tratamento />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cadastros/usuario"
                element={
                  <ProtectedRoute>
                    <Usuario />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
