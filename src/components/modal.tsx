import { IoIosCloseCircle } from "react-icons/io";
import { dataIdLoaded, modalState } from "../utils/zustand";
import { useEffect, useState } from "react";
import { ErrorResponse, Photo, createClient } from "pexels";
import LoadingComponent from "./loading.component";
import { useClickAway, useLockBodyScroll } from "@uidotdev/usehooks";

const Modal = () => {
  useLockBodyScroll();
  const [photo, setPhoto] = useState<ErrorResponse | Photo | undefined>();
  const closeModal = modalState((state) => state.setClose);
  const dataId = dataIdLoaded((state) => state.id);
  const clearId = dataIdLoaded((state) => state.clearId);
  const [load, setLoad] = useState(false);
  const modalRef: any = useClickAway(() => {
    closeAndClear();
  });

  useEffect(() => {
    if (dataId) {
      const client = createClient(
        "EYIE9MZj9v0jqIenfIYwBfL1z8qajnG8jKB1EtpwZZZBHp5GYsBj17yr"
      );
      client.photos.show({ id: dataId }).then((res) => {
        setPhoto(res);
      });
    }
  }, []);

  const closeAndClear = () => {
    closeModal();
    clearId();
  };

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
    if (size === "original") {
      return;
    }
    setTimeout(() => {
      const nextSize = updateSize(size);
      changeSize(nextSize);
    }, 300);
  };

  if (!photo) {
    return <LoadingComponent />;
  }

  if ("src" in photo) {
    return (
      <div className="bg-black/50 fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50">
        <button
          onClick={closeModal}
          className="absolute top-[10px] right-[10px] border-[1px] border-neutral-200 p-[5px] rounded-full bg-neutral-800 sm:hover:scale-110 duration-200"
        >
          <IoIosCloseCircle className={"text-neutral-200 w-[20px] h-[20px] "} />
        </button>
        <div ref={modalRef} className="bg-white p-[10px]">
          <img
            onLoad={handleLoad}
            src={photo.src[`${size}`]}
            alt={photo.alt ? photo.alt : ""}
            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] object-cover"
          />
        </div>
      </div>
    );
  }
};

export default Modal;
