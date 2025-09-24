// colorUtils.ts

// Your database colors (these match Tailwind's 500 values)
export const colorData = [
  { color_id: 1, name: "slate", hex_code: "#64748b" },
  { color_id: 2, name: "gray", hex_code: "#6b7280" },
  { color_id: 3, name: "zinc", hex_code: "#71717a" },
  { color_id: 4, name: "neutral", hex_code: "#737373" },
  { color_id: 5, name: "stone", hex_code: "#78716c" },
  { color_id: 6, name: "red", hex_code: "#ef4444" },
  { color_id: 7, name: "orange", hex_code: "#f97316" },
  { color_id: 8, name: "amber", hex_code: "#f59e0b" },
  { color_id: 9, name: "yellow", hex_code: "#eab308" },
  { color_id: 10, name: "lime", hex_code: "#84cc16" },
  { color_id: 11, name: "green", hex_code: "#22c55e" },
  { color_id: 12, name: "emerald", hex_code: "#10b981" },
  { color_id: 13, name: "teal", hex_code: "#14b8a6" },
  { color_id: 14, name: "cyan", hex_code: "#06b6d4" },
  { color_id: 15, name: "sky", hex_code: "#0ea5e9" },
  { color_id: 16, name: "blue", hex_code: "#3b82f6" },
  { color_id: 17, name: "indigo", hex_code: "#6366f1" },
  { color_id: 18, name: "violet", hex_code: "#8b5cf6" },
  { color_id: 19, name: "purple", hex_code: "#a855f7" },
  { color_id: 20, name: "fuchsia", hex_code: "#d946ef" },
  { color_id: 21, name: "pink", hex_code: "#ec4899" },
  { color_id: 22, name: "rose", hex_code: "#f43f5e" },
];

// Exact Tailwind color palettes
export const tailwindColors = {
  slate: {
    300: "#cbd5e1",
    400: "#94a3b8", 
    500: "#64748b",
    600: "#475569",
    700: "#334155"
  },
  gray: {
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280", 
    600: "#4b5563",
    700: "#374151"
  },
  zinc: {
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b", 
    700: "#3f3f46"
  },
  neutral: {
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040"
  },
  stone: {
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c"
  },
  red: {
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c"
  },
  orange: {
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c"
  },
  amber: {
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309"
  },
  yellow: {
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207"
  },
  lime: {
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f"
  },
  green: {
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d"
  },
  emerald: {
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857"
  },
  teal: {
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e"
  },
  cyan: {
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490"
  },
  sky: {
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1"
  },
  blue: {
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8"
  },
  indigo: {
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca"
  },
  violet: {
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9"
  },
  purple: {
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce"
  },
  fuchsia: {
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf"
  },
  pink: {
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d"
  },
  rose: {
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c"
  }
};

// Create lookup map for O(1) access
export const colorLookup = colorData.reduce((acc, color) => {
  acc[color.color_id] = color;
  acc[color.name] = color;
  return acc;
}, {} as Record<string | number, (typeof colorData)[0]>);

// Get exact Tailwind color shades
export function getColorShades(colorId: number | string) {
  const color = colorLookup[colorId];
  if (!color) return null;

  const colorName = color.name as keyof typeof tailwindColors;
  const tailwindShades = tailwindColors[colorName];

  if (!tailwindShades) return null;

  return {
    name: color.name,
    baseHex: color.hex_code,
    shades: tailwindShades,
    variants: {
      light: tailwindShades[400],
      base: tailwindShades[500], 
      dark: tailwindShades[600],
    },
  };
}

// Get color variants using exact Tailwind colors
export function getColorVariants(colorId: number | string) {
  const color = colorLookup[colorId];
  if (!color) {
    // Fallback to amber if color not found
    return {
      light: tailwindColors.amber[400],
      base: tailwindColors.amber[500],
      dark: tailwindColors.amber[600],
    };
  }

  const colorName = color.name as keyof typeof tailwindColors;
  const shades = tailwindColors[colorName];

  return {
    light: shades[400],
    base: shades[500],
    dark: shades[600],
  };
}

// CSS custom properties helper with exact Tailwind values
export function getColorCSSVars(colorId: number | string) {
  const colorShades = getColorShades(colorId);
  if (!colorShades) return {};

  return {
    "--color-300": colorShades.shades[300],
    "--color-400": colorShades.shades[400], 
    "--color-500": colorShades.shades[500],
    "--color-600": colorShades.shades[600],
    "--color-700": colorShades.shades[700],
  };
}

// Style objects helper with exact Tailwind colors
export function getColorStyles(colorId: number | string) {
  const colors = getColorVariants(colorId);

  return {
    backgroundLight: { backgroundColor: colors.light },
    backgroundBase: { backgroundColor: colors.base },
    backgroundDark: { backgroundColor: colors.dark },
    textLight: { color: colors.light },
    textBase: { color: colors.base },
    textDark: { color: colors.dark },
    borderLight: { borderColor: colors.light },
    borderBase: { borderColor: colors.base },
    borderDark: { borderColor: colors.dark },
  };
}

// Get color by name or ID
export function getColor(identifier: string | number) {
  return colorLookup[identifier] || null;
}

// Get all available colors
export function getAllColors() {
  return colorData;
}

// Check if a color exists
export function colorExists(colorId: number | string): boolean {
  return colorId in colorLookup;
}

// Get random color
export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colorData.length);
  return colorData[randomIndex];
}

// Get all shades for a specific shade level across all colors
export function getAllColorsAtShade(shade: 300 | 400 | 500 | 600 | 700) {
  return colorData.map(color => ({
    ...color,
    hex_code: tailwindColors[color.name as keyof typeof tailwindColors][shade]
  }));
}

// Get Tailwind class names for a color
export function getTailwindClasses(colorId: number | string) {
  const color = colorLookup[colorId];
  if (!color) return null;

  const name = color.name;
  
  return {
    background: {
      300: `bg-${name}-300`,
      400: `bg-${name}-400`, 
      500: `bg-${name}-500`,
      600: `bg-${name}-600`,
      700: `bg-${name}-700`,
    },
    text: {
      300: `text-${name}-300`,
      400: `text-${name}-400`,
      500: `text-${name}-500`, 
      600: `text-${name}-600`,
      700: `text-${name}-700`,
    },
    border: {
      300: `border-${name}-300`,
      400: `border-${name}-400`,
      500: `border-${name}-500`,
      600: `border-${name}-600`, 
      700: `border-${name}-700`,
    }
  };
}

// Legacy functions for backward compatibility
export function adjustColorBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));

  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
}

export function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0,
    s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

export function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 1 / 6) {
    r = c;
    g = x;
    b = 0;
  } else if (1 / 6 <= h && h < 2 / 6) {
    r = x;
    g = c;
    b = 0;
  } else if (2 / 6 <= h && h < 3 / 6) {
    r = 0;
    g = c;
    b = x;
  } else if (3 / 6 <= h && h < 4 / 6) {
    r = 0;
    g = x;
    b = c;
  } else if (4 / 6 <= h && h < 5 / 6) {
    r = x;
    g = 0;
    b = c;
  } else if (5 / 6 <= h && h < 1) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}