<script>
    import Input from "./components/Input.svelte";
</script>

<div class="mx-auto py-12 max-w-xl">
    <header>
        <h1 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
            Servas Settings
        </h1>
    </header>

    <main>
        <Input id="host" label="Host" placeholder="Host"/>

        <Input id="token" label="API Token" placeholder="API Token"/>
    </main>
</div>
