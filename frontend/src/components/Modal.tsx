import React from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
