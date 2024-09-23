import React, { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import '../components/Styles/Navbar.css'; // Importa los estilos CSS

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  // Función para manejar el cierre de sesión
  const handleLogout = (e) => {
    e.preventDefault(); // Prevenir la navegación predeterminada del enlace
    localStorage.removeItem('token');
    localStorage.removeItem('roles'); // Eliminar los roles del localStorage
    onLogout(); // Notificar al componente padre que se cerró sesión
    navigate('/login');
  };

  // Cargar los roles del usuario al montar el componente
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')); // Obtener los roles del localStorage
    if (storedRoles) {
      setRoles(storedRoles); // Guardar los roles en el estado
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/logo.png" alt="Logo Stylo Store" className="logo-image" />
        <span>Stylo Store</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>

        <li className="productos-dropdown">
          <Link to="#">Catálogo</Link>
          <ul className="dropdown-menu">
            <li><Link to="/productolist">Ver Catálogo de Prendas</Link></li>
            {(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_ADMIN_DE_PRODUCTOS')) && (
              <li><Link to="/crear-producto">Crear Prenda</Link></li>
            )}
          </ul>
        </li>

        {roles.includes('ROLE_ADMIN') && (
          <li><Link to="/usuarios">Usuarios</Link></li>
        )}

        <li><Link to="/logout" onClick={handleLogout}>Cerrar Sesión</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
