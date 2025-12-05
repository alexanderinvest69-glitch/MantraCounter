import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useCounter } from "@/context/CounterContext";

export function useTheme() {
  const systemScheme = useColorScheme() ?? "light";
  const { settings } = useCounter();
  const scheme =
    settings?.theme === "auto" ? systemScheme : (settings?.theme ?? "light");
  const isDark = scheme === "dark";
  const theme = Colors[scheme];

  return {
    theme,
    isDark,
  };
}
