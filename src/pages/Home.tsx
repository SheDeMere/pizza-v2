import React from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from './pizzaBlock';
import Skeleton from './pizzaBlock/Skeleton';
import Pagination from '../components/pagination';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/filterSlice';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzaData } from '../redux/pizzaSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isSearch = React.useRef(false);

  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, searchValue, currentPage } = useSelector(selectFilter);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = `${sort.sortProperty.replace('-', '')}`;
    const order = `${sort.sortProperty.includes('-') ? 'asc' : 'desc'}`;
    const search = searchValue ? searchValue : '';
    dispatch(
        // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);
  const preloader = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, сервер упал со всеми пиццами :( </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? preloader : pizzas}</div>
      )}

      {status === 'success' && <Pagination currentPage={currentPage} onChangePage={onChangePage} />}
    </div>
  );
};

export default Home;
