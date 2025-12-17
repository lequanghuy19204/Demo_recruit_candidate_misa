// Toast Notification System
const ToastType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

function createToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = ToastType.SUCCESS, duration = 3000) {
  const container = createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = getToastIcon(type);
  
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close">&times;</button>
  `;
  
  container.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
  });
  
  // Close button handler
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => removeToast(toast));
  
  // Auto remove
  if (duration > 0) {
    setTimeout(() => removeToast(toast), duration);
  }
  
  return toast;
}

function removeToast(toast) {
  toast.classList.remove('toast-show');
  toast.classList.add('toast-hide');
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

function getToastIcon(type) {
  switch (type) {
    case ToastType.SUCCESS:
      return '✓';
    case ToastType.ERROR:
      return '✕';
    case ToastType.WARNING:
      return '⚠';
    case ToastType.INFO:
      return 'ℹ';
    default:
      return '✓';
  }
}
