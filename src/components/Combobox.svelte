<script lang="ts">
    import {toggleArrayValue} from "../utils/util";
    import {clickOutside} from "../actions/action";
    import ChevronUpDown from "../heroicons/micro/ChevronUpDown.svelte";
    import Check from "../heroicons/micro/Check.svelte";
    import Input from "./Input.svelte";
    import Label from "./Label.svelte";
    import XMark from "../heroicons/micro/XMark.svelte";
    import clsx from "clsx";

    let {
        options = [],
        titleProperty = 'title',
        selectedOptions = $bindable([]),
        placeholder = 'Search...',
        id,
        label,
        dropdownTop = false,
    }: {
        options: [],
        titleProperty?: string,
        selectedOptions: any[],
        placeholder?: string,
        id?: string,
        label?: string,
        dropdownTop?: boolean,
    } = $props();

    let showDropdown: boolean = $state(false);
    let searchString: string = $state('');
    let filteredOptions: any[] = $derived(options.filter(option => option[titleProperty].toLowerCase().includes(searchString.toLowerCase())));
</script>

<div>
    {#if id && label}
        <Label for={id}>{label}</Label>
    {/if}

    {#if selectedOptions.length}
        <div class="mt-0.5 mb-0">
            {#each selectedOptions as optionId}
                <button onclick={() => selectedOptions = toggleArrayValue(selectedOptions, optionId)} type="button"
                        class="inline-flex items-center gap-x-0.5 mr-1.5 text-xs text-gray-700 font-semibold group dark:text-gray-100">
                    <XMark className="size-3.5! fill-gray-500 group-hover:fill-gray-700"/>
                    {options.find(option => option.id === optionId)[titleProperty]}
                </button>
            {/each}
        </div>
    {/if}

    <div use:clickOutside={() => showDropdown = false} class="relative">
        <Input bind:value={searchString} onfocusin={() => showDropdown = true} {id} placeholder={placeholder}/>
        <button onclick={() => showDropdown = false} type="button" aria-label="Show dropdown"
                class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                class:pointer-events-none={!showDropdown}>
            <ChevronUpDown className="fill-gray-700 dark:fill-gray-300"/>
        </button>

        {#if showDropdown}
            <ul class={clsx(
                    'absolute z-10 mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none',
                    'dark:bg-gray-950 dark:ring-contrast',
                    dropdownTop ? 'bottom-9' : '',
                )}>

                {#each filteredOptions as option}
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_click_events_have_key_events -->
                    <li onclick={() => selectedOptions = toggleArrayValue(selectedOptions, option.id)}
                        class="relative cursor-default select-none py-1 pl-7 pr-3 text-sm text-gray-900 hover:bg-gray-100 hover:text-black hover:outline-none dark:text-gray-100 dark:hover:bg-gray-900 dark:hover:text-white"
                        tabindex="-1">
                    <span class="block truncate"
                          class:font-semibold={selectedOptions.includes(option.id)}>
                        {option[titleProperty]}
                    </span>

                        {#if selectedOptions.includes(option.id)}
                        <span
                            class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-gray-700 dark:text-gray-200">
                            <Check/>
                        </span>
                        {/if}
                    </li>

                {:else}
                    <li class="py-2 text-sm text-gray-600 text-center dark:text-gray-300">Nothing found</li>
                {/each}
            </ul>
        {/if}
    </div>
</div>
