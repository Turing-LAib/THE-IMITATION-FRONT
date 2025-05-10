import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 5,
  onComplete,
  className,
  style,
}) => {
  const [displayText, setDisplayText] = useState("");
  const isMounted = useRef(true);

  const textGenerator = async function* () {
    let currentText = "";
    for (let i = 0; i < text.length; i += 2) {
      if (!isMounted.current) break;
      await new Promise((resolve) => setTimeout(resolve, speed));
      const chars =
        i + 1 < text.length
          ? text.substring(i, i + 2)
          : text.substring(i, i + 1);
      currentText += chars;
      yield currentText;
    }
  };

  useEffect(() => {
    const executeEffect = async () => {
      const generator = textGenerator();

      try {
        for await (const currentText of generator) {
          if (!isMounted.current) break;

          setDisplayText(currentText);
        }
        onComplete?.();
      } catch (err) {
        console.error("Typewriter interrupted:", err);
      }
    };

    executeEffect();

    return () => {
      isMounted.current = false;
    };
  }, [text, speed]);

  return (
    <div
      className={className}
      style={{
        overflowY: "auto",
        whiteSpace: "pre-wrap",
        ...style,
      }}
    >
      <Markdown>{displayText}</Markdown>
    </div>
  );
};

export default Typewriter;
