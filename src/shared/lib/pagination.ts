import { useSearchParams } from 'react-router-dom';

const defaultLimit = 7;

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || defaultLimit;

  const setPage = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  const setLimit = (newLimit: number) => {
    setSearchParams({ limit: String(newLimit) });
  };

  return { page, limit, setPage, setLimit };
};

export const getPagesCount = (count: number, limit: number) => Math.ceil(count / limit) || 1;
