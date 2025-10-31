import { useState, type FormEvent } from 'react';

interface VitalsFormProps {
  onLogVitals: (
    systolic: number,
    diastolic: number,
    heartRate: number,
    weight: number
  ) => void;
}

export function VitalsForm({ onLogVitals }: VitalsFormProps) {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const systolicNum = Number(systolic);
    const diastolicNum = Number(diastolic);
    const heartRateNum = Number(heartRate);
    const weightNum = Number(weight);

    if (
      systolicNum > 0 &&
      diastolicNum > 0 &&
      heartRateNum > 0 &&
      weightNum > 0
    ) {
      onLogVitals(systolicNum, diastolicNum, heartRateNum, weightNum);
      setSystolic('');
      setDiastolic('');
      setHeartRate('');
      setWeight('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="vital-systolic">Blood Pressure (Systolic)</label>
        <input
          id="vital-systolic"
          type="number"
          min="1"
          value={systolic}
          onChange={(e) => setSystolic(e.target.value)}
          placeholder="e.g., 120"
          required
        />
      </div>
      <div>
        <label htmlFor="vital-diastolic">Blood Pressure (Diastolic)</label>
        <input
          id="vital-diastolic"
          type="number"
          min="1"
          value={diastolic}
          onChange={(e) => setDiastolic(e.target.value)}
          placeholder="e.g., 80"
          required
        />
      </div>
      <div>
        <label htmlFor="vital-heartrate">Heart Rate (BPM)</label>
        <input
          id="vital-heartrate"
          type="number"
          min="1"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="e.g., 65"
          required
        />
      </div>
      <div>
        <label htmlFor="vital-weight">Weight</label>
        <input
          id="vital-weight"
          type="number"
          min="1"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g., 150"
          required
        />
      </div>
      <button type="submit">Log Vitals</button>
    </form>
  );
}

