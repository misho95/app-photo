import { useMeasure } from "@uidotdev/usehooks";
import { ReactNode, useState } from "react";
import { divWidthContext } from "./context";

interface PropsType {
  children: ReactNode;
}

const FlexContainer = ({ children }: PropsType) => {
  const [containerSize, { width }] = useMeasure();
  const [gap, setGap] = useState(0);

  const retrieveGapSize = (gap: number) => {
    setGap(gap);
  };

  return (
    <divWidthContext.Provider value={{ divWidth: width, retrieveGapSize }}>
      <div ref={containerSize} className="flex flex-wrap" style={{ gap: gap }}>
        {children}
      </div>
    </divWidthContext.Provider>
  );
};

export default FlexContainer;
