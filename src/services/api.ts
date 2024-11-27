import {dispatchCustomEvent} from "../utils/util";

const browserAPI = globalThis.chrome || globalThis.browser;

export async function getData(path: string): Promise<void> {
    const storageData = await browserAPI.storage.sync.get({
        servasUrl: '',
        apiToken: '',
    });

    if ((storageData.servasUrl === '') || (storageData.apiToken === '')) {
        return;
    }

    const response: Response | void = await fetch(`${storageData.servasUrl}/api/${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storageData.apiToken}`,
        },
    }).catch(error => {
        console.error(error);

        return;
    });

    if (response instanceof Response && response.ok) {
        return response.json();
    }
}

export async function storeLink(tab: object, title: string = '', groups: number[] = [], tags: number[] = []): Promise<void> {
    let data: { link: string; title: string, groups: number[], tags: number[] } = {
        link: tab.url,
        title: title ? title : tab.title,
        groups,
        tags
    };

    const storageData = await browserAPI.storage.sync.get({
        servasUrl: '',
        apiToken: '',
    });

    if ((storageData.servasUrl === '') || (storageData.apiToken === '')) {
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

        dispatchCustomEvent('notify', {message: 'There was an error', style: 'danger'});

        return;
    });

    if (response instanceof Response) {
        switch (response.status) {
            case 200:
                dispatchCustomEvent('notify', {message: 'Page added', style: 'success'});
                break;
            case 422:
                dispatchCustomEvent('notify', {message: 'The page was already added', style: 'info'});
                break;
            default:
                dispatchCustomEvent('notify', {message: 'There was an error', style: 'danger'});
        }
    }
}
