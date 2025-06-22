import { Experience,User } from "@advanced-react/server/database/schema.ts";

type ExperienceWithUser = Experience & {
  user: User;
};

type ExperienceWithCommentsCount = Experience & {
  commentsCount: number;
};

export type ExperienceForList = ExperienceWithUser & ExperienceWithCommentsCount;

export type ExperienceForDetails = ExperienceWithUser & ExperienceWithCommentsCount;