"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface ApiRunnerResponseProps {
  resRef: React.RefObject<HTMLDetailsElement | null>;
  handleResToggle: () => void;
  resToggleState: boolean;
  responseCode: string;
}

export function ApiRunnerResponse({
  resRef,
  handleResToggle,
  resToggleState,
  responseCode,
}: ApiRunnerResponseProps) {
  return (
    <details
      ref={resRef}
      onToggle={handleResToggle}
      open
      className="overflow-y-auto"
    >
      <summary
        className="flex flex-col gap-1 p-2 sticky top-0"
        style={{
          background:
            "linear-gradient(2deg, rgb(255, 255, 255) 0%, rgb(255, 194, 179) 100%)",
        }}
      >
        <div className="uppercase font-semibold font-inter flex items-center gap-2">
          {resToggleState ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}{" "}
          response
        </div>
        <div className="flex flex-col items-center">
          <span>You are seeing a sample response</span>
          <button
            className="text-sm font-semibold font-inter text-white"
            style={{
              display: "flex",
              padding: "0.5rem 2rem",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.625rem",
              border: "1px solid #012A38",
              background:
                "linear-gradient(320deg, #90C2C7 16.76%, #F30 90.72%)",
            }}
          >
            Log in to play with your own data
          </button>
        </div>
      </summary>
      <div className="overflow-y-scroll h-full">
        <SyntaxHighlighter
          customStyle={{
            background: "hsl(0 0% 100% / 0.5)",
          }}
          language="json"
          style={tomorrow}
        >
          {responseCode}
        </SyntaxHighlighter>
      </div>
    </details>
  );
}
