const browserAPI = globalThis.chrome || globalThis.browser;

export async function getCurrentTab(): Promise<any> {
    let queryOptions: { currentWindow: boolean; active: boolean } = {active: true, currentWindow: true};
    let [tab] = await browserAPI.tabs.query(queryOptions);
    return tab;
}
