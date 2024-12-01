import {getOptions, setOption} from "./option";

export async function initTheme(): Promise<'dark' | 'light' | 'system'> {
    const options = await getOptions('local');

    return changeTheme(options?.theme ?? 'system');
}

export async function changeTheme(theme: 'system' | 'dark' | 'light' = 'system'): Promise<'dark' | 'light' | 'system'> {
    if (theme !== 'system') {
        applyTheme(theme);
        await setOption('theme', theme, 'local');

        return theme;
    }

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(systemTheme);
    await setOption('theme', 'system', 'local');

    return 'system';
}

function applyTheme(theme: 'system' | 'dark' | 'light') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
}
