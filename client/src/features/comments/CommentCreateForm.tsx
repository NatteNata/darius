import { Experience } from "@advanced-react/server/database/schema.ts";
import { commentValidationSchema } from "@advanced-react/shared/schema/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/features/shared/components/ui/Button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/features/shared/components/ui/Form.tsx";
import { TextArea } from "@/features/shared/components/ui/TextArea.tsx";
import { useToast } from "@/features/shared/hooks/useToast.ts";
import { trpc } from "@/router.ts";

type CommentCreateFormData = z.infer<typeof commentValidationSchema>;

type CommentCreateFormProps = {
  experienceId: Experience["id"];
};

export function CommentCreateForm({ experienceId }: CommentCreateFormProps) {
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const form = useForm<CommentCreateFormData>({
    resolver: zodResolver(commentValidationSchema),
    defaultValues: {
      content: "",
    },
  });

  const addCommentMutation = trpc.comments.add.useMutation({
    onSuccess: async ({ experienceId }) => {
      await Promise.all([
        utils.experiences.feed.invalidate({}),
        utils.comments.byExperienceId.invalidate({ experienceId }),
      ]);

      form.reset();

      toast({
        title: "Comment added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add comment",
        description: error?.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = form.handleSubmit((data: CommentCreateFormData) => {
    addCommentMutation.mutate({
      experienceId,
      content: data.content,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={"space-y-4"}>
        <FormField
          control={form.control}
          name={"content"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextArea {...field} placeholder={"Add a comment..."} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type={"submit"} disabled={addCommentMutation.isPending}>
          Add comment
        </Button>
      </form>
    </Form>
  );
}
