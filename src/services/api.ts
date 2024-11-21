export function getTags(): object[] {

    return [];
}

export function getGroups(): object[] {

    return [];
}

export async function storeLink(tab: object): void {
    let data = {link: tab.url, title: tab.title};
    let storageData = null;

    await browser.storage.sync.get({
        servasUrl: '',
        apiToken: '',
    }).then(value => {
        storageData = value;
    });

    if ((storageData.servasUrl === '') || (storageData.apiToken === '')) {
        //showResponseMessage('wrong settings');
        return;
    }

    fetch(`${storageData.servasUrl}/api/links`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storageData.apiToken}`,
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                //showResponseMessage('ok');
            } else {
                //showResponseMessage('error');
            }
        })
        .catch(error => {
            console.error(error);
        });
}
