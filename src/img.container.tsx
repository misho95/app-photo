import { Photo } from "pexels";
import ItemContainer from "./item.container";
import { useIntersectionObserver } from "@uidotdev/usehooks";

interface PropsType {
  data: Photo;
}

const ImgContainer = ({ data }: PropsType) => {
  if (!data || !data.alt) {
    return;
  }

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  return (
    <ItemContainer tailWind={"sm:hover:scale-110 duration-200 sm:hover:z-30"}>
      <figure ref={ref} className="w-full h-full">
        {entry?.isIntersecting && (
          <img
            src={data.src.large}
            alt={data.alt}
            loading="lazy"
            className="object-cover object-center w-full h-full"
          />
        )}
      </figure>
    </ItemContainer>
  );
};

export default ImgContainer;
