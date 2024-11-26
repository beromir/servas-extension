<script lang="ts">
    import {toggleArrayValue} from "../utils/util";
    import {clickOutside} from "../actions/action";

    let {
        options = [],
        titleProperty = 'title',
        selectedOptions = $bindable([]),
    }: {
        options: [],
        titleProperty?: string,
        selectedOptions: any[],
    } = $props();

    let showDropdown: boolean = $state(false);
    let searchString: string = $state('');

    let input: HTMLInputElement;
</script>

<div use:clickOutside={() => showDropdown = false} class="relative">
    <input bind:this={input} bind:value={searchString} onfocusin={() => showDropdown = true} type="text"
           class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
           role="combobox" aria-controls="options" aria-expanded="false">
    <button onclick={() => showDropdown = false} type="button" aria-label="Show dropdown"
            class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            class:pointer-events-none={!showDropdown}>
        <svg class="size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
             data-slot="icon">
            <path fill-rule="evenodd"
                  d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                  clip-rule="evenodd"/>
        </svg>
    </button>

    {#if showDropdown}
        <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            id="options" role="listbox">

            {#each options as option}

                {#if option[titleProperty].toLowerCase().includes(searchString.toLowerCase())}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <li onclick={() => selectedOptions = toggleArrayValue(selectedOptions, option.id)}
                        class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 group hover:text-white hover:bg-indigo-600 hover:outline-none"
                        id="option-0" role="option"
                        tabindex="-1">
                        <span class="block truncate"
                              class:font-semibold={selectedOptions.includes(option.id)}>
                            {option[titleProperty]}
                        </span>

                        {#if selectedOptions.includes(option.id)}
                            <span
                                class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white">
                                <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                     data-slot="icon">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </span>
                        {/if}
                    </li>
                {/if}
            {/each}
        </ul>
    {/if}
</div>
