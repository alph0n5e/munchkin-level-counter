import './app.css'
import MunchkinCounter from './MunchkinCounter.svelte'

const app = new MunchkinCounter({
  target: document.getElementById('app')
})

export default app
