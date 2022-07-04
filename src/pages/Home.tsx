import React from "react";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "./pizzaBlock";
import Skeleton from "./pizzaBlock/Skeleton";
import Pagination from "../components/pagination";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { selectPizzaData } from "../redux/pizza/selectors";
import { Status } from "../redux/pizza/types";
import { fetchPizzas } from "../redux/pizza/asyncActions";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSearch = React.useRef(false);

  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, searchValue, currentPage } =
    useSelector(selectFilter);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = `${sort.sortProperty.replace("-", "")}`;
    const order = `${sort.sortProperty.includes("-") ? "asc" : "desc"}`;
    const search = searchValue ? searchValue : "";
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as TSearchPizzaParams;
  //     const sort = sortList.find((obj)  => obj.sortProperty === params.sortBy);
  //     dispatch(setFilters({
  //       categoryId: Number(params.category),
  //       searchValue: params.search,
  //       currentPage: Number(params.currentPage),
  //       sort: sort ||  sortList[0],
  //     }),);
  //   }
  //   isMounted.current = true;
  // }, []);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort, searchValue, currentPage]);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     const queryString = qs.stringify(params, {skipNulls: true})
  //
  //     navigate(`?${queryString}`);
  //   }
  //
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as TSearchPizzaParams))
  //   }
  // }, [categoryId, sort, currentPage]);

  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));
  const preloader = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.ERROR ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, сервер упал со всеми пиццами :( </p>
        </div>
      ) : (
        <div className="content__items">
          {status === Status.LOADING ? preloader : pizzas}
        </div>
      )}

      {status === Status.SUCCESS && (
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      )}
    </div>
  );
};

export default Home;
