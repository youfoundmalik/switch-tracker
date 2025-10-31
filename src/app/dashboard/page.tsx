import { DashboardLayout } from './layout';
import { MedicationForm } from '@/components/medications/MedicationForm';
import { MedicationList } from '@/components/medications/MedicationList';
import { VitalsForm } from '@/components/vitals/VitalsForm';
import { VitalsLog } from '@/components/vitals/VitalsLog';
import { useMedications } from '@/hooks/useMedications';

export function DashboardPage() {
  const { medications, removeMedication } = useMedications();

  return (
    <DashboardLayout>
      <section>
        <MedicationForm />
        <MedicationList
          medications={medications}
          onRemoveMedication={removeMedication}
        />
      </section>
      <section>
        <VitalsForm />
        <VitalsLog vitals={[]} />
      </section>
    </DashboardLayout>
  );
}
