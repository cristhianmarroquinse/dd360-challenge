import { createPortal } from 'react-dom';

interface ModalProps {
  show: boolean;
  modalTitle: string;
  buttonActionText: string;
  buttonAction: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, modalTitle, buttonActionText, buttonAction, children }) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-modal-wrapper dark:bg-dark-bg">
      <div className='dark:bg-dark-solid-bg bg-modal-bg rounded-2xl w-1/2 py-11 border-[1px] border-black dark:border-wordle-gray-light' >
        <h2 className='dark:text-white text-black text-center text-4xl font-extrabold'>{modalTitle}</h2>
        {children}
        <div className='flex justify-center mt-10'>
            <button 
                className='flex justify-center bg-wordle-green px-20 py-2 text-3xl font-bold text-white rounded-md'
                onClick={buttonAction}
            >
              {buttonActionText}
            </button>
        </div>
      </div>
    </div>
    , document.body
  );
};

export default Modal;
