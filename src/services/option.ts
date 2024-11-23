const browserAPI = globalThis.chrome || globalThis.browser;

export async function getOptions() {
    try {
        return await browserAPI.storage.sync.get();
    } catch (error) {
        console.error('Error getting settings:', error);
        return {};
    }
}
