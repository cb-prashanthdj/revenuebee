"use client";
import { ChevronDown, ChevronUp, CopyIcon, PlayIcon } from "lucide-react";
import { useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface ApiRunnerRequestProps {
  reqRef: React.RefObject<HTMLDetailsElement | null>;
  handleReqToggle: () => void;
  reqToggleState: boolean;
  requestCode: string;
}

export function ApiRunnerRequest({
  reqRef,
  handleReqToggle,
  reqToggleState,
  requestCode,
}: ApiRunnerRequestProps) {
  return (
    <details
      ref={reqRef}
      onToggle={handleReqToggle}
      open
      className="overflow-y-auto h-full"
    >
      <summary className="font-semibold text-[#012A38] flex gap-2 items-center py-4 uppercase sticky top-0 ">
        {reqToggleState ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
        Request
        <button
          className={`rounded-[1.25rem] bg-[rgba(255,255,255,0.52)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-0 font-sora  p-4 text-left text-balance flex-1 flex items-center justify-center gap-1 text-xs font-[700] uppercase h-8 text-[#F30]`}
        >
          <PlayIcon className="size-4" /> Run (PRESS F5){" "}
        </button>
        <LanguagePicker onLanguageSelect={(lang) => {}} />
        <button>
          <CopyIcon className="size-4" />
        </button>
      </summary>

      <div className={`!overflow-y-scroll h-full `}>
        <SyntaxHighlighter customStyle={{
          background: "transparent"
        }} language="json" style={tomorrow}>
          {requestCode}
        </SyntaxHighlighter>
      </div>
    </details>
  );
}
function LanguagePicker({
  onLanguageSelect,
}: {
  onLanguageSelect: (lang: string) => void;
}) {
  const languages = ["NodeJS", "Python", "XML"];
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");
  const [isOpen, setIsOpen] = useState(false);
  const handleLanguageChange = (language: string) => {
    // e.stopPropagation();
    setSelectedLanguage(language);
    onLanguageSelect(language);
    if (detailsRef.current) {
      detailsRef.current.open = false; // Close the dropdown
      setIsOpen(false);
    }
  };
  const toggleDropdown = () => {
    if (detailsRef.current) {
      setIsOpen(detailsRef.current.open); // Update open state dynamically
    }
  };
  return (
    <details
      className="relative group w-36"
      ref={detailsRef}
      onToggle={toggleDropdown}
    >
      <summary className="cursor-pointer uppercase font-[700] text-xs flex items-center gap-2 justify-center">
        {selectedLanguage}{" "}
        {isOpen ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </summary>
      <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg group-open:block hidden">
        {languages.map((language) => (
          <li
            key={language}
            className=" text-sm hover:bg-gray-100 cursor-pointer"
          >
            <button
              className="w-full px-4 py-2 text-left"
              onClick={(e) => handleLanguageChange(language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
