import { Fragment } from "react";
import { MedicationForm } from "../medications/MedicationForm";
import ModalBase from ".";

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  addMedication: (name: string, dosage: string, frequency: string) => Promise<void>;
  isLoading: boolean;
}

const AddMedicationModal = ({ isOpen, onClose, addMedication, isLoading }: AddMedicationModalProps) => {
  return (
    <Fragment>
      <ModalBase header='Add Medication' isOpen={isOpen} className='!max-w-md' onClose={onClose}>
        <MedicationForm onClose={onClose} onAddMedication={addMedication} isLoading={isLoading} />
      </ModalBase>
    </Fragment>
  );
};

export default AddMedicationModal;
