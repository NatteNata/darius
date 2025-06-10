import { createFileRoute } from '@tanstack/react-router'

import {ExperiencesList} from "@/features/experiences/ExperiencesList.tsx";
import {InfiniteScroll} from "@/features/shared/components/InfiniteScroll.tsx";
import {trpc} from "@/router";

export const Route = createFileRoute('/')({
  component: Index,
})

function Index()
{
    const experiencesQuery = trpc.experiences.feed.useInfiniteQuery({}, {
        getNextPageParam: lastPage => lastPage.nextCursor
    });

    return (
        <InfiniteScroll onLoadMore={experiencesQuery.fetchNextPage}>
            <ExperiencesList
                experiences={experiencesQuery.data?.pages.flatMap(page => page.experiences) ?? []}
                isLoading={experiencesQuery.isLoading || experiencesQuery.isFetchingNextPage}
            />
        </InfiniteScroll>
    );
}
