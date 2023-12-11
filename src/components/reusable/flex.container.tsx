import { useMeasure } from "@uidotdev/usehooks";
import { ReactNode, useState } from "react";
import { divWidthContext } from "../../utils/context";
import React from "react";

interface styleType {
  [key: string]: string;
}

interface PropsType {
  children: ReactNode;
  style?: styleType;
}

const MemoizedFlexContainer = ({ children, style }: PropsType) => {
  const [containerSize, { width }] = useMeasure();
  const [gap, setGap] = useState(0);

  const retrieveGapSize = (gap: number) => {
    setGap(gap);
  };

  type MyCustomType = {
    gap: number;
    display: string;
    flexWrap: "nowrap" | "wrap" | "wrap-reverse";
  };

  const mergedStyles: MyCustomType = {
    gap: gap,
    display: "flex",
    flexWrap: "wrap",
    ...style,
  };

  return (
    <divWidthContext.Provider value={{ width, retrieveGapSize }}>
      <section ref={containerSize} style={{ ...mergedStyles }}>
        {children}
      </section>
    </divWidthContext.Provider>
  );
};

export const FlexContainer = React.memo(MemoizedFlexContainer);
