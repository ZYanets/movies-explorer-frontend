import React from 'react';
import promoImage from '../../images/promo-image.svg';
import { Link } from 'react-router-dom';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <Link to="/" className="promo__link">
          Узнать больше
        </Link>
      </div>
      <img className="promo__image" src={promoImage} alt="Картинка"/>
    </section>
  );
}

export default Promo;