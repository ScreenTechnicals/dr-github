import { PiOpenAiLogoFill } from "react-icons/pi";

export const Loading = () => {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-gray-800 to-gray-950 text-white flex items-center justify-center">
      <div className="flex items-center justify-center flex-col">
        <PiOpenAiLogoFill size={50} className="animate-spin" />
        <h2 className="mt-3 font-light">Dr. Github Initiating...</h2>
      </div>
    </div>
  );
};
