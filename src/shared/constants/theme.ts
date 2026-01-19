export const THEME = {
    COLORS: {
        VOID: '#000000',
        TITANIUM: '#B0B0B0',
        PLASMA_BLUE: '#00D1FF',
        SPACE_GRAY: '#1A1A1A',
        THERMAL_GOLD: 'rgba(255, 215, 0, 0.15)', // 15% opacity as per Master Guideline
        CRIMSON_ALERT: '#FF3E3E', // High-visibility tactical red
    },
    FONTS: {
        PRIMARY: 'TT Octosquares Trial Thin',
    },
    RENDERING: {
        LINE_WIDTH: 0.5,
        TARGET_FPS: 60,
    }
} as const;
