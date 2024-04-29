import { type FC } from 'react';
import { Modal } from '@/shared/ui/Modal';
import styles from './RaceWinnerModal.module.scss';

interface IRaceWinnerModal {
  winner: string;
  time: number;
  isOpen: boolean;
  onClose: () => void;
}

export const RaceWinnerModal: FC<IRaceWinnerModal> = (props) => {
  const { winner, time, isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>WINNER</h2>
        <p className={styles.winner}>{winner}</p>
        <p className={styles.time}>TIME: {time} s</p>
      </div>
    </Modal>
  );
};
