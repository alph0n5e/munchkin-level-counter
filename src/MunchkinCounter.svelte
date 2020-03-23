<script>
	import { rules } from './rules'
	import { state } from './stores'
	import PlayerScore from './components/PlayerScore.svelte'
	import AddPlayerInput from "./components/AddPlayerInput.svelte";

	function addPlayer(detail) {
		$state.players = [
			...$state.players,
			{
				level: rules.munchkin.minLevel,
				...detail
			}
		]
	}

	function updatePlayer(player, detail) {
		$state.players = $state.players.map(p => {
			if (p === player) {
				return {...player, ...detail}
			}
			return p
		})
	}

	function removePlayer(player) {
		$state.players = $state.players.filter(p => p !== player)
	}

</script>

<main>
	<h1>Munchkin Counter</h1>
	<p>Add 3 to 6 players, and start looting!</p>
	{#each $state.players as player}
	<PlayerScore player="{player}"
		on:change={(e) => updatePlayer(player, e.detail)}
	 	on:delete={(e) => removePlayer(player)}
	/>
	{/each}
	{#if $state.players.length < rules.munchkin.maxPlayers}
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