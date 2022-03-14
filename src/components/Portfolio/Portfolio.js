import React from 'react';
import portfolioLinkIcon from '../../images/portfolio-link-icon.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a className="portfolio__link" target="_blank" rel="noreferrer" href="https://facebook.com">
            Статичный сайт
            <img className="portfolio__link_icon" src={portfolioLinkIcon} alt="Ссылка"/>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" target="_blank" rel="noreferrer" href="https://github.com/ZYanets">
            Адаптивный сайт
            <img className="portfolio__link_icon" src={portfolioLinkIcon} alt="Ссылка"/>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" target="_blank" rel="noreferrer" href="https://github.com/ZYanets">
            Одностраничное приложение
            <img className="portfolio__link_icon" src={portfolioLinkIcon} alt="Ссылка"/>
          </a>
        </li>
       </ul>
    </section>
  );
}

export default Portfolio;