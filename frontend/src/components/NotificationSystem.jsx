import { useState, useEffect } from "react";
import "./NotificationSystem.css";

// Toast Notification Component
export function Toast({ 
  type = "success", 
  title, 
  message, 
  duration = 5000, 
  onClose,
  actions = []
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️"
  };

  return (
    <div className={`toast toast-${type} ${isExiting ? 'toast-exit' : 'toast-enter'}`}>
      <div className="toast-content">
        <div className="toast-icon">
          {icons[type]}
        </div>
        <div className="toast-text">
          {title && <h4 className="toast-title">{title}</h4>}
          <p className="toast-message">{message}</p>
        </div>
        <button className="toast-close" onClick={handleClose}>
          ×
        </button>
      </div>
      {actions.length > 0 && (
        <div className="toast-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`toast-action ${action.primary ? 'primary' : 'secondary'}`}
              onClick={() => {
                action.onClick?.();
                if (action.closeOnClick !== false) handleClose();
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
      <div className="toast-progress">
        <div 
          className="toast-progress-bar" 
          style={{ 
            animationDuration: `${duration}ms`,
            animationPlayState: isExiting ? 'paused' : 'running'
          }}
        ></div>
      </div>
    </div>
  );
}

// Toast Container Component
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

// Confirmation Dialog Component
export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default",
  onConfirm,
  onCancel,
  onClose
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const icons = {
    danger: "⚠️",
    warning: "⚠️",
    info: "ℹ️",
    success: "✅",
    default: "❓"
  };

  return (
    <div className="confirm-overlay" onClick={handleCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-header">
          <div className={`confirm-icon confirm-icon-${type}`}>
            {icons[type]}
          </div>
          <h3 className="confirm-title">{title}</h3>
        </div>
        
        <div className="confirm-content">
          <p className="confirm-message">{message}</p>
        </div>
        
        <div className="confirm-actions">
          <button 
            className="confirm-button confirm-cancel"
            onClick={handleCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`confirm-button confirm-confirm confirm-${type}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// Success Modal Component
export function SuccessModal({
  isOpen,
  title,
  message,
  details = [],
  primaryAction,
  secondaryAction,
  onClose
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="success-overlay" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-header">
          <div className="success-icon">
            🎉
          </div>
          <h2 className="success-title">{title}</h2>
          <button className="success-close" onClick={onClose}>×</button>
        </div>
        
        <div className="success-content">
          <p className="success-message">{message}</p>
          
          {details.length > 0 && (
            <div className="success-details">
              <h4>Results:</h4>
              <ul className="success-list">
                {details.map((detail, index) => (
                  <li key={index} className="success-item">
                    <span className="success-label">{detail.label}:</span>
                    <span className="success-value">{detail.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="success-actions">
          {secondaryAction && (
            <button 
              className="success-button success-secondary"
              onClick={() => {
                secondaryAction.onClick?.();
                onClose();
              }}
            >
              {secondaryAction.label}
            </button>
          )}
          <button 
            className="success-button success-primary"
            onClick={() => {
              primaryAction?.onClick?.();
              onClose();
            }}
          >
            {primaryAction?.label || "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Custom Hook for Toast Management
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { ...toast, id }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (title, message, options = {}) => {
    return addToast({ type: 'success', title, message, ...options });
  };

  const showError = (title, message, options = {}) => {
    return addToast({ type: 'error', title, message, duration: 7000, ...options });
  };

  const showWarning = (title, message, options = {}) => {
    return addToast({ type: 'warning', title, message, duration: 6000, ...options });
  };

  const showInfo = (title, message, options = {}) => {
    return addToast({ type: 'info', title, message, ...options });
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}