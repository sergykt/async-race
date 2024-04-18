import { type FC, memo } from 'react';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  page: number;
  pagesCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<IPaginationProps> = memo((props) => {
  const { page, pagesCount, onPageChange } = props;

  return (
    <div className={styles.pagination}>
      <button
        type='button'
        className={styles.button}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <BiLeftArrow className={styles.arrow} />
      </button>
      <p className={styles.page}>PAGE #{page}</p>
      <button
        type='button'
        className={styles.button}
        onClick={() => onPageChange(page + 1)}
        disabled={page === pagesCount}
      >
        <BiRightArrow className={styles.arrow} />
      </button>
    </div>
  );
});
