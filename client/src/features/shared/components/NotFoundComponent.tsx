import { AlertCircle } from "lucide-react";

import Card from "@/features/shared/components/ui/Card.tsx";

export function NotFoundComponent() {
  return (
    <Card className={"flex flex-col items-center justify-center gap-2"}>
      <AlertCircle className={"h-8 w-8"} />
      <p>The page you are looking for does not exist.</p>
    </Card>
  );
}
