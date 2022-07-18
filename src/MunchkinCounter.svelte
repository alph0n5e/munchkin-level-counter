<script lang='ts'>
  import rules from './rules'
  import { playerStore } from './stores'
  import type { Player } from './types'
  import PlayerScore from './lib/PlayerScore.svelte'
  import AddPlayerInput from './lib/AddPlayerInput.svelte'

  function addPlayer(detail) {
    playerStore.set([
      ...$playerStore,
      {
        level: rules.munchkin.minLevel,
        ...detail
      }
    ])
  }

  function updatePlayer(player: Player, detail) {
    $playerStore = $playerStore.map(p => {
      if (p === player) {
        return {...player, ...detail}
      }
      return p
    })
  }

  function removePlayer(player: Player) {
    $playerStore = $playerStore.filter(p => p !== player)
  }

</script>

<nav>
  <h1>Munchkin - Scores</h1>
</nav>

<main>
  <p>Add 3 to 6 players, and start looting!</p>
  {#each $playerStore as player}
  <PlayerScore player="{player}"
    on:change={(e) => updatePlayer(player, e.detail)}
     on:delete={() => removePlayer(player)}
  />
  {/each}
  {#if $playerStore.length < rules.munchkin.maxPlayers}
  <AddPlayerInput on:add={(e) => addPlayer(e.detail)}/>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>