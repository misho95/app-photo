import "react-lazy-load-image-component/src/effects/blur.css";
import { useGetCardRow, useGetCardSize } from "../../utils/custom.hook";
import { ReactNode, useContext, useEffect } from "react";
import { divWidthContext } from "../../utils/context";
import React from "react";

interface styleType {
  [key: string]: string;
}

interface PropsType {
  children: ReactNode;
  style?: styleType;
  tailWind?: string;
}

const MemoizedItemContainer = ({ children, style, tailWind }: PropsType) => {
  const context = useContext(divWidthContext);
  if (!context) {
    return;
  }

  const { width, height, gap } = useGetCardSize({
    width: 300,
    height: 300,
    row: useGetCardRow({ desktop: 5, tablet: 3, midMobile: 2, mobile: 1 }),
    divSize: context.width,
    gap: 0,
  });

  useEffect(() => {
    context.retrieveGapSize(gap);
  }, [gap]);

  const mergedStyles = {
    width,
    height,
    overflow: "hidden",
    ...style,
  };

  return (
    <article className={tailWind} style={mergedStyles}>
      {children}
    </article>
  );
};

export const ItemContainer = React.memo(MemoizedItemContainer);
