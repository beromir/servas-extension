<script lang="ts">
    import ArrowTopRightOnSquare from "./heroicons/micro/ArrowTopRightOnSquare.svelte";
    import CogSixTooth from "./heroicons/micro/CogSixTooth.svelte";
    import {getOptions} from "./services/option";
    import Button from "./components/Button.svelte";
    import Plus from "./heroicons/mini/Plus.svelte";
    import {getCurrentTab} from "./services/tab";
    import {storeLink} from "./services/api";
    import Notification from "./components/Notification.svelte";

    const browserAPI = globalThis.chrome || globalThis.browser;

    const options = getOptions();

    function handleSettingsButtonClick() {
        if (browserAPI.runtime.openOptionsPage) {
            browserAPI.runtime.openOptionsPage();
        } else {
            window.open(browserAPI.runtime.getURL('dist/views/settings.html'));
        }
    }

    async function handleAddPageButtonClick() {
        const tab = await getCurrentTab();

        await storeLink(tab);
    }
</script>

<div class="flex flex-col p-2 h-screen">
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

    <main class="flex flex-col justify-between grow">
        <div>

        </div>

        <Button onclick={handleAddPageButtonClick} color="primary" class="flex! mx-auto">
            <Plus/>
            Add page
        </Button>
    </main>

    <Notification/>
</div>
