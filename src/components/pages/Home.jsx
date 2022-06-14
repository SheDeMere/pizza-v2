import React from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import PizzaBlock from '../pages/pizzaBlock/';
import Skeleton from '../pages/pizzaBlock/Skeleton';
import Paginate from '../pagination/';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/filterSlice';

const Home = () => {
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const { categoryId, sort, search } = useSelector((state) => state.filter);

  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = `sortBy=${sort.sortProperty.replace('-', '')}`;
    const order = `order=${sort.sortProperty.includes('-') ? 'asc' : 'desc'}`;
    const searchValue = `title=${search}`;
    const pagination = `page=${currentPage}&limit=4`;
    setIsLoading(true);
    fetch(
      `https://627bb319b54fe6ee008d303d.mockapi.io/items?${category}&${sortBy}&${order}&${searchValue}&${pagination}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });
  }, [categoryId, sort, search, currentPage]);

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
      <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
