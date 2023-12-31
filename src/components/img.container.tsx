import { Photo } from "pexels";
import { ItemContainer } from "./reusable/item.container";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import React from "react";
import { dataIdLoaded, modalState } from "../utils/zustand";

interface PropsType {
  data: Photo;
}

const MemoizedImgContainer = ({ data }: PropsType) => {
  if (!data || !data.alt) {
    return;
  }

  const [load, setLoad] = useState(false);
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const openModal = modalState((state) => state.setOpen);
  const setId = dataIdLoaded((state) => state.setId);

  const [size, changeSize] = useState<
    "small" | "medium" | "large" | "large2x" | "original"
  >("small");

  const updateSize = (currentSize: string) => {
    switch (currentSize) {
      case "small":
        return "medium";
      case "medium":
        return "large";
      case "large":
        return "large2x";
      case "large2x":
        return "original";
      default:
        return "small";
    }
  };

  const handleLoad = () => {
    if (!load) {
      setLoad(true);
    }
    if (size === "large") {
      return;
    }
    setTimeout(() => {
      const nextSize = updateSize(size);
      changeSize(nextSize);
    }, 500);
  };

  const handleOnClick = () => {
    openModal();
    setId(data.id);
  };

  return (
    <ItemContainer
      tailWind={load ? "sm:hover:scale-110 duration-200 sm:hover:z-30" : ""}
    >
      <figure ref={ref} className="w-full h-full">
        {entry?.isIntersecting && (
          <img
            onClick={handleOnClick}
            onLoad={handleLoad}
            src={data.src[`${size}`]}
            alt={data.alt}
            loading="lazy"
            className="object-cover object-center w-full h-full"
          />
        )}
      </figure>
    </ItemContainer>
  );
};

export const ImgContainer = React.memo(MemoizedImgContainer);
