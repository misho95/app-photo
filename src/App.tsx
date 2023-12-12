import { Photo } from "pexels";
import { ImgContainer } from "./components/img.container";
import { FlexContainer } from "./components/reusable/flex.container";
import { usePexelsFetch } from "./utils/custom.hook";
import { useEffect, useState } from "react";
import LoadingComponent from "./components/loading.component";
import { useMeasure, usePrevious, useWindowScroll } from "@uidotdev/usehooks";
import { FaArrowCircleUp } from "react-icons/fa";
import Modal from "./components/modal";
import { modalState } from "./utils/zustand";
import Header from "./header";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<number>(0);
  const { data, isLoading } = usePexelsFetch(25, query, page);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [{ y }, scrollTo] = useWindowScroll();
  const prevY = usePrevious(y);
  const [contentRef, { height }] = useMeasure();
  const modalOpen = modalState((state) => state.open);

  const resetPage = () => {
    scrollTo({ left: 0, top: 0 });
    if (query !== "" || page > 0) {
      setPhotos([]);
    }
    if (page > 0) {
      setPage(0);
    }
    setQuery("");
  };

  const handleChangeQuery = (value: string) => {
    if (value === " ") {
      return;
    }
    setQuery(value);
  };

  useEffect(() => {
    const uniqueIds = new Set(photos.map((photo) => photo.id));
    const newPhotos = data.filter((photo) => !uniqueIds.has(photo.id));

    if (newPhotos.length > 0) {
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    }
  }, [data]);

  useEffect(() => {
    if (y === 0 && !isLoading) {
      scrollTo({ left: 0, top: prevY, behavior: "smooth" });
    }
  }, [height]);

  useEffect(() => {
    const position = window.innerHeight + window.scrollY;
    const bottom = document.documentElement.offsetHeight;
    if (position === bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [y]);

  useEffect(() => {
    setPhotos([]);
    setPage(0);
  }, [query]);

  if (!photos) {
    return <LoadingComponent />;
  }

  return (
    <>
      {modalOpen && <Modal />}
      {isLoading && <LoadingComponent />}
      <button
        onClick={() => {
          scrollTo({ left: 0, top: 0, behavior: "smooth" });
        }}
        className="fixed bottom-[10px] right-[10px] z-40 border-[1px] border-neutral-200 p-[5px] rounded-full bg-neutral-800 sm:hover:scale-110 duration-200"
      >
        <FaArrowCircleUp className={"text-neutral-200 w-[20px] h-[20px] "} />
      </button>
      <div
        ref={contentRef}
        className="bg-neutral-200 w-full min-h-screen flex flex-col overflow-hidden"
      >
        <Header props={{ resetPage, query, handleChangeQuery }} />

        <FlexContainer>
          {photos.map((p: Photo) => {
            return <ImgContainer key={p.id} data={p} />;
          })}
        </FlexContainer>
      </div>
    </>
  );
};

export default App;
