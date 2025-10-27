'use client';

export default function ReportInstructions() {
  const instructions = [
    {
      number: 1,
      text: 'Use the calendar to select your desired start and end date for the report.',
    },
    {
      number: 2,
      text: 'Click the "Download CSV" button to start generating your report file.',
    },
    {
      number: 3,
      text: 'The file will download automatically when ready. For large date ranges, this may take a few moments.',
    },
  ];

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
      <h2 className="text-xl font-semibold text-white mb-6">
        How to Download Your Report
      </h2>

      <div className="space-y-4">
        {instructions.map((instruction) => (
          <div key={instruction.number} className="flex items-start gap-4">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-gray-900 font-bold text-sm">
                {instruction.number}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed pt-1">
              {instruction.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}