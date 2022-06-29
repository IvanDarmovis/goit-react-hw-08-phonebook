import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
const root = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', ev => {
      if (ev.code === 'Escape') onClose();
    });
    document.querySelector(`.${s.modal}`).addEventListener('click', ev => {
      if (ev.target === ev.currentTarget) onClose();
    });
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', ev => {
        if (ev.code === 'Escape') onClose();
      });
    };
  }, [onClose]);

  return createPortal(<div className={s.modal}>{children}</div>, root);
}

Modal.propType = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
