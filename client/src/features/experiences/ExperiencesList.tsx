import { ExperienceCard } from "@/features/experiences/ExperienceCard.tsx";
import { ExperienceForList } from "@/features/experiences/types.ts";
import Spinner from "@/features/shared/components/ui/Spinner.tsx";

type Props = {
  experiences: ExperienceForList[];
  isLoading?: boolean;
  noExperiencesMessage?: string;
};

export function ExperiencesList({
  experiences,
  isLoading,
  noExperiencesMessage = "No experiences found.",
}: Props) {
  return (
    <div className={"space-y-4"}>
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
      {isLoading && (
        <div className={"flex justify-center"}>
          <Spinner />
        </div>
      )}
      {!isLoading && experiences.length === 0 && (
        <div className={"flex justify-center"}>{noExperiencesMessage}</div>
      )}
    </div>
  );
}
