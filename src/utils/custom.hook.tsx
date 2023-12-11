import { usePrevious, useWindowSize } from "@uidotdev/usehooks";
import { Photo, createClient } from "pexels";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const calculatedSize = useMemo(() => {
    if (!divSize) {
      return { width: 0, height: 0 };
    }
    const aspectRatio = width / height;
    const totalGapWidth = gap * (row - 1);
    const availableWidth = divSize - totalGapWidth;
    const baseWidth = Math.floor(availableWidth / row);
    const remainder = availableWidth % row;

    // Distribute the remainder equally among cards
    const customWidth = baseWidth + Math.floor(remainder / row);
    const customHeight = Math.floor(customWidth / aspectRatio);

    return { width: customWidth, height: customHeight };
  }, [width, height, divSize, row, gap]);

  const { width: cardWidth, height: cardHeight } = calculatedSize;

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

  const cardRow = useMemo(() => {
    if (windowSize.width && windowSize.width > 1364) {
      return desktop;
    } else if (windowSize.width && windowSize.width > 726) {
      return tablet;
    } else if (windowSize.width && windowSize.width > 400) {
      return midMobile;
    } else {
      return mobile;
    }
  }, [windowSize, desktop, tablet, midMobile, mobile]);

  return cardRow;
};

export const usePexelsFetch = (
  per_page: number,
  query?: string,
  page?: number
) => {
  const [data, setData] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const prevQuery = usePrevious(query);
  const client = createClient(
    "EYIE9MZj9v0jqIenfIYwBfL1z8qajnG8jKB1EtpwZZZBHp5GYsBj17yr"
  );

  const fetchMoreData = useCallback(() => {
    setIsLoading(true);
    if (query && prevQuery !== query) {
      setData([]);
    }

    let fetchPhotos;
    if (!query) {
      fetchPhotos = client.photos.curated({ per_page, page });
    } else {
      fetchPhotos = client.photos.search({ query, per_page, page });
    }

    fetchPhotos
      .then((res) => {
        if ("photos" in res) {
          setData(res.photos);
          setIsLoading(false);
          return;
        }
      })
      .catch((error) => {
        setData(error);
        setIsLoading(false);
      });
  }, [client.photos, per_page, query, prevQuery, page]);

  useEffect(() => {
    fetchMoreData();
  }, [per_page, query, page]);

  return { data, isLoading };
};
