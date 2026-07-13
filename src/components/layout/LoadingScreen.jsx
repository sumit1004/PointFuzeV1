import Spinner from '../ui/Spinner';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#0F1115]">
      <Spinner size={48} />
    </div>
  );
};

export default LoadingScreen;
