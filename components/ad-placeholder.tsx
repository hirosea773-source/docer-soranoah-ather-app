import React from "react";

interface AdPlaceholderProps {
  type: "header" | "sidebar" | "footer";
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type }) => {
  let widthClass = "";
  let heightClass = "";
  let marginClass = "";

  switch (type) {
    case "header":
      widthClass = "max-w-[728px] w-full";
      heightClass = "h-[90px]";
      marginClass = "mb-10";
      break;
    case "sidebar":
      widthClass = "w-full";
      heightClass = "h-[600px]";
      marginClass = ""; // sidebar内のsticky要素なので、marginは親で制御
      break;
    case "footer":
      widthClass = "max-w-[728px] w-full";
      heightClass = "h-[90px]";
      marginClass = "mb-8";
      break;
  }

  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 ${marginClass} flex justify-center`}
    >
      <div
        className={`${widthClass} ${heightClass} bg-card border border-border flex items-center justify-center rounded`}
      >
        <span className="text-xs text-sec-text tracking-widest uppercase">
          広告
        </span>
      </div>
    </div>
  );
};

export default AdPlaceholder;
