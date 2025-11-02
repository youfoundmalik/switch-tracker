import AddMedicationModal from "@/components/modals/add-medication";
import { DashboardLayout } from "./layout";
import { MedicationList } from "@/components/medications/MedicationList";
import { VitalsLog } from "@/components/vitals/VitalsLog";
import { useMedications } from "@/hooks/useMedications";
import { useVitals } from "@/hooks/useVitals";
import { useState } from "react";
import LogVitalsModal from "@/components/modals/log-vitals";
import { Button } from "@/ui/button";

export function DashboardPage() {
  const [isLogVitalsOpen, setIsLogVitalsOpen] = useState(false);
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false);
  const { medications, removeMedication, addMedication, isLoading: medicationsLoading, removingMedicationId } = useMedications();
  const { vitals, logVitals, isLoading: vitalsLoading } = useVitals();

  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 h-full flex-1 lg:grid-cols-2 gap-8'>
        <section className='flex-1 w-full flex flex-col items-start gap-2 overflow-y-hidden'>
          {medications.length > 0 && (
            <div className='w-[200px] self-start'>
              <Button variant='solid' color='primary' onClick={() => setIsAddMedicationOpen(true)}>
                Add Medication
              </Button>
            </div>
          )}
          <MedicationList
            medications={medications}
            onRemoveMedication={removeMedication}
            onAddMedication={() => setIsAddMedicationOpen(true)}
            removingMedicationId={removingMedicationId}
          />
        </section>
        <section className='flex-1 w-full flex flex-col items-end gap-2 overflow-y-hidden'>
          {vitals.length > 0 && (
            <div className='w-[200px] self-end'>
              <Button variant='solid' color='primary' onClick={() => setIsLogVitalsOpen(true)}>
                Add Vitals
              </Button>
            </div>
          )}
          <VitalsLog vitals={vitals} onAddVitals={() => setIsLogVitalsOpen(true)} />
        </section>
      </div>
      <AddMedicationModal 
        isOpen={isAddMedicationOpen} 
        onClose={() => setIsAddMedicationOpen(false)} 
        addMedication={addMedication}
        isLoading={medicationsLoading}
      />
      <LogVitalsModal 
        isOpen={isLogVitalsOpen} 
        onClose={() => setIsLogVitalsOpen(false)} 
        logVitals={logVitals}
        isLoading={vitalsLoading}
      />
    </DashboardLayout>
  );
}
