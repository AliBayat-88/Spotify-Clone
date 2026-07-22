import SuccessAlert from './SuccessAlert.jsx';
import { useToaster } from '../context/ToastContext.jsx';

function GlobalToast() {
  const { toast, closeToast } = useToaster();

  return (
    <SuccessAlert
      isAlertOpen={toast.isOpen}
      message={toast.title}
      description={toast.description}
      icon={toast.icon}
      type={toast.type}
      address={toast.address} // 🟢 این خط خیلی مهمه! اگه نباشه لینک کار نمی‌کنه
      onClose={closeToast}
    />
  );
}

export default GlobalToast;