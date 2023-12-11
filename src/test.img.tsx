import { Photo } from "pexels";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useGetCardRow, useGetCardSize } from "./custom.hook";
import { useContext, useEffect } from "react";
import { divWidthContext } from "./context";

interface PropsType {
  data: Photo;
}

const TestImgContainer = ({ data }: PropsType) => {
  const context = useContext(divWidthContext);
  if (!context) {
    return;
  }

  const { width, height, gap } = useGetCardSize({
    width: 300,
    height: 300,
    row: useGetCardRow({ desktop: 5, tablet: 3, midMobile: 2, mobile: 1 }),
    divSize: context.divWidth,
    gap: 0,
  });

  useEffect(() => {
    context.retrieveGapSize(gap);
  }, [gap]);

  if (!data || !data.alt) {
    return;
  }
  return (
    <div className="sm:hover:scale-110 duration-200 sm:hover:z-50">
      <img
        src={data.src.large2x}
        alt={data.alt}
        loading="lazy"
        className="object-cover object-center"
        style={{ width, height }}
      />
    </div>
  );
};

export default TestImgContainer;
