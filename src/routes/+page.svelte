<script lang="ts">
    import {
        Button,
        ButtonSet, ClickableTile,
        DataTableSkeleton, Search, Theme, Tile
    } from "carbon-components-svelte";
    import moment from "moment";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";
    import {browser} from '$app/env';
    import vrml_logo_blue from '$lib/assets/vrml_logo_blue.png';
    import TopRightLogo from "$lib/components/TopRightLogo.svelte";


</script>

<svelte:head>
	<title>VRML Community Website</title>
</svelte:head>

<div style="max-width: 100em; margin: 5em auto;">
	<Tile>
		<TopRightLogo/>
		<h2>VRML Community Website</h2>
		<p>All data retrieved using the VRML API.</p>
		<p>The goal of this website is to provide rapid search functionality for teams, players, and matches.</p>
	</Tile>

	<br>

	<ClickableTile light href="/players">
		<div class="horizontal">
			<h3>Players</h3>
			<p>Instant search of all active and inactive VRML players and teams.</p>
		</div>
	</ClickableTile>

	<br>

	<ClickableTile light href="/teams">
		<div class="horizontal">
			<h3>Teams</h3>
			<p>Instant search of active teams with rosters.</p>
		</div>
	</ClickableTile>

	<br>

	<ClickableTile light href="/matches">
		<div class="horizontal">
			<h3>Matches</h3>
			<p>Instant search of all upcoming matches, with bookmarkable search parameters for division or casting
				status.</p>
		</div>
	</ClickableTile>

</div>

