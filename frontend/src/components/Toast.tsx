import React from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div className="toast">
      {type === 'success' ? (
        <CheckCircle2 className="text-emerald-500" />
      ) : (
        <XCircle className="text-red-500" />
      )}
      <span>{message}</span>
    </div>
  )
}

export default Toast
