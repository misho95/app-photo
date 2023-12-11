import { Photo } from "pexels";
import ImgContainer from "./img.container";
import FlexContainer from "./flex.container";
import { usePexelsFetch } from "./custom.hook";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const { data, isLoading } = usePexelsFetch(query ? 25 : 27, query);

  if (data && "photos" in data) {
    return (
      <div className="bg-neutral-200 w-full min-h-screen flex flex-col overflow-hidden">
        <header className="p-[20px] mb-[10px] flex justify-between items-center gap-[10px]">
          <h3
            onClick={() => {
              setQuery("");
            }}
            className="text-[25px] sm:text-[35px] select-none cursor-pointer w-fit text-center"
          >
            PEXEL GALLERY
          </h3>

          <label className="w-1/2">
            <input
              type="text"
              placeholder="search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl p-[10px] bg-neutral-800 text-white"
            />
          </label>
        </header>
        {isLoading ? (
          "loading..."
        ) : (
          <FlexContainer>
            {data.photos.map((p: Photo) => {
              return <ImgContainer key={p.id} data={p} />;
            })}
          </FlexContainer>
        )}
      </div>
    );
  }
};

export default App;
