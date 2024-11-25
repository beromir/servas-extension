<script lang="ts">
    let {options = [], titleProperty = 'title'}: { options: [], titleProperty?: string } = $props();

    let showDropdown: boolean = $state(false);
</script>

<div class="relative">
    <input id="combobox" type="text"
           class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
           role="combobox" aria-controls="options" aria-expanded="false">
    <button onclick={() => showDropdown = !showDropdown} type="button" aria-label="Show dropdown"
            class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
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
            <!--
              Combobox option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

              Active: "text-white bg-indigo-600 outline-none", Not Active: "text-gray-900"
            -->

            {#each options as option}
                <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="option-0" role="option"
                    tabindex="-1">
                    <!-- Selected: "font-semibold" -->
                    <span class="block truncate">{option[titleProperty]}</span>

                    <!--
                      Checkmark, only display for selected option.

                      Active: "text-white", Not Active: "text-indigo-600"
                    -->
                    <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd"
                              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                              clip-rule="evenodd"/>
                    </svg>
                </span>
                </li>
            {/each}
        </ul>
    {/if}
</div>
