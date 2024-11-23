<script lang="ts">
    import ArrowTopRightOnSquare from "./heroicons/micro/ArrowTopRightOnSquare.svelte";
    import CogSixTooth from "./heroicons/micro/CogSixTooth.svelte";
    import {getOptions} from "./services/option";

    const browserAPI = globalThis.chrome || globalThis.browser;

    const options = getOptions();

    function handleSettingsButtonClick() {
        if (browserAPI.runtime.openOptionsPage) {
            browserAPI.runtime.openOptionsPage();
        } else {
            window.open(browserAPI.runtime.getURL('dist/views/settings.html'));
        }
    }
</script>

<div class="p-2">
    <header class="flex items-center justify-between">
        <button on:click={handleSettingsButtonClick} type="button" title="Settings">
            <CogSixTooth className="fill-gray-500 hover:fill-gray-700"/>
        </button>

        {#await options then data}
            <a href={data.servasUrl} title="Open Servas">
                <ArrowTopRightOnSquare className="size-4.5 fill-gray-500 hover:fill-gray-700"/>
            </a>
        {/await}
    </header>
</div>
