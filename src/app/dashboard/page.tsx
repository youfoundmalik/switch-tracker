import { DashboardLayout } from './layout';
import { MedicationForm } from '@/components/medications/MedicationForm';
import { MedicationList } from '@/components/medications/MedicationList';
import { VitalsForm } from '@/components/vitals/VitalsForm';
import { VitalsLog } from '@/components/vitals/VitalsLog';

export function DashboardPage() {
  return (
    <DashboardLayout>
      <section>
        <MedicationForm />
        <MedicationList medications={[]} />
      </section>
      <section>
        <VitalsForm />
        <VitalsLog vitals={[]} />
      </section>
    </DashboardLayout>
  );
}
