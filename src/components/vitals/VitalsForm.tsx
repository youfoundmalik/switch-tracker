import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useState, type FormEvent } from "react";

interface VitalsFormProps {
  onLogVitals: (systolic: number, diastolic: number, heartRate: number, weight: number) => Promise<void>;
  isLoading?: boolean;
  onClose: () => void;
}

export function VitalsForm({ onLogVitals, isLoading = false, onClose }: VitalsFormProps) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const systolicNum = Number(systolic);
    const diastolicNum = Number(diastolic);
    const heartRateNum = Number(heartRate);
    const weightNum = Number(weight);

    if (systolicNum > 0 && diastolicNum > 0 && heartRateNum > 0 && weightNum > 0) {
      await onLogVitals(systolicNum, diastolicNum, heartRateNum, weightNum);
      setSystolic("");
      setDiastolic("");
      setHeartRate("");
      setWeight("");
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 px-2'>
      <div>
        <Label htmlFor='vital-systolic'>Blood Pressure (Systolic)</Label>
        <Input
          id='vital-systolic'
          type='number'
          min='1'
          value={systolic}
          onChange={(e) => setSystolic(e.target.value)}
          placeholder='e.g., 120'
          required
        />
      </div>
      <div>
        <Label htmlFor='vital-diastolic'>Blood Pressure (Diastolic)</Label>
        <Input
          id='vital-diastolic'
          type='number'
          min='1'
          value={diastolic}
          onChange={(e) => setDiastolic(e.target.value)}
          placeholder='e.g., 80'
          required
        />
      </div>
      <div>
        <Label htmlFor='vital-heartrate'>Heart Rate (BPM)</Label>
        <Input
          id='vital-heartrate'
          type='number'
          min='1'
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder='e.g., 65'
          required
        />
      </div>
      <div>
        <Label htmlFor='vital-weight'>Weight(kg)</Label>
        <Input
          id='vital-weight'
          type='number'
          min='1'
          step='0.1'
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder='e.g., 150'
          required
        />
      </div>
      <Button type='submit' variant='solid' color='primary' disabled={isLoading} loading={isLoading} loadingText='Logging...'>
        Log Vitals
      </Button>
    </form>
  );
}
