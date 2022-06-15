import React from 'react';
import Categories from '../Categories';
import Sort, { sortList } from '../Sort';
import PizzaBlock from '../pages/pizzaBlock/';
import Skeleton from '../pages/pizzaBlock/Skeleton';
import Paginate from '../pagination/';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filterSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const { categoryId, sort, search, currentPage } = useSelector((state) => state.filter);

  const isSearch = React.useRef(false);

  const isMounted = React.useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const fetchPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = `sortBy=${sort.sortProperty.replace('-', '')}`;
    const order = `order=${sort.sortProperty.includes('-') ? 'asc' : 'desc'}`;
    const searchValue = `title=${search}`;
    const pagination = `page=${currentPage}&limit=4`;
    setIsLoading(true);
    fetch(
      `https://627bb319b54fe6ee008d303d.mockapi.io/items?${sortBy}&${category}&${order}&${searchValue}&${pagination}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });
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
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, search, currentPage]);

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

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const preloader = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? preloader : pizzas}</div>
      <Paginate currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
