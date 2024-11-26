export function dispatchCustomEvent(event: string, data?: any) {
    if (data) {
        window.dispatchEvent(new CustomEvent(event, {detail: data}));
    } else {
        window.dispatchEvent(new CustomEvent(event));
    }
}

export function toggleArrayValue<T>(array: T[], value: T): T[] {
    const index = array.indexOf(value);
    if (index === -1) {
        return [...array, value];
    }
    return [...array.slice(0, index), ...array.slice(index + 1)];
}
