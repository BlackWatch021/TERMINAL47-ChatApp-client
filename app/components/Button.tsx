import { Power } from "lucide-react";

interface ButtonProps {
  title: string;
  icon: boolean;
}

const Button = ({ title, icon }: ButtonProps) => {
  return (
    <button className="w-full flex items-center justify-center gap-x-2 py-2 px-4 bg-terminalGreen text-black rounded-md cursor-pointer hover:bg-terminalGreenSecondary transition-all duration-300">
      {icon && <Power size={18} strokeWidth={3} />}
      <span className="uppercase font-mono text-sm md:text-[18px] font-medium">
        {title}
      </span>
    </button>
  );
};

export default Button;
