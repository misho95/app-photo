import { useWindowSize } from "@uidotdev/usehooks";
import { ErrorResponse, Photos, createClient } from "pexels";
import { useEffect, useState } from "react";

interface GetCardSizePropsType {
  width: number;
  height: number;
  row: number;
  divSize: number | null;
  gap: number;
}

export const useGetCardSize = ({
  width,
  height,
  row,
  divSize,
  gap,
}: GetCardSizePropsType) => {
  const [cardWidth, setCardWidth] = useState<number>(0);
  const [cardHeight, setCardHeight] = useState<number>(0);

  useEffect(() => {
    if (!divSize) {
      return;
    }
    const aspectRatio = width / height;
    const totalGapWidth = gap * (row - 1);
    const availableWidth = divSize - totalGapWidth;
    const baseWidth = Math.floor(availableWidth / row);
    const remainder = availableWidth % row;

    // Distribute the remainder equally among cards
    const customWidth = baseWidth + Math.floor(remainder / row);
    const customHeight = Math.floor(customWidth / aspectRatio);

    setCardWidth(customWidth);
    setCardHeight(customHeight);
  }, [width, height, divSize, row, gap]);

  return { width: cardWidth, height: cardHeight, gap: gap };
};

interface useGetCardRowPropsType {
  desktop: number;
  tablet: number;
  midMobile: number;
  mobile: number;
}
export const useGetCardRow = ({
  desktop,
  tablet,
  midMobile,
  mobile,
}: useGetCardRowPropsType) => {
  const windowSize = useWindowSize();

  if (windowSize.width && windowSize.width > 1364) {
    return desktop;
  } else if (windowSize.width && windowSize.width > 726) {
    return tablet;
  } else if (windowSize.width && windowSize.width > 400) {
    return midMobile;
  } else {
    return mobile;
  }
};

export const usePexelsFetch = (per_page: number, query?: string) => {
  const [data, setData] = useState<Photos | ErrorResponse>();
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const client = createClient(
    "EYIE9MZj9v0jqIenfIYwBfL1z8qajnG8jKB1EtpwZZZBHp5GYsBj17yr"
  );

  useEffect(() => {
    setIsLoading(true); // Set loading to true on fetch start

    let fetchPhotos;
    if (!query) {
      fetchPhotos = client.photos.curated({ per_page });
    } else {
      fetchPhotos = client.photos.search({ query, per_page });
    }

    fetchPhotos
      .then((photos) => {
        setData(photos);
        setIsLoading(false); // Set loading to false on fetch completion
      })
      .catch((error) => {
        setData(error);
        setIsLoading(false); // Set loading to false on fetch error
      });
  }, [per_page, query]);

  return { data, isLoading }; // Return both data and loading state
};
