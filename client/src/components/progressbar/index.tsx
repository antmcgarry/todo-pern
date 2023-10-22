interface ProgressBarProps {
  progress: number;
}

function toProgressBarPercentage(value: number, max: number = 100): string {
  value = Math.min(Math.max(value, 0), max);
  const percentage = (value / max) * 100;
  return percentage.toFixed(2) + "%";
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const progressPercentage = toProgressBarPercentage(progress);

  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: progressPercentage }}
      >
        {progressPercentage}
      </div>
    </div>
  );
};

export default ProgressBar;
