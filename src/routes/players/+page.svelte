<script lang="ts">
    import {
        Breadcrumb,
        BreadcrumbItem,
        Button,
        ButtonSet, DataTable,
        DataTableSkeleton, Pagination, Search, Theme, Tile, Toolbar, ToolbarContent, ToolbarSearch
    } from "carbon-components-svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";
    import {browser} from '$app/env';
    import TopRightLogo from "$lib/components/TopRightLogo.svelte";


    let players = null;
    let apiPlayers = null;

    let pageSize = 20;
    let currentPage = 1;
    let filteredRowIds = [];


    let search = "";
    search = $page.url.searchParams.get('search') ? $page.url.searchParams.get('search') : "";

    onMount(() => {
        // get from local storage if it isn't expired
        if ((new Date()).getTime() - localStorage.getItem("players_date") < 86400000) {
            console.log("getting player list from local storage");
            apiPlayers = JSON.parse(localStorage.getItem("players"));
            players = apiPlayers;
        } else {
            console.log("fetching player list from api");
            fetch("https://api.ignitevr.gg/vrml/get_player_list")
                .then(r => r.json())
                .then(r => {
                    apiPlayers = r;
                    for (let i = 0; i < apiPlayers.length; i++) {
                        apiPlayers[i]['id'] = i;
                    }
                    localStorage.setItem("players", JSON.stringify(apiPlayers));
                    localStorage.setItem("players_date", (new Date()).getTime().toString());
                    players = apiPlayers;
                });
        }
    });

    $: search, queryChanged();

    function queryChanged() {
        if (!browser) return;
        if (search === "") {
            $page.url.searchParams.delete('search');
        } else {
            $page.url.searchParams.set('search', search);
        }


        goto(`?${$page.url.searchParams.toString()}`, {
            replaceState: true,
            keepfocus: true,
        });
    }
</script>

<svelte:head>
	<title>Players</title>
</svelte:head>

<style>
    .expanded a {
        color: white;
        text-decoration: none;
    }
</style>

<div style="max-width: 100em; margin: 5em auto;">

	<Breadcrumb>
		<BreadcrumbItem href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="/players" isCurrentPage>Players</BreadcrumbItem>
	</Breadcrumb>
	<br>
	<Tile>
		<TopRightLogo/>
		<h2>{apiPlayers != null ? apiPlayers.length.toLocaleString() : ""} Players</h2>
		<p>Search by player or team name.</p>
		<p>This shows active and inactive players.</p>
	</Tile>
	<br>

	<!--	<Search bind:value={search}/>-->

	{#if !players}
		<DataTableSkeleton showHeader={false} showToolbar={true}/>
	{:else}


		<DataTable
				headers={[
				    { key: "playerName", value: "Player Name" },
				    { key: "teamName", value: "Team Name" },
				  ]}
				size="short"
				rows={players}
				{pageSize}
				page={currentPage}
				expandable
				batchExpansion
		>
			<Toolbar>
				<ToolbarContent>
					<ToolbarSearch
							persistent
							bind:value={search}
							shouldFilterRows={(row, value) => {
                                return (
                                    row['playerName'].toLowerCase().includes(value.toLowerCase()) ||
                                    row['teamName'].toLowerCase().includes(value.toLowerCase())
                                );
                            }}
							bind:filteredRowIds
					/>
				</ToolbarContent>
			</Toolbar>

			<svelte:fragment slot="expanded-row" let:row>
				<div class="expanded">
					<img class="teamLogo" src="https://vrmasterleague.com{row['userLogo']}" loading="lazy"/>
					<a href="https://vrmasterleague.com/EchoArena/Players/{row['playerID']}" target="_blank">
						<Button kind="secondary">{row['playerName']}</Button>
					</a>

					<img class="teamLogo" src="https://vrmasterleague.com{row['teamLogo']}" loading="lazy"/>
					<a href="https://vrmasterleague.com/EchoArena/Teams/{row['teamID']}" target="_blank">
						<Button kind="secondary">{row['teamName']}</Button>
					</a>
				</div>
			</svelte:fragment>
		</DataTable>

		<Pagination
				bind:pageSize
				bind:page={currentPage}
				totalItems={filteredRowIds.length}
				pageSizeInputDisabled
		/>
	{/if}
</div>

