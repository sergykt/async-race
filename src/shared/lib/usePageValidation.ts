import { useEffect } from 'react';

interface IUsePageValidationProps {
  isFetched: boolean;
  page: number;
  pagesCount: number;
  setPage: (page: number) => void;
}

export const usePageValidation = (props: IUsePageValidationProps) => {
  const { isFetched, page, pagesCount, setPage } = props;

  useEffect(() => {
    if (isFetched && page > pagesCount) {
      setPage(pagesCount);
    }
  }, [isFetched, page, pagesCount, setPage]);
};
