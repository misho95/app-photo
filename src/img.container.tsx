import { Photo } from "pexels";
import ItemContainer from "./item.container";

interface PropsType {
  data: Photo;
}

const ImgContainer = ({ data }: PropsType) => {
  if (!data || !data.alt) {
    return;
  }
  return (
    <ItemContainer tailWind={"sm:hover:scale-110 duration-200 sm:hover:z-50"}>
      <img
        src={data.src.large2x}
        alt={data.alt}
        loading="lazy"
        className="object-cover object-center w-full h-full"
      />
    </ItemContainer>
  );
};

export default ImgContainer;
