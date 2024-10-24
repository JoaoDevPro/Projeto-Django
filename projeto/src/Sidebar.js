// Sidebar.js
import React, { useState } from "react";
import { FaHome, FaDiceD6, FaChevronRight, FaBolt, FaBell } from "react-icons/fa";
import "./Sidebar.css"; // Assumindo que o CSS está em um arquivo Sidebar.css
import minhaImagem from './Imagem8.png';
import renault from './renault.png';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logo_wrapper">
      <img className="logo" src={minhaImagem} alt="Descrição da imagem" />
        <span className="company-name">Renault</span>
        <button
          className="expand-btn"
          aria-label="Expandir Sidebar"
          title="Expandir sidebar"
          onClick={toggleSidebar}
        >
          <i className={`fa-solid ${isCollapsed ? "fa-chevron-left" : "fa-chevron-right"}`} aria-hidden="true"><FaChevronRight /></i>
        </button>
      </div>

      <div className="sidebar-links">
        <ul>
          <li style={{ marginTop: "3rem" }}>
            
            <a href="/home" className="active">
              <i className="fa regular fa-house" class="fa fa-home"><FaHome size={20}/></i> <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/listar-risco">
              <i className="fas fa-exclamation-triangle"><FaBolt size={17}/></i> <span>Risco</span>
            </a>
          </li>
          <li>
            <a href="/listar-solucao">
              <i className="fa-regular fa-lightbulb"><FaDiceD6 size={17}/></i> <span>Solução</span>
            </a>
          </li>
          <li>
            <a href="#settings">
              <i className="fas fa-cog"><FaBell size={17}/></i> <span>Notificações</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sidebar_profile">
        <a href="#logout" className="logout">
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default Sidebar;
