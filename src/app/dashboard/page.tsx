import { DashboardLayout } from './layout';
import { MedicationForm } from '@/components/medications/MedicationForm';
import { MedicationList } from '@/components/medications/MedicationList';
import { VitalsForm } from '@/components/vitals/VitalsForm';
import { VitalsLog } from '@/components/vitals/VitalsLog';
import { useMedications } from '@/hooks/useMedications';
import { useVitals } from '@/hooks/useVitals';

export function DashboardPage() {
  const { medications, addMedication, removeMedication } = useMedications();
  const { vitals, logVitals } = useVitals();

  return (
    <DashboardLayout>
      <section>
        <MedicationForm onAddMedication={addMedication} />
        <MedicationList
          medications={medications}
          onRemoveMedication={removeMedication}
        />
      </section>
      <section>
        <VitalsForm onLogVitals={logVitals} />
        <VitalsLog vitals={vitals} />
      </section>
    </DashboardLayout>
  );
}
