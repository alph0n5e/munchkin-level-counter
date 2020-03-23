<script>
  import { createEventDispatcher } from 'svelte';
  import { rules } from '../rules';

  export let player;

  const dispatch = createEventDispatcher();

  $: canDecreaseLevel = player.level > rules.munchkin.minLevel;
  $: canIncreaseLevel = player.level < rules.munchkin.maxLevel;

  $: if (player.level === rules.munchkin.maxLevel) {
    alert(`${player.name} reached level ${rules.munchkin.maxLevel} and wins the game!`);
  }

  function decreaseLevel() {
    if (canDecreaseLevel) {
      dispatch('change', {level: player.level - 1})
    }
  }

  function increaseLevel() {
    if (canIncreaseLevel) {
      dispatch('change', {level: player.level + 1})
    }
  }

  function removePlayer() {
    dispatch('delete', player)
  }

</script>

<div>
  <button on:click={removePlayer}>x</button>
  Name: {player.name}, Level: {player.level}
  <button disabled="{!canDecreaseLevel}" on:click={decreaseLevel}>-</button>
  <button disabled="{!canIncreaseLevel}" on:click={increaseLevel}>+</button>
</div>