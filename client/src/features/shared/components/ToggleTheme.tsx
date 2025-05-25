import {MoonIcon, SunIcon} from "lucide-react";

import {useTheme} from "@/features/shared/components/ThemeProvider.tsx";
import {Button} from "@/features/shared/components/ui/Button.tsx";

export function ToggleTheme()
{
    const {theme, setTheme} = useTheme();
    return (
        <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={'justify-start p-2'}
            variant={"ghost"}
        >
            {theme === "dark" ? (
                    <>
                        <SunIcon/>
                        Light Mode
                    </>)
                : (
                    <>
                        <MoonIcon/>
                        Dark Mode
                    </>
                )
            }
        </Button>
    )
}
