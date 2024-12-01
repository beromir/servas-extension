<script lang="ts">
    import clsx from "clsx";
    import type {HTMLInputAttributes} from "svelte/elements";
    import Label from "./Label.svelte";
    import type {Snippet} from "svelte";

    let {value = $bindable(''), children, id, label, ...props}: {
        value: string,
        children: Snippet,
        id?: string,
        label?: string,
        props?: HTMLInputAttributes
    } = $props();

    const styles: string[] = [
        'px-2 py-1 pr-10 text-sm rounded focus:ring-0',
        'bg-white border-gray-300 focus:border-primary-300',
        'dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-primary-500'
    ]
</script>

{#if id && label}
    <Label for={id}>{label}</Label>
{/if}
<select bind:value {id} {...props} class={clsx(styles, props.class)}>
    {@render children?.()}
</select>
