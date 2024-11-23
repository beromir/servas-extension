<script lang="ts">
    import clsx from "clsx";

    let show = $state(false);
    let message = $state('');
    let style = $state('info');

    let permanent = false;

    function handleNotification(event: any) {
        message = event.detail.message ?? '';
        style = event.detail.style ?? 'info';
        permanent = event.detail.permanent ?? false;

        show = true;

        if (permanent) {
            return;
        }

        setTimeout(() => {
            show = false;
        }, 2000);
    }
</script>

<svelte:window onnotify={e => handleNotification(e)}/>

{#if show}
    <div class={clsx(
        'absolute inset-x-2 bottom-2 px-2 py-1 text-sm rounded-sm shadow-sm outline',
        style === 'info' ? 'bg-blue-50 text-blue-700 outline-blue-100 dark:bg-blue-950 dark:text-blue-200 outline-blue-900' : '',
        style === 'success' ? 'bg-green-50 text-green-700 outline-green-100 dark:bg-green-950 dark:text-green-200 outline-green-900' : '',
        style === 'warning' ? 'bg-yellow-50 text-yellow-700 outline-yellow-100 dark:bg-yellow-950 dark:text-yellow-200 outline-yellow-900' : '',
        style === 'danger' ? 'bg-red-50 text-red-700 outline-red-100 dark:bg-red-950 dark:text-red-200 outline-red-900' : '',
    )}>
        {message}
    </div>
{/if}
