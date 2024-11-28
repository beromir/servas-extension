<script lang="ts">
    import {toggleArrayValue} from "../utils/util";
    import {clickOutside} from "../actions/action";
    import ChevronUpDown from "../heroicons/micro/ChevronUpDown.svelte";
    import Check from "../heroicons/micro/Check.svelte";

    let {
        options = [],
        titleProperty = 'title',
        selectedOptions = $bindable([]),
        placeholder = 'Search...',
    }: {
        options: [],
        titleProperty?: string,
        selectedOptions: any[],
        placeholder?: string,
    } = $props();

    let showDropdown: boolean = $state(false);
    let searchString: string = $state('');
</script>

<div use:clickOutside={() => showDropdown = false} class="relative">
    <input bind:value={searchString} onfocusin={() => showDropdown = true} type="text" placeholder={placeholder}
           class="px-2 py-1 w-full min-w-none bg-gray-800 text-sm text-white placeholder-gray-400 border-gray-600 rounded focus:border-gray-500 focus:ring-0">
    <button onclick={() => showDropdown = false} type="button" aria-label="Show dropdown"
            class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            class:pointer-events-none={!showDropdown}>
        <ChevronUpDown className="fill-gray-400"/>
    </button>

    {#if showDropdown}
        <ul class="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-gray-900 dark:ring-contrast">

            {#each options as option}

                {#if option[titleProperty].toLowerCase().includes(searchString.toLowerCase())}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <li onclick={() => selectedOptions = toggleArrayValue(selectedOptions, option.id)}
                        class="relative cursor-default select-none py-1 pl-7 pr-3 text-sm text-gray-900 hover:bg-gray-100 hover:text-black hover:outline-none dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
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
                {/if}
            {/each}
        </ul>
    {/if}
</div>
