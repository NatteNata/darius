import {Comment,User} from "@advanced-react/server/database/schema.ts";

type CommentWithUser = Comment & {
    user: User
}

export type CommentForList = CommentWithUser
