<script lang="ts">
    import Input from "./components/Input.svelte";
    import Button from "./components/Button.svelte";
    import {onMount} from "svelte";
    import {getOptions, setOption} from "./services/option";
    import Notification from "./components/Notification.svelte";
    import {dispatchCustomEvent} from "./utils/util";

    let servasUrl: string = $state('');
    let apiToken: string = $state('');

    async function handleSaveSettingsButtonClick() {
        const servasUrlResult = await setOption('servasUrl', servasUrl);
        const apiTokenResult = await setOption('apiToken', apiToken);

        if (servasUrlResult && apiTokenResult) {
            dispatchCustomEvent('notify', {message: 'Settings saved', style: 'success'});
        } else {
            dispatchCustomEvent('notify', {message: 'There was an error', style: 'danger'});
        }
    }

    onMount(async () => {
        const syncOptionsResult = await getOptions();

        servasUrl = syncOptionsResult?.servasUrl ?? '';
        apiToken = syncOptionsResult?.apiToken ?? '';
    })
</script>

<div class="relative mx-auto py-12 max-w-xl">
    <header>
        <h1 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
            Servas Settings
        </h1>
    </header>

    <main class="mt-10 space-y-10">
        <section>
            <div class="border-b border-gray-200 pb-3">
                <h2 class="text-base font-semibold text-gray-900">General</h2>
            </div>

            <div class="mt-6 space-y-5">
                <Input bind:value={servasUrl} id="host" label="Servas URL" placeholder="https://myservas.com"/>

                <Input bind:value={apiToken} type="password" id="token" label="API Token"/>

                <Button onclick={handleSaveSettingsButtonClick} color="primary" class="mt-2">Save</Button>
            </div>
        </section>

        <section>
            <div class="border-b border-gray-200 pb-3">
                <h2 class="text-base font-semibold text-gray-900">Appearance</h2>
            </div>

            <div class="mt-6 space-y-5">

            </div>
        </section>
    </main>

    <Notification/>
</div>
