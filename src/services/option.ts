const browserAPI = globalThis.chrome || globalThis.browser;

export async function getOptions(storageLocation: 'sync' | 'local' = 'sync') {
    try {
        if (storageLocation === 'sync') {
            return await browserAPI.storage.sync.get();
        }

        return await browserAPI.storage.local.get();
    } catch (error) {
        console.error('Error getting options:', error);

        return null;
    }
}

export async function setOption(key: string, value: any, storageLocation: 'sync' | 'local' = 'sync') {
    try {
        const storage = storageLocation === 'sync' ? browserAPI.storage.sync : browserAPI.storage.local;
        await storage.set({[key]: value});

        return true;
    } catch (error) {
        console.error('Error setting option:', error);

        return false;
    }
}
