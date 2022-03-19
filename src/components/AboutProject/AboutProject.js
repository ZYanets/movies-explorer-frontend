import React from 'react';

function AboutProject() {
  return (
    <section className="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__container">
        <article className="project__info">
          <h3 className="project__info_title">Дипломный проект включал 5 этапов</h3>
          <p className="project__info_paragraph">Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="project__info">
          <h3 className="project__info_title">На выполнение диплома ушло 5 недель</h3>
          <p className="project__info_paragraph">У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="project__timeline">
          <p className="project__timeline_backend">1 неделя</p>
          <p className="project__timeline_frontend">4 недели</p>
          <span className="project__timeline_caption">Back-end</span>
          <span className="project__timeline_caption">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;