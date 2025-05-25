import { ReactNode, useEffect, useRef } from "react";

type InfiniteScrollProps = {
  children: ReactNode;
  onLoadMore: () => void;
  threshold?: number;
};

export function InfiniteScroll({
  children,
  threshold = 500,
  onLoadMore,
}: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: `0px 0px ${threshold}px 0px `,
      },
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [onLoadMore, threshold]);

  return (
    <div>
      {children}
      <div ref={containerRef} className={"h-1"} />
    </div>
  );
}
