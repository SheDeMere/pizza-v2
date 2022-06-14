import React from 'react';
import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss';
const index = ({ currentPage, setCurrentPage }) => {
  return (
    <ReactPaginate
      className={s.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default index;
