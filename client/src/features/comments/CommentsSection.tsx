import { Experience } from "@advanced-react/server/database/schema.ts";

import { CommentCreateForm } from "@/features/comments/CommentCreateForm.tsx";
import { CommentsList } from "@/features/comments/CommentsList.tsx";
import { trpc } from "@/router.ts";

type CommentsSectionProps = {
  experienceId: Experience["id"];
  commentsCount: number;
};

export function CommentsSection({
  experienceId,
  commentsCount,
}: CommentsSectionProps) {
  const commentsQuery = trpc.comments.byExperienceId.useQuery(
    { experienceId },
    {
      enabled: commentsCount > 0,
    },
  );

  if (commentsQuery.error) {
    return <h2>Something went wrong.</h2>;
  }

  return (
    <div className="space-y-4">
      <CommentCreateForm experienceId={experienceId} />
      <div className={"font-semibold"}>Comments ({commentsCount})</div>
      <CommentsList
        comments={commentsQuery.data ?? []}
        isLoading={commentsQuery.isLoading}
      />
    </div>
  );
}
