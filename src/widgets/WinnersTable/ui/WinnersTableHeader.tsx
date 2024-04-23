import { type FC, memo } from 'react';
import { WinnersSortBy } from '@/entities/winner';

interface IWinnersTableHeaderProps {
  sort: WinnersSortBy;
  setSortBy: (newSort: WinnersSortBy) => void;
}

export const WinnersTableHeader: FC<IWinnersTableHeaderProps> = memo((props) => {
  const { sort, setSortBy } = props;

  const isSelected = (sortBy: WinnersSortBy) => sort === sortBy;

  return (
    <thead>
      <tr>
        <th
          onClick={() => setSortBy(WinnersSortBy.ID)}
          data-selectable='true'
          data-selected={isSelected(WinnersSortBy.ID)}
        >
          №
        </th>
        <th>Car</th>
        <th>Name</th>
        <th
          onClick={() => setSortBy(WinnersSortBy.WINS)}
          data-selectable='true'
          data-selected={isSelected(WinnersSortBy.WINS)}
        >
          Wins
        </th>
        <th
          onClick={() => setSortBy(WinnersSortBy.TIME)}
          data-selectable='true'
          data-selected={isSelected(WinnersSortBy.TIME)}
        >
          Best time (seconds)
        </th>
      </tr>
    </thead>
  );
});
