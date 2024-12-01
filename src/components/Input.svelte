<script lang="ts">
    import type {HTMLInputAttributes, HTMLInputTypeAttribute} from "svelte/elements";
    import clsx from "clsx";
    import Label from "./Label.svelte";

    let {type = 'text', value = $bindable(''), id, label, ...props}: {
        type?: HTMLInputTypeAttribute,
        value: string,
        id?: string,
        label?: string,
        props?: HTMLInputAttributes
    } = $props();

    const styles: string[] = [
        'px-2 py-1 w-full min-w-none text-sm rounded focus:ring-0',
        'bg-gray-100 placeholder-gray-500 border-gray-300 focus:border-primary-300',
        'dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-primary-500'
    ]
</script>

{#if id && label}
    <Label for={id}>{label}</Label>
{/if}
<input bind:value type={type} {id} {...props} class={clsx(props.class, styles)}/>
