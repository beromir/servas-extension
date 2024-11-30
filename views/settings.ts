import { mount } from 'svelte'
import '../src/app.css'
import Settings from '../src/Settings.svelte'

const app = mount(Settings, {
    target: document.getElementById('app')!,
})

export default app
