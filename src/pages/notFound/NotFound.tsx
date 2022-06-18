import React from 'react';
import s from './NotFound.module.scss';
const NotFound: React.FC = () => (
    <div className={s.root}>
      <h1>Ничего не найдено 😕</h1>
      <p>Данная страница отсутствует...</p>
    </div>
  );


export default NotFound;
