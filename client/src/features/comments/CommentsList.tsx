import { CommentCard } from "@/features/comments/CommentCard.tsx";
import { CommentForList } from "@/features/comments/types.ts";
import Spinner from "@/features/shared/components/ui/Spinner.tsx";

type CommentsListProps = {
  comments: CommentForList[];
  isLoading: boolean;
  noCommentsMessage?: string;
};

export function CommentsList({
  comments,
  isLoading,
  noCommentsMessage = "No comments yet.",
}: CommentsListProps) {


  return (
    <div className={"space-y-4"}>
      {comments.map((comment: CommentForList) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
      {isLoading && (
        <div className={'flex justify-center'}><Spinner /></div>
      )}
      {!isLoading && comments.length === 0 && <div className={'flex justify-center'}>{noCommentsMessage}</div>}
    </div>
  );
}
