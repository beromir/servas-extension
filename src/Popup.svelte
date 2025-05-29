<script lang="ts">
    import ArrowTopRightOnSquare from "./icons/micro/ArrowTopRightOnSquare.svelte";
    import CogSixTooth from "./icons/micro/CogSixTooth.svelte";
    import {getOptions, setOption} from "./services/option";
    import Button from "./components/Button.svelte";
    import Plus from "./icons/mini/Plus.svelte";
    import {getCurrentTab} from "./services/tab";
    import {getData, storeLink} from "./services/api";
    import Notification from "./components/Notification.svelte";
    import {onMount} from "svelte";
    import {dispatchCustomEvent} from "./utils/util";
    import Combobox from "./components/Combobox.svelte";
    import Input from "./components/Input.svelte";
    import {initTheme} from "./services/theme";
    import Expand from "./icons/micro/Expand.svelte";
    import Shrink from "./icons/micro/Shrink.svelte";

    const browserAPI = globalThis.chrome || globalThis.browser;

    let title: string = $state('');
    let options: any = $state();
    let tags: any = $state([]);
    let groups: any = $state([]);
    let selectedTags: any = $state([]);
    let selectedGroups: any = $state([]);
    let showOptions: boolean = $state(false);
    let tab: any;

    function handleSettingsButtonClick() {
        if (browserAPI.runtime.openOptionsPage) {
            browserAPI.runtime.openOptionsPage();
        } else {
            window.open(browserAPI.runtime.getURL('dist/views/settings.html'));
        }
    }

    async function handleAddPageButtonClick() {
        await storeLink(tab, title, selectedGroups, selectedTags);
    }

    async function handleToggleOptionsButtonClick() {
        showOptions = !showOptions
        await setOption('showOptions', showOptions, 'local');

        resizePopup();
    }

    function resizePopup() {
        document.body.classList.toggle('w-72!', showOptions);
        document.body.classList.toggle('h-108!', showOptions);
    }

    onMount(async () => {
        await initTheme();

        const result = await getOptions();
        const tabResult = await getCurrentTab();
        const localOptionsResult = await getOptions('local');

        options = result;
        tab = tabResult;
        title = tab.title;
        showOptions = localOptionsResult.showOptions ?? false;
        localOptionsResult && resizePopup();

        if (!result.servasUrl || !result.apiToken) {
            dispatchCustomEvent('notify', {message: 'Missing settings', style: 'warning', permanent: true});
        }

        tags = await getData('all-tags');
        groups = await getData('all-groups');
    })
</script>

<div class="flex flex-col p-3 h-screen">
    <header class="flex items-center justify-between">
        <div class="flex items-center gap-x-2.5">
            <button onclick={handleSettingsButtonClick} type="button" title="Settings">
                <CogSixTooth className="fill-gray-500 hover:fill-gray-700 dark:fill-gray-400 dark:hover:fill-gray-200"/>
            </button>

            <button onclick={handleToggleOptionsButtonClick} type="button"
                    title={showOptions ? 'Hide options' : 'Show options'}
                    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                {#if showOptions}
                    <Shrink/>

                {:else}
                    <Expand/>
                {/if}
            </button>
        </div>

        {#if options?.servasUrl}
            <a href={options.servasUrl} title="Open Servas" target="_blank">
                <ArrowTopRightOnSquare
                    className="size-4.5 fill-gray-500 hover:fill-gray-700 dark:fill-gray-400 dark:hover:fill-gray-200"/>
            </a>
        {/if}
    </header>

    <main class="flex flex-col justify-between grow mt-5">
        {#if showOptions}
            <div class="space-y-4">
                <Input bind:value={title} id="title" label="Title" placeholder="Title"/>

                <Combobox bind:selectedOptions={selectedTags} options={tags} titleProperty="name" id="tags" label="Tags"
                          placeholder="Search tags..."/>

                <Combobox bind:selectedOptions={selectedGroups} options={groups} id="groups" label="Groups"
                          placeholder="Search groups..." dropdownTop={true}/>
            </div>

        {:else}
            <div></div>
        {/if}

        <div class="flex flex-col items-center gap-y-5">
            <Button onclick={handleAddPageButtonClick} color="primary"
                    disabled={!options?.servasUrl || !options?.apiToken}
                    class="">
                <Plus/>
                Add page
            </Button>
        </div>
    </main>

    <Notification/>
</div>
