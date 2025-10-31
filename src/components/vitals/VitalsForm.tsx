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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Log Vitals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="vital-systolic"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Blood Pressure (Systolic)
          </label>
          <input
            id="vital-systolic"
            type="number"
            min="1"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            placeholder="e.g., 120"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="vital-diastolic"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Blood Pressure (Diastolic)
          </label>
          <input
            id="vital-diastolic"
            type="number"
            min="1"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            placeholder="e.g., 80"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="vital-heartrate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Heart Rate (BPM)
          </label>
          <input
            id="vital-heartrate"
            type="number"
            min="1"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            placeholder="e.g., 65"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="vital-weight"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Weight
          </label>
          <input
            id="vital-weight"
            type="number"
            min="1"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 150"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Log Vitals
        </button>
      </form>
    </div>
  );
}

