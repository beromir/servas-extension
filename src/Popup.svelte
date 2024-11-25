<script lang="ts">
    import ArrowTopRightOnSquare from "./heroicons/micro/ArrowTopRightOnSquare.svelte";
    import CogSixTooth from "./heroicons/micro/CogSixTooth.svelte";
    import {getOptions} from "./services/option";
    import Button from "./components/Button.svelte";
    import Plus from "./heroicons/mini/Plus.svelte";
    import {getCurrentTab} from "./services/tab";
    import {getData, storeLink} from "./services/api";
    import Notification from "./components/Notification.svelte";
    import {onMount} from "svelte";
    import {dispatchCustomEvent} from "./utils/util";
    import Combobox from "./components/Combobox.svelte";

    const browserAPI = globalThis.chrome || globalThis.browser;

    let title: string = $state('');
    let options: any = $state();
    let tags: any = $state([]);
    let groups: any = $state([]);

    function handleSettingsButtonClick() {
        if (browserAPI.runtime.openOptionsPage) {
            browserAPI.runtime.openOptionsPage();
        } else {
            window.open(browserAPI.runtime.getURL('dist/views/settings.html'));
        }
    }

    async function handleAddPageButtonClick() {
        const tab = await getCurrentTab();

        await storeLink(tab, title);
    }

    onMount(async () => {
        const result = await getOptions();

        options = result;

        if (!result.servasUrl || !result.apiToken) {
            dispatchCustomEvent('notify', {message: 'Missing settings', style: 'warning', permanent: true});
        }

        tags = await getData('all-tags');
        groups = await getData('all-groups');
    })
</script>

<div class="flex flex-col p-2 h-screen">
    <header class="flex items-center justify-between">
        <button onclick={handleSettingsButtonClick} type="button" title="Settings">
            <CogSixTooth className="fill-gray-500 hover:fill-gray-700 dark:fill-gray-400"/>
        </button>

        {#if options?.servasUrl}
            <a href={options.servasUrl} title="Open Servas">
                <ArrowTopRightOnSquare className="size-4.5 fill-gray-500 hover:fill-gray-700 dark:fill-gray-400"/>
            </a>
        {/if}
    </header>

    <main class="flex flex-col justify-between grow mt-4">
        <div class="space-y-3">
            <input bind:value={title} type="text" placeholder="Title"
                   class="px-2 py-1 w-full min-w-none bg-gray-800 text-sm text-white placeholder-gray-400 border-gray-600 rounded"/>

            <Combobox options={tags} titleProperty="name"/>

            <Combobox options={groups}/>
        </div>

        <Button onclick={handleAddPageButtonClick} color="primary" disabled={!options?.servasUrl || !options?.apiToken}
                class="flex! mx-auto">
            <Plus/>
            Add page
        </Button>
    </main>

    <Notification/>
</div>
