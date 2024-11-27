import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';  
import CategoryIcon from '@mui/icons-material/Category';

const Sidebar = ({ isCollapsed, onToggle }) => {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      <img
        src="/logo.png" 
        alt="Logo"
        className="sidebar-logo"
        style={{ width: "100px", marginBottom: "20px" }} 
      />
  
      <Link to="/" className="sidebar-link">
        <HomeIcon />
        {!isCollapsed && <span>Início</span>} 
      </Link>

      <Link to="/sobre" className="sidebar-link">
        <InfoIcon />
        {!isCollapsed && <span>Sobre</span>}
      </Link>

      <div className="dropdown">
        <span className="dropdown-title">
          {isCollapsed ? null : 'Cadastros'}
        </span>
        <div className="dropdown-content">
          <Link to="/cadastros/cliente" className="sidebar-link">
            <PersonIcon />
            {!isCollapsed && <span>Cliente</span>}
          </Link>
          <Link to="/cadastros/tratamento" className="sidebar-link">
            <CategoryIcon />
            {!isCollapsed && <span>Tratamento</span>}
          </Link>
          <Link to="/cadastros/usuario" className="sidebar-link">
            <PersonAddIcon />
            {!isCollapsed && <span>Usuario</span>}
          </Link>
        </div>
      </div>

      <button className="toggle-button" onClick={onToggle}>
        {isCollapsed ? '→' : '←'}
      </button>
    </div>
  );
};

export default Sidebar;
