const browserAPI = globalThis.chrome || globalThis.browser;

export async function getOptions() {
    try {
        return await browserAPI.storage.sync.get();
    } catch (error) {
        console.error('Error getting settings:', error);
        return {};
    }
}

export async function getLocalOptions() {
    try {
        const storage = browserAPI.storage.local;

        return await storage.get();
    } catch (error) {
        console.error('Error getting options:', error);

        return null;
    }
}

export async function setLocalOption(key: string, value: any) {
    try {
        // Handle both Chrome and Firefox
        const storage = browserAPI.storage.local;
        await storage.set({[key]: value});

        return true;
    } catch (error) {
        console.error('Error setting option:', error);

        return false;
    }
}
