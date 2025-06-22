import { useRouter } from "@tanstack/react-router";
import { AlertTriangle, RefreshCcw } from "lucide-react";

import { Button } from "@/features/shared/components/ui/Button.tsx";
import Card from "@/features/shared/components/ui/Card.tsx";

export function ErrorComponent() {
  const router = useRouter();

  return (
    <Card className={'flex flex-col justify-center items-center gap-2'}>
      <AlertTriangle className={"h-8 w-8"} />
      <p>Something went wrong.</p>
      <Button variant={"ghost"} onClick={() => router.invalidate()}>
        <RefreshCcw className={"h-4 w-4"} />
        Try again
      </Button>
    </Card>
  );
}
