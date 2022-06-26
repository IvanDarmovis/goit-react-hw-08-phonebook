import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
const root = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', ev => {
      if (ev.code === 'Escape') onClose();
    });
    document.querySelector(`.${s.modal}`).addEventListener('click', ev => {
      if (ev.target === ev.currentTarget) onClose();
    });
  }, [onClose]);

  return createPortal(<div className={s.modal}>{children}</div>, root);
}
