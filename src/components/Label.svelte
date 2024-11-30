<script lang="ts">
    import type {Snippet} from "svelte";
    import type {HTMLLabelAttributes} from "svelte/elements";
    import clsx from "clsx";

    let {children, ...props}: { for: string, children: Snippet, props?: HTMLLabelAttributes } = $props();
</script>

<label {...props} class={clsx(props.class, 'block mb-1 text-sm text-gray-700 font-medium')}>
    {@render children?.()}
</label>
