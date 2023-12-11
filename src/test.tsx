import { ErrorResponse, Photos, Photo, createClient } from "pexels";
import { useState, useEffect } from "react";
import FlexContainer from "./flex.container";
import TestImgContainer from "./test.img";

const Test = () => {
  const [data, setData] = useState<Photos | ErrorResponse>();

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

  if (data && "photos" in data) {
    return (
      <div className="bg-neutral-200 w-full min-h-screen overflow-hidden">
        <FlexContainer>
          {data.photos.map((p: Photo) => {
            return <TestImgContainer key={p.id} data={p} />;
          })}
        </FlexContainer>
      </div>
    );
  }
};

export default Test;
