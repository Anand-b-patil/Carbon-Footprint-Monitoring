'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

interface FormData {
  category: string;
  geography: string;
  validOn: string;
  factorValue: string;
}

interface FormErrors {
  factorValue?: string;
}

export default function AddEmissionFactorForm() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    category: 'Electricity',
    geography: 'United States',
    validOn: '2024-01-01',
    factorValue: '0.00',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const categories = [
    'Electricity',
    'Natural Gas',
    'Transportation',
    'Waste',
    'Water',
  ];

  const geographies = [
    'United States',
    'United Kingdom',
    'Germany',
    'Canada',
    'Australia',
    'Global',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const valueNum = parseFloat(formData.factorValue);
    if (isNaN(valueNum) || valueNum <= 0) {
      newErrors.factorValue = 'Factor value must be a positive number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Form submitted:', formData);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    router.push('/admin/emission-factors');
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">
        Add New Emission Factor
      </h1>

      {/* Success Alert */}
      {showSuccess && (
        <div className="mb-6 bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Success!</h3>
              <p className="text-gray-300 text-sm">Emission factor was added successfully.</p>
            </div>
          </div>
          <button
            onClick={handleCloseSuccess}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-white font-medium mb-3">
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                >
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

            {/* Geography */}
            <div>
              <label htmlFor="geography" className="block text-white font-medium mb-3">
                Geography
              </label>
              <div className="relative">
                <select
                  id="geography"
                  name="geography"
                  value={formData.geography}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                >
                  {geographies.map((geo) => (
                    <option key={geo} value={geo} className="bg-gray-800">
                      {geo}
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

            {/* Valid On */}
            <div>
              <label htmlFor="validOn" className="block text-white font-medium mb-3">
                Valid On
              </label>
              <input
                type="date"
                id="validOn"
                name="validOn"
                value={formData.validOn}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent [color-scheme:dark]"
              />
              <p className="mt-2 text-sm text-gray-400">
                The date this factor becomes effective.
              </p>
            </div>

            {/* Factor Value */}
            <div>
              <label htmlFor="factorValue" className="block text-white font-medium mb-3">
                Factor Value
              </label>
              <input
                type="number"
                id="factorValue"
                name="factorValue"
                value={formData.factorValue}
                onChange={handleChange}
                step="0.01"
                className={`w-full px-4 py-3 bg-gray-700/50 border ${
                  errors.factorValue ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
              <p className="mt-2 text-sm text-gray-400">
                kg CO2e / kWh
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errors.factorValue && (
            <div className="mb-6 bg-red-900/30 border border-red-700/50 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{errors.factorValue}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold rounded-lg transition-colors"
            >
              Add Factor
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}