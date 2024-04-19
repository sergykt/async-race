import { useSearchParams } from 'react-router-dom';

export enum PageQueryKeys {
  PAGE = '_page',
  LIMIT = '_limit',
}

export const usePagination = (defaultLimit = 7) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get(PageQueryKeys.PAGE)) || 1;
  const limit = Number(searchParams.get(PageQueryKeys.LIMIT)) || defaultLimit;

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set(PageQueryKeys.PAGE, String(newPage));
      return prev;
    });
  };

  const setLimit = (newLimit: number) => {
    setSearchParams((prev) => {
      prev.set(PageQueryKeys.LIMIT, String(newLimit));
      return prev;
    });
  };

  return { page, limit, setPage, setLimit };
};

export const getPagesCount = (count: number, limit: number) => Math.ceil(count / limit) || 1;
