<script lang="ts">
    import {getCurrentTab} from "./services/tab";
    import {storeLink} from "./services/api";

    async function handleClick() {
        const tab = await getCurrentTab();

        storeLink(tab);
    }
</script>

<div class="p-6">

    <button on:click={handleClick} type="button">Add</button>

</div>
