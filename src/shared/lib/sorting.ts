import { useSearchParams } from 'react-router-dom';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum OrderQueryKeys {
  SORT = '_sort',
  ORDER = '_order',
}

export const useSortBy = <T extends string>(keys: Record<string, T>, defaultSort: T) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderParam = searchParams.get(OrderQueryKeys.ORDER);
  const sortParam = searchParams.get(OrderQueryKeys.SORT);
  const order = orderParam === OrderDirection.DESC ? OrderDirection.DESC : OrderDirection.ASC;

  const keysArray = Object.values(keys);
  const sort = keysArray.find((key) => key === sortParam) ?? defaultSort;

  const toggleOrderBy = () => {
    const newOrder = order === OrderDirection.ASC ? OrderDirection.DESC : OrderDirection.ASC;
    setSearchParams((prev) => {
      prev.set(OrderQueryKeys.ORDER, newOrder);
      return prev;
    });
  };

  const setSortBy = (newSort: T) => {
    if (sort === newSort) {
      toggleOrderBy();
    } else {
      setSearchParams((prev) => {
        prev.set(OrderQueryKeys.SORT, newSort);
        prev.set(OrderQueryKeys.ORDER, OrderDirection.ASC);
        return prev;
      });
    }
  };

  return { order, sort, setSortBy };
};
