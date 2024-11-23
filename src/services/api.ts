import {dispatchCustomEvent} from "../utils/util";

const browserAPI = globalThis.chrome || globalThis.browser;

export function getTags(): object[] {

    return [];
}

export function getGroups(): object[] {

    return [];
}

export async function storeLink(tab: object): Promise<void> {
    let data: { link: any; title: any } = {link: tab.url, title: tab.title};

    const storageData = await browserAPI.storage.sync.get({
        servasUrl: '',
        apiToken: '',
    });

    if ((storageData.servasUrl === '') || (storageData.apiToken === '')) {
        //showResponseMessage('wrong settings');
        return;
    }

    const response: Response | void = await fetch(`${storageData.servasUrl}/api/links`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storageData.apiToken}`,
        },
        body: JSON.stringify(data),
    }).catch(error => {
        console.error(error);

        dispatchCustomEvent('notify', {message: 'fuck off', style: 'danger'});
    });

    if (response?.ok) {
        dispatchCustomEvent('notify', {message: 'Page added', style: 'success'});
    } else if (!response?.ok) {
        dispatchCustomEvent('notify', {message: 'There was an error', style: 'danger'});
    }
}
