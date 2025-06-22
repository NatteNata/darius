import { ExperienceForList } from "@/features/experiences/types.ts";
import { Button } from "@/features/shared/components/ui/Button.tsx";
import Card from "@/features/shared/components/ui/Card.tsx";
import Link from "@/features/shared/components/ui/Link.tsx";
import { LinkIcon, MessageSquare } from "lucide-react";

type ExperienceCardProps = {
  experience: ExperienceForList;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className={"overflow-auto p-0"}>
      <ExperienceMedia experience={experience} />
      <div className={"w-full space-y-4 p-4"}>
        <ExperienceCardHeader experience={experience} />
        <ExperienceCardContent experience={experience} />
        <ExperienceCardMeta experience={experience} />
        <ExperienceCardMetricButtons experience={experience} />
      </div>
    </Card>
  );
}

type ExperienceMediaProps = Pick<ExperienceCardProps, "experience">;

const ExperienceMedia = ({ experience }: ExperienceMediaProps) => {
  if (!experience.imageUrl) {
    return null;
  }

  return (
    <div className={"aspect-video w-full"}>
      <img
        src={experience.imageUrl}
        alt={experience.title}
        className={"h-full w-full object-cover"}
      />
    </div>
  );
};

type ExperienceCardHeaderProps = Pick<ExperienceCardProps, "experience">;

const ExperienceCardHeader = ({ experience }: ExperienceCardHeaderProps) => {
  return (
    <div>
      <div>{experience.user.name}</div>
      <Link
        to={"/experiences/$experienceId"}
        params={{ experienceId: experience.id }}
      >
        <h2 className={"text-xl font-bold"}>{experience.title}</h2>
      </Link>
    </div>
  );
};

type ExperienceCardContentProps = Pick<ExperienceCardProps, "experience">;

const ExperienceCardContent = ({ experience }: ExperienceCardContentProps) => {
  return <p>{experience.content}</p>;
};

type ExperienceCardMetaProps = Pick<ExperienceCardProps, "experience">;

const ExperienceCardMeta = ({ experience }: ExperienceCardMetaProps) => {
  return (
    <div
      className={
        "flex items-center gap-4 text-neutral-600 dark:text-neutral-400"
      }
    >
      <time>{new Date(experience.scheduledAt).toLocaleString()}</time>
      {experience.url && (
        <div className={"flex items-center gap-2"}>
          <LinkIcon
            size={16}
            className={"text-secondary-500 dark:text-primary-500"}
          />
          <a
            target={"_blank"}
            href={experience.url}
            className={
              "text-secondary-500 dark:text-primary-500 hover:underline"
            }
          >
            Event details
          </a>
        </div>
      )}
    </div>
  );
};

type ExperienceCardMetricButtonsProps = Pick<ExperienceCardProps, "experience">;

const ExperienceCardMetricButtons = ({
  experience,
}: ExperienceCardMetricButtonsProps) => {
  return (
    <div className={"flex items-center gap-2"}>
      <Button variant={"link"} asChild>
        <Link
          to={"/experiences/$experienceId"}
          params={{ experienceId: experience.id }}
          variant={"ghost"}
        >
          <MessageSquare className={"h-5 w-5"} />
          <span>{experience.commentsCount}</span>
        </Link>
      </Button>
    </div>
  );
};
