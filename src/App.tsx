import { ErrorResponse, Photos, Photo, createClient } from "pexels";
import { useState, useEffect } from "react";
import ImgContainer from "./img.container";
import { useMeasure } from "@uidotdev/usehooks";

const App = () => {
  const [data, setData] = useState<Photos | ErrorResponse>();
  const [containerSize, { width }] = useMeasure();
  const [gap, setGap] = useState(0);

  useEffect(() => {
    const client = createClient(
      "EYIE9MZj9v0jqIenfIYwBfL1z8qajnG8jKB1EtpwZZZBHp5GYsBj17yr"
    );
    // const query = "Nature";

    client.photos.curated({ per_page: 27 }).then((photos) => {
      console.log(photos);
      setData(photos);
    });
  }, []);

  const retrieveGapSize = (gap: number) => {
    setGap(gap);
  };

  if (data && "photos" in data) {
    return (
      <div className="bg-neutral-200 w-full min-h-screen overflow-hidden">
        <div
          ref={containerSize}
          className="flex flex-wrap"
          style={{ gap: gap }}
        >
          {data.photos.map((p: Photo) => {
            return (
              <ImgContainer
                key={p.id}
                data={p}
                divWith={width}
                retrieveGapSize={retrieveGapSize}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

export default App;
