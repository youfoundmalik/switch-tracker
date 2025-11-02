import { VitalsForm } from "../vitals/VitalsForm";
import ModalBase from ".";

interface LogVitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logVitals: (systolic: number, diastolic: number, heartRate: number, weight: number) => Promise<void>;
  isLoading: boolean;
}

const LogVitalsModal = ({ isOpen, onClose, logVitals, isLoading }: LogVitalsModalProps) => {
  return (
    <ModalBase header='Log Vitals' isOpen={isOpen} className='!max-w-md' onClose={onClose}>
      <VitalsForm onClose={onClose} onLogVitals={logVitals} isLoading={isLoading} />
    </ModalBase>
  );
};

export default LogVitalsModal;
