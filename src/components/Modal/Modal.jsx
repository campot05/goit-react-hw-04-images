import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

function Modal({ closeModal, children }) {
  useEffect(() => {
    const handleCloseModal = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleCloseModal);

    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  });

  const clickOverlay = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={clickOverlay}>
      <div className={css.modal}> {children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;
