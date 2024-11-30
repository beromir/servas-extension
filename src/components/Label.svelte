<script lang="ts">
    import type {Snippet} from "svelte";
    import type {HTMLLabelAttributes} from "svelte/elements";
    import clsx from "clsx";

    let {children, ...props}: { for: string, children: Snippet, props?: HTMLLabelAttributes } = $props();
</script>

<label {...props} class={clsx(props.class, 'block mb-0.5 text-sm text-gray-600 font-medium')}>
    {@render children?.()}
</label>
