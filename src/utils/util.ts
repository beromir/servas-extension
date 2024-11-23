export function dispatchCustomEvent(event: string, data?: any) {
    if (data) {
        window.dispatchEvent(new CustomEvent(event, {detail: data}));
    } else {
        window.dispatchEvent(new CustomEvent(event));
    }
}
