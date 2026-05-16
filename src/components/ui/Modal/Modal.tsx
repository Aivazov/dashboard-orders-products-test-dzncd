// src/components/ui/Modal/Modal.tsx
'use client';

import { useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ isOpen, title, children, footer, onClose }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className='modal fade show d-block' tabIndex={-1} onClick={onClose}>
        <div
          className='modal-dialog modal-dialog-centered'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='modal-content shadow'>
            <div className='modal-header'>
              {title && <h5 className='modal-title'>{title}</h5>}

              <button type='button' className='btn-close' onClick={onClose} />
            </div>

            <div className='modal-body'>{children}</div>

            {footer && <div className='modal-footer'>{footer}</div>}
          </div>
        </div>
      </div>

      <div className='modal-backdrop fade show' />
    </>
  );
};

export default Modal;
