import React from 'react';
import Carousel from '../components/Carousel';
import './Home.css';


const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao site do consulorio odontológico Sorriso Pleno</h1>
      
      <Carousel />
      
      <div className="description">
        <p>
        Bem-vindo à inovação no cuidado com seu sorriso! Nossa clínica odontológica é a mais nova no mercado, trazendo a praticidade do autoatendimento para agendamentos e tratamentos de alto padrão, garantindo conforto e excelência para você.
        </p>
      </div>
      
      
      <footer className="footer">
        <p>&copy; 2024 tratamentos e manutenções odontológicas. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
