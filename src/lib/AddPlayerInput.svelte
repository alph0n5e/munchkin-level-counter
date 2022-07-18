<script lang='ts'>
  import { createEventDispatcher } from 'svelte'
  import { playerStore } from '../stores'
  import rules from '../rules'

  const dispatch = createEventDispatcher();

  let playerName = '';

  $: gameFull = $playerStore.length >= rules.munchkin.maxPlayers;
  $: canAddPlayer = !gameFull && playerName.trim();

  function addPlayer() {
    if (playerName.trim()) {
      dispatch('add', {name: playerName.trim()});
      playerName = '';
    }
  }

</script>

<form>
  <input type="text" bind:value={playerName}>
  <button on:click|preventDefault={addPlayer} disabled="{!canAddPlayer}">Add Player</button>
</form>