import React from 'react';
import imagem1 from '../images/imagem1.png';

const About = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sobre Nós</h1>
      {/* Adicionando a imagem */}
      <img 
        src={imagem1} 
        alt="Imagem ilustrativa sobre nós" 
        style={{ width: '25%', height: 'auto', margin: '20px auto', display: 'block', borderRadius: '10px' }}
      />
      
      <p style={{ textAlign: 'justify', margin: '0 auto', maxWidth: '80%' }}>
      <strong>A Sorriso Pleno é um espaço dedicado ao cuidado com sua saúde bucal
        oferecendo serviços odontológicos de alta qualidade e tecnologia para garantir a melhor experiência e resultados para você e sua família.</strong>
      </p> <br></br>
      <p style={{ textAlign: 'justify', margin: '0 auto', maxWidth: '80%' }}>
      <strong>Nossa missão:</strong> Proporcionar um atendimento personalizado e humanizado, com foco no bem-estar do paciente.
        Utilizando equipamentos modernos e técnicas inovadoras para garantir o melhor cuidado odontológico.
      </p><br></br>
      <p style={{ textAlign: 'justify', margin: '0 auto', maxWidth: '80%' }}>
      <strong>Facilidade no Agendamento:</strong>  Autoagendamento Online.
        Para tornar o seu atendimento ainda mais conveniente, oferecemos um sistema de autoagendamento no nosso site.
        Com poucos cliques, você pode agendar sua consulta no horário que mais lhe convier, sem precisar de intermediação, tudo de forma rápida e prática.
      </p>
    </div>
  );
};

export default About;
