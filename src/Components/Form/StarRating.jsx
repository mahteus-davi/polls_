import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebaseConfig';

function StarRating() {
  const [tempoEspera, setTempoEspera] = useState(0);
  const [hoverTempoEspera, setHoverTempoEspera] = useState(null);

  const [atendimento, setAtendimento] = useState(0);
  const [hoverAtendimento, setHoverAtendimento] = useState(null);

  const [avaliacaoLocal, setAvaliacaoLocal] = useState(0);
  const [hoverAvaliacaoLocal, setHoverAvaliacaoLocal] = useState(null);

  const resetRatings = () => {
    setTempoEspera(0);
    setAtendimento(0);
    setAvaliacaoLocal(0);
  };

  const handleRating = (ratingValue, setRatingFunction) => {
    setRatingFunction(ratingValue);
  };

  const saveRatingToFirebase = async () => {
    try {
      await addDoc(collection(db, 'bd'), {
        tempoEspera,
        atendimento,
        avaliacaoLocal,
        timestamp: serverTimestamp(),
      });
      toast.success('Obrigado !', {
        className: "toast"
      });
      resetRatings();
    } catch (error) {
      console.error('Erro ao salvar avaliações:', error);
      toast.error('Erro ao enviar avaliação.');
    }
  };

  const handleSubmit = () => {
    if (tempoEspera === 0 || atendimento === 0 || avaliacaoLocal === 0) {
      toast.error('Por favor, preencha todas as avaliações.');
    } else {
      saveRatingToFirebase();
    }
  };
  

  const renderStars = (rating, setRatingFunction, hoverState, setHoverState) => 
    [...Array(5)].map((star, index) => {
      const ratingValue = index + 1;

      return (
        <label key={index}>
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => handleRating(ratingValue, setRatingFunction)}
            style={{ display: 'none' }}
          />
          <FaStar
            size={50}
            onMouseEnter={() => setHoverState(ratingValue)}
            onMouseLeave={() => setHoverState(null)}
            color={ratingValue <= (hoverState || rating) ? '#ffc107' : '#e4e5e9'}
          />
        </label>
      );
    });

  return (
    <div className="main">
      <div>
        <p>Atendimento do vendedor</p>
        {renderStars(atendimento, setAtendimento, hoverAtendimento, setHoverAtendimento)}
      </div>
      <div>
        <p>Tempo de Espera</p>
        {renderStars(tempoEspera, setTempoEspera, hoverTempoEspera, setHoverTempoEspera)}
      </div>
      <div>
        <p>Ambiente</p>
        {renderStars(avaliacaoLocal, setAvaliacaoLocal, hoverAvaliacaoLocal, setHoverAvaliacaoLocal)}
      </div>

      <button onClick={handleSubmit}>Enviar Avaliações</button>
      <ToastContainer position="top-right" autoClose={4000}/>
    </div>
  );
}

export default StarRating;
