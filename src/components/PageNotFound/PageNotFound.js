import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1 className="page-not-found__header">404</h1>
      <p className="page-not-found__text">Страница не найдена</p>
      <Link to="/" className="page-not-found__link">Назад</Link>
    </div>
  );
}

export default PageNotFound;