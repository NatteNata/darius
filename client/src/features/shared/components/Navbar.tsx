import { ToggleTheme } from "@/features/shared/components/ToggleTheme.tsx";

export default function Navigation() {
  return (
    <nav className="flex w-64 flex-col gap-4 pt-8">
      <ToggleTheme />
    </nav>
  );
}
