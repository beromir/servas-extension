<script lang="ts">
    import Input from "./components/Input.svelte";
    import Button from "./components/Button.svelte";
    import {onMount} from "svelte";
    import {getOptions, setOption} from "./services/option";
    import Notification from "./components/Notification.svelte";
    import {dispatchCustomEvent} from "./utils/util";
    import Select from "./components/Select.svelte";
    import {changeTheme, initTheme} from "./services/theme.js";

    const browserAPI = globalThis.chrome || globalThis.browser;
    const appVersion = browserAPI.runtime.getManifest().version;

    let servasUrl: string = $state('');
    let apiToken: string = $state('');
    let theme: 'system' | 'dark' | 'light' = $state('system');

    async function handleSaveSettingsButtonClick() {
        const servasUrlResult = await setOption('servasUrl', servasUrl);
        const apiTokenResult = await setOption('apiToken', apiToken);

        if (servasUrlResult && apiTokenResult) {
            dispatchCustomEvent('notify', {message: 'Settings saved', style: 'success'});
        } else {
            dispatchCustomEvent('notify', {message: 'There was an error', style: 'danger'});
        }
    }

    async function handleThemeSelect() {
        await changeTheme(theme);

        dispatchCustomEvent('notify', {message: 'Theme changed', style: 'success'});
    }

    onMount(async () => {
        const themeResult = await initTheme();
        const syncOptionsResult = await getOptions();

        theme = themeResult;
        servasUrl = syncOptionsResult?.servasUrl ?? '';
        apiToken = syncOptionsResult?.apiToken ?? '';
    })
</script>

<div class="relative mx-auto px-4 py-12 max-w-xl">
    <header>
        <h1 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
            Servas Settings
        </h1>
    </header>

    <main class="mt-10 space-y-10">
        <section>
            <div class="border-b border-gray-200 pb-3 dark:border-gray-700">
                <h2 class="text-base font-semibold text-gray-900 dark:text-white">General</h2>
            </div>

            <div class="mt-6 space-y-5">
                <Input bind:value={servasUrl} id="host" label="Servas URL" placeholder="https://myservas.com"/>

                <Input bind:value={apiToken} type="password" id="token" label="API Token"/>

                <Button onclick={handleSaveSettingsButtonClick} color="primary" class="mt-2">Save</Button>
            </div>
        </section>

        <section>
            <div class="border-b border-gray-200 pb-3 dark:border-gray-700">
                <h2 class="text-base font-semibold text-gray-900 dark:text-white">Appearance</h2>
            </div>

            <div class="mt-6 space-y-5">
                <Select bind:value={theme} onchange={handleThemeSelect} id="theme" label="Theme">
                    <option value="system">System Theme</option>
                    <option value="dark">Dark Theme</option>
                    <option value="light">Light Theme</option>
                </Select>
            </div>
        </section>
    </main>

    <footer class="mt-40 py-3 text-sm text-gray-700 border-t border-gray-300 dark:text-gray-300 dark:border-gray-600">
        <a href={'https://github.com/beromir/servas-extension/releases/tag/v' + appVersion} target="_blank"
           class="hover:text-gray-800 dark:hover:text-gray-200">
            v{appVersion}
        </a>
    </footer>

    <Notification/>
</div>
