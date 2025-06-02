import { useCallback, useRef } from "react";

const useLoadMoreEntities = (
  fetchNextPage: () => void,
  isFetchingNextPage: boolean,
  hasNextPage: boolean,
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastEntityRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return lastEntityRef;
};

export default useLoadMoreEntities;
