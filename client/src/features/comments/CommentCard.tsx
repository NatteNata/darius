import { useState } from "react";

import { CommentEditForm } from "@/features/comments/CommentEditForm.tsx";
import { CommentForList } from "@/features/comments/types.ts";
import { Button } from "@/features/shared/components/ui/Button.tsx";
import Card from "@/features/shared/components/ui/Card.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/shared/components/ui/Dialog.tsx";
import { useToast } from "@/features/shared/hooks/useToast.ts";
import { trpc } from "@/trpc.ts";

type CommentCardProps = {
  comment: CommentForList;
};

export function CommentCard({ comment }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <CommentEditForm comment={comment} setIsEditing={setIsEditing} />;
  }

  return (
    <Card className={"space-y-4"}>
      <CommentCardHeader comment={comment} />
      <CommentCardContent comment={comment} />
      <CommentCardButtons comment={comment} setIsEditing={setIsEditing} />
    </Card>
  );
}

type CommentCardHeaderProps = Pick<CommentCardProps, "comment">;

function CommentCardHeader({ comment }: CommentCardHeaderProps) {
  return (
    <div className={"flex items-center gap-2"}>
      <div>{comment.user.name}</div>
      <time className={"text-sm text-neutral-500"}>
        {new Date(comment.createdAt).toLocaleString()}
      </time>
    </div>
  );
}

type CommentCardContentProps = Pick<CommentCardProps, "comment">;

function CommentCardContent({ comment }: CommentCardContentProps) {
  return <p>{comment.content}</p>;
}

type CommentCardButtonsProps = Pick<CommentCardProps, "comment"> & {
  setIsEditing: (editing: boolean) => void;
};

function CommentCardButtons({
  comment,
  setIsEditing,
}: CommentCardButtonsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { toast } = useToast();
  const utils = trpc.useUtils();

  const deleteCommentMutation = trpc.comments.delete.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.experiences.feed.invalidate({}),
        utils.comments.byExperienceId.invalidate({
          experienceId: comment.experienceId,
        }),
      ]);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Comment deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete comment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className={"flex gap-4"}>
      <Button
        type={"button"}
        variant={"link"}
        onClick={() => setIsEditing(true)}
      >
        Edit
      </Button>
      <Dialog onOpenChange={setIsDeleteDialogOpen} open={isDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive-link"}>Delete</Button>
        </DialogTrigger>
        <DialogContent className={"space-y-2"}>
          <DialogHeader>
            <DialogTitle>Delete comment</DialogTitle>
          </DialogHeader>

          <p className={"text-neutral-600 dark:text-neutral-400"}>
            Are you sure you want to delete this comment?
          </p>

          <DialogFooter>
            <Button
              type={"button"}
              variant={"outline"}
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type={"button"}
              variant={"destructive"}
              onClick={() => deleteCommentMutation.mutate({ id: comment.id })}
              disabled={deleteCommentMutation.isPending}
            >
              {deleteCommentMutation.isPending ? "Deleting" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
