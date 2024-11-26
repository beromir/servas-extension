export function clickOutside(node: HTMLElement, callback: () => void) {
    const handleClick = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Node;
        if (node && !node.contains(target) && target !== node) {
            callback();
        }
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('touchend', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
            document.removeEventListener('touchend', handleClick, true);
        },
        // Update callback if it changes
        update(newCallback: () => void) {
            callback = newCallback;
        }
    };
}
