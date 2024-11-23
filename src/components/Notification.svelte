<script lang="ts">
    import clsx from "clsx";

    let show = $state(false);
    let message = $state('');
    let style = $state('info');

    function handleNotification(event: any) {
        message = event.detail.message ?? '';
        style = event.detail.style ?? 'info';

        show = true;

        setTimeout(() => {
            show = false;
        }, 2000);
    }
</script>

<svelte:window onnotify={e => handleNotification(e)}/>

{#if show}
    <div class={clsx(
        'absolute inset-x-2 bottom-2 px-2 py-1 text-sm rounded-sm shadow-sm',
        style === 'success' ? 'bg-green-50 text-green-700 outline outline-green-100' : '',
        style === 'danger' ? 'bg-red-50 text-red-700 outline outline-red-100' : '',
    )}>
        {message}
    </div>
{/if}
