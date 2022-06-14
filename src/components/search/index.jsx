import React from 'react';
import s from './Search.module.scss';
import { setSearch } from '.././redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const index = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.filter.searchPizza);

  const searchPizza = (e) => {
    dispatch(setSearch(e));
  };

  return (
    <div className={s.root}>
      <svg className={s.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g data-name="Layer 2" id="Layer_2">
          <path d="M13,23A10,10,0,1,1,23,13,10,10,0,0,1,13,23ZM13,5a8,8,0,1,0,8,8A8,8,0,0,0,13,5Z" />
          <path d="M28,29a1,1,0,0,1-.71-.29l-8-8a1,1,0,0,1,1.42-1.42l8,8a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
        </g>
      </svg>
      <input
        value={search}
        onChange={(e) => searchPizza(e.target.value)}
        placeholder="Поиск пиццы..."
      />
      {search && (
        <div onClick={() => dispatch(setSearch(''))}>
          <svg
            className={s.clear}
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
            <path d="M0 0h48v48H0z" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default index;
