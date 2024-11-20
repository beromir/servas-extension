import { mount } from 'svelte'
import '../src/app.css'
import Popup from '../src/Popup.svelte'

const app = mount(Popup, {
  target: document.getElementById('app')!,
})

export default app
