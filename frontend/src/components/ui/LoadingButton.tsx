import { Loader } from 'lucide-react';

function LoadingButton() {
  return (
    <div className="flex justify-center items-center animate-pulse gap-2">
      <Loader
        className="animate-spin"
        size={16}
      />
    </div>
  );
}

export default LoadingButton;
