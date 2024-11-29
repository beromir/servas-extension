<script lang="ts">
    import type {HTMLInputAttributes, HTMLInputTypeAttribute} from "svelte/elements";
    import clsx from "clsx";

    let {type = 'text', value = $bindable(''), ...props}: {
        type: HTMLInputTypeAttribute,
        value: string,
        props?: HTMLInputAttributes
    } = $props();
</script>

<input bind:value type={type} {...props}
       class={clsx('px-2 py-1 w-full min-w-none bg-gray-800 text-sm text-white placeholder-gray-400 border-gray-600 rounded focus:border-gray-500 focus:ring-0', props.class)}/>
