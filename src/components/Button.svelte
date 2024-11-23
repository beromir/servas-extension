<script lang="ts">
    import type {Snippet} from "svelte";
    import clsx from "clsx";
    import type {HTMLButtonAttributes} from "svelte/elements";

    let {color = 'white', children, ...restProps}: {
        color?: 'white' | 'primary',
        children: Snippet,
        restProps?: HTMLButtonAttributes
    } = $props();
</script>

<button {...restProps} type="button"
        class={clsx(
            'inline-flex items-center gap-x-2 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'disabled:opacity-70 disabled:pointer-events-none',
            '*:[svg]:-mx-0.5 *:[svg]:size-5',
            color === 'white' ? 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-500' : '',
            color === 'primary' ? 'bg-primary-500 text-white hover:bg-primary-400 focus-visible:outline-primary-500' : '',
            restProps.class,
         )}>

    {@render children?.()}
</button>
