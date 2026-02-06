import { ChevronDown } from "lucide-react";

interface FAQProps {
  question: string;
  answer: string;
}
const FAQ = ({ question, answer }: FAQProps) => {
  return (
    <div className="space-y-4 pt-2 text-textSecondary font-terminal text-sm">
      <details className="group cursor-pointer">
        <summary className="flex items-center justify-between text-textSecondary  list-none hover:text-primary transition-colors text-sm">
          <span>{question}</span>
          <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
            <ChevronDown />
          </span>
        </summary>
        <p className="mt-2 text-textSecondary text-xs leading-relaxed pl-4 border-l border-terminalGreen ">
          {answer}
        </p>
      </details>
    </div>
  );
};

export default FAQ;
