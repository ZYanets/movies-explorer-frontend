import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {currentYear}</p>
        <ul className="footer__links">
          <li>
            <a className="footer__link" target="_blank" rel="noreferrer" href="https://practicum.yandex.ru/">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a className="footer__link" target="_blank" rel="noreferrer" href="https://github.com/ZYanets">
              GitHub
            </a>
          </li>
          <li>
            <a className="footer__link" target="_blank" rel="noreferrer" href="https://facebook.com">
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;