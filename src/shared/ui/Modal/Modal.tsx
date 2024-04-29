import { type FC, type ComponentProps, memo, useEffect, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './Modal.module.scss';

interface ModalProps extends ComponentProps<'div'> {
  onClose: () => void;
  isOpen: boolean;
}

export const Modal: FC<ModalProps> = memo((props) => {
  const { children, className, isOpen, onClose } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={classNames(styles.modalLayout, className)}>
      <div className={styles.wrapper} role='presentation' onClick={handleClose}>
        <div className={styles.frame} role='dialog'>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
});
