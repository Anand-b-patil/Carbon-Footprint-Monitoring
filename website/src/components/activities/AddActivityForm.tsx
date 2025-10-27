'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormData {
  dateTime: string;
  category: string;
  unit: string;
  value: string;
  notes: string;
}

export default function AddActivityForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    dateTime: '',
    category: '',
    unit: '',
    value: '',
    notes: '',
  });

  const categories = [
    'Scope 1 - Direct Emissions',
    'Scope 2 - Indirect Emissions (Energy)',
    'Scope 3 - Other Indirect Emissions',
  ];

  const units = [
    'kWh (Kilowatt Hours)',
    'miles',
    'km (Kilometers)',
    'therms',
    'liters',
    'gallons',
    'kg (Kilograms)',
    'tons',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your submission logic here
    // router.push('/activities');
  };

  const handleCancel = () => {
    router.push('/activities');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
        <div className="space-y-6">
          {/* Date & Time */}
          <div>
            <label htmlFor="dateTime" className="block text-white font-medium mb-3">
              Date & Time of Activity
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                id="dateTime"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                placeholder="mm/dd/yyyy, --:-- -"
                className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent scheme-dark"
                required
              />
              <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Activity Category */}
          <div>
            <label htmlFor="category" className="block text-white font-medium mb-3">
              Activity Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                required
              >
                <option value="" disabled className="text-gray-500">
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-800">
                    {cat}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Unit and Value Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Unit */}
            <div>
              <label htmlFor="unit" className="block text-white font-medium mb-3">
                Unit
              </label>
              <div className="relative">
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-gray-500">
                    Select a unit
                  </option>
                  {units.map((unit) => (
                    <option key={unit} value={unit} className="bg-gray-800">
                      {unit}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Value */}
            <div>
              <label htmlFor="value" className="block text-white font-medium mb-3">
                Value
              </label>
              <input
                type="number"
                id="value"
                name="value"
                value={formData.value}
                onChange={handleChange}
                placeholder="Enter value"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-white font-medium mb-3">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any relevant details..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 text-gray-300 hover:text-white transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold rounded-lg transition-colors"
          >
            Submit Activity
          </button>
        </div>
      </div>
    </form>
  );
}