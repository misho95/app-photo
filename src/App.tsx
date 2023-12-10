import { useState } from "react";

const App = () => {
  const [data, setData] = useState<Photos | ErrorResponse>();

  useEffect(() => {
    const client = createClient(
      "EYIE9MZj9v0jqIenfIYwBfL1z8qajnG8jKB1EtpwZZZBHp5GYsBj17yr"
    );
    // const query = "Nature";

    client.photos.curated({ per_page: 50 }).then((photos) => {
      setData(photos);
    });
  }, []);
  return <>hello</>;
};

export default App;
