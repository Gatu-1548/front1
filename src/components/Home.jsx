import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Styles/Home.css'; // Archivo de estilos CSS

const Home = () => {
  const navigate = useNavigate();
  const fullText = "Discover the latest trends in fashion and upgrade your wardrobe!";
  const [displayedText, setDisplayedText] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff'); // Color de fondo
  const [textColor, setTextColor] = useState('#000000'); // Color del texto

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  // Lista de colores pastel para el fondo y el texto
  const pastelBgColors = ['#FF6347', '#FFD700', '#4682B4']; // Solo 3 colores diferentes
  const pastelTextColors = ['#FFFACD', '#E0FFFF', '#F5F5DC']; // Solo 3 colores diferentes

  // Función para cambiar colores sin que se solapen
  const changeColors = () => {
    const randomBgColor = pastelBgColors[Math.floor(Math.random() * pastelBgColors.length)];
    let randomTextColor = pastelTextColors[Math.floor(Math.random() * pastelTextColors.length)];

    // Asegurarse de que los colores de fondo y texto sean diferentes
    while (randomBgColor === randomTextColor) {
      randomTextColor = pastelTextColors[Math.floor(Math.random() * pastelTextColors.length)];
    }

    setBgColor(randomBgColor);
    setTextColor(randomTextColor);
  };

  useEffect(() => {
    const colorInterval = setInterval(changeColors, 3000); // Cambia los colores cada 3 segundos
    return () => clearInterval(colorInterval); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  return (
    <div className="home-container" style={{ backgroundColor: bgColor }}> {/* Color de fondo dinámico */}
      <div className="overlay"></div>
      <div className="welcome-message" style={{ color: textColor }}> {/* Color de texto dinámico */}
        <h1>BIENVENIDO</h1>
        <p>{displayedText}</p> {/* Muestra el texto que se escribe progresivamente */}
        <button className="shop-now-button" onClick={() => navigate('/login')}>
          Visita Nuestra Pagina
        </button>
      </div>
      <button className="login-button" onClick={() => navigate('/login')}>
        Login
      </button>
    </div>
  );
};

export default Home;
