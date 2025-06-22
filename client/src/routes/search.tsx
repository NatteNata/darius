import { experienceFiltersSchema } from "@advanced-react/shared/schema/experience";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { ExperienceFilters } from "@/features/experiences/components/ExperienceFilters.tsx";
import { ExperiencesList } from "@/features/experiences/components/ExperiencesList.tsx";
import { InfiniteScroll } from "@/features/shared/components/InfiniteScroll.tsx";
import { trpc } from "@/router.tsx";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  validateSearch: experienceFiltersSchema,
});

function SearchPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const experiencesQuery = trpc.experiences.search.useInfiniteQuery(search, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!search.q,
  });
  return (
    <main className={'space-y-4'}>
      <ExperienceFilters
        initialFilters={search}
        onFiltersChange={(filters) => {
          navigate({
            search: filters,
          });
        }}
      />
      <InfiniteScroll onLoadMore={!!search.q ? experiencesQuery.fetchNextPage : undefined}>
        <ExperiencesList
          experiences={
            experiencesQuery.data?.pages.flatMap((page) => page.experiences) ??
            []
          }
          isLoading={
            experiencesQuery.isLoading || experiencesQuery.isFetchingNextPage
          }
          noExperiencesMessage={
            !!search.q ? "No experiences found" : "Search to fine experiences"
          }
        />
      </InfiniteScroll>
    </main>
  );
}
