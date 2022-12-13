<script lang="ts">
    import {
        Breadcrumb,
        BreadcrumbItem,
        Button,
        ButtonSet,
        DataTableSkeleton, Search, Theme, Tile
    } from "carbon-components-svelte";
    import moment from "moment";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";
    import {browser} from '$app/env';
    import TopRightLogo from "$lib/components/TopRightLogo.svelte";


    let teams = null;
    let apiTeams = null;

    let rosters = {};

    let master = true;
    let diamond = false;
    let platinum = false;
    let gold = false;
    let silver = false;
    let bronze = false;

    let na = true;
    let eu = false;
    let oce = false;

    let search = "";

    let casted_only = false;

    master = $page.url.searchParams.get('master') != 'false';
    diamond = $page.url.searchParams.get('diamond') != 'false';
    platinum = $page.url.searchParams.get('platinum') != 'false';
    gold = $page.url.searchParams.get('gold') != 'false';
    silver = $page.url.searchParams.get('silver') != 'false';
    bronze = $page.url.searchParams.get('bronze') != 'false';
    na = $page.url.searchParams.get('na') != 'false';
    eu = $page.url.searchParams.get('eu') != 'false';
    oce = $page.url.searchParams.get('oce') != 'false';
    search = $page.url.searchParams.get('search') ? $page.url.searchParams.get('search') : "";
    casted_only = $page.url.searchParams.get('casted_only') == 'true';

    onMount(() => {
        // get from local storage if it isn't expired
        if ((new Date()).getTime() - localStorage.getItem("teams_date") < 86400000) {
            console.log("getting team list from local storage");
            apiTeams = JSON.parse(localStorage.getItem("teams"));
            filterTeams()
        } else {
            console.log("fetching team list from api");
            fetch("https://api.ignitevr.gg/vrml/get_team_list")
                .then(r => r.json())
                .then(r => {
                    apiTeams = r;
                    localStorage.setItem("teams", JSON.stringify(apiTeams));
                    localStorage.setItem("teams_date", (new Date()).getTime().toString());
                    filterTeams();
                });
        }
    });


    function filterTeams() {

        if (apiTeams === null) return;

        // teams = apiTeams.filter(row => {
        //     if (row["divisionName"].includes("Master") && master) return true;
        //     if (row["divisionName"].includes("Diamond") && diamond) return true;
        //     if (row["divisionName"].includes("Diamond") && diamond) return true;
        //     if (row["divisionName"].includes("Platinum") && platinum) return true;
        //     if (row["divisionName"].includes("Platinum") && platinum) return true;
        //     if (row["divisionName"].includes("Gold") && gold) return true;
        //     if (row["divisionName"].includes("Gold") && gold) return true;
        //     if (row["divisionName"].includes("Silver") && silver) return true;
        //     if (row["divisionName"].includes("Silver") && silver) return true;
        //     if (row["divisionName"].includes("Bronze") && bronze) return true;
        //     if (row["divisionName"].includes("Bronze") && bronze) return true;
        //     return false;
        // });

        // teams = teams.filter(row => {
        //     if (row["homeTeam"]["regionName"] == "Oceania/Asia" && oce) return true;
        //     if (row["homeTeam"]["regionName"].includes("America") && na) return true;
        //     if (row["homeTeam"]["regionName"].includes("Europe") && eu) return true;
        //     return false;
        // });

        teams = apiTeams;
        if (search != "") {
            teams = teams.filter(row =>
                search == "" ||
                row["teamName"].toLowerCase().includes(search.toLowerCase())
            );
        }
        // teams = teams.filter(row => {
        //     if (row["castersList"] === "" && casted_only) return false;
        //     return true;
        // });
        //
        // const maxUpvotes = Math.max.apply(Math, teams.map(m => m['castUpvotes']));
        // for (let m of teams) {
        //     m['upvoteColor'] = m['castUpvotes'] / maxUpvotes;
        // }
        teams = teams;

    }


    $: search, queryChanged();

    function queryChanged() {
        if (!browser) return;
        if (search === "") {
            $page.url.searchParams.delete('search');
        } else {
            $page.url.searchParams.set('search', search);
        }

        setQueryBool('master', master);
        setQueryBool('diamond', diamond);
        setQueryBool('platinum', platinum);
        setQueryBool('gold', gold);
        setQueryBool('silver', silver);
        setQueryBool('bronze', bronze);
        setQueryBool('na', na);
        setQueryBool('eu', eu);
        setQueryBool('oce', oce);
        if (casted_only) {
            $page.url.searchParams.set("casted_only", casted_only.toString());
        } else {
            $page.url.searchParams.delete("casted_only");
        }

        goto(`?${$page.url.searchParams.toString()}`, {
            replaceState: true,
            keepfocus: true,
        });

        filterTeams();
    }

    function setQueryBool(key: string, value: boolean) {
        if (!value) {
            $page.url.searchParams.set(key, value.toString());
        } else {
            $page.url.searchParams.delete(key);
        }
    }

    function fetchRoster(teamName: string) {
        fetch("https://api.ignitevr.gg/vrml/get_players_on_team/" + teamName)
            .then(r => r.json())
            .then(r => {
                if (r['players'].length > 0) {
                    if (!(r['team_name'] in rosters)) {
                        rosters[r['team_name']] = {};
                    }
                    rosters[r['team_name']]['players'] = r['players'];
                    rosters = rosters;
                }
            });
    }
</script>

<svelte:head>
	<title>Teams</title>
</svelte:head>

<div style="max-width: 100em; margin: 5em auto;">
	<Breadcrumb>
		<BreadcrumbItem href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="/teams" isCurrentPage>Teams</BreadcrumbItem>
	</Breadcrumb>
	<br>
	<Tile>
		<TopRightLogo/>
		<h2>{apiTeams != null ? apiTeams.length.toLocaleString() : ""} Teams</h2>
		<p>Search by team name</p>
		<p>Click on a row to show rosters</p>
	</Tile>
	<br>
	<!--	<Tile class="toggle-buttons">-->
	<!--		<div style="display: flex; flex-direction: row; margin: 1em;">-->
	<!--			<ButtonSet>-->
	<!--				<Button kind={master?"primary":"secondary"} on:click={()=>{master = !master; queryChanged();}}>-->
	<!--					Master-->
	<!--				</Button>-->
	<!--				<Button kind={diamond?"primary":"secondary"}-->
	<!--				        on:click={()=>{diamond = !diamond; queryChanged();}}>Diamond-->
	<!--				</Button>-->
	<!--				<Button kind={platinum?"primary":"secondary"}-->
	<!--				        on:click={()=>{platinum = !platinum; queryChanged();}}>Platinum-->
	<!--				</Button>-->
	<!--				<Button kind={gold?"primary":"secondary"} on:click={()=>{gold = !gold; queryChanged();}}>Gold-->
	<!--				</Button>-->
	<!--				<Button kind={silver?"primary":"secondary"} on:click={()=>{silver = !silver; queryChanged();}}>-->
	<!--					Silver-->
	<!--				</Button>-->
	<!--				<Button kind={bronze?"primary":"secondary"} on:click={()=>{bronze = !bronze; queryChanged();}}>-->
	<!--					Bronze-->
	<!--				</Button>-->
	<!--			</ButtonSet>-->

	<!--		</div>-->

	<!--		<div style="display: flex; flex-direction: row; margin: 1em;">-->

	<!--			<ButtonSet>-->
	<!--				<Button kind={na?"primary":"secondary"} on:click={()=>{na = !na; queryChanged();}}>NA</Button>-->
	<!--				<Button kind={eu?"primary":"secondary"} on:click={()=>{eu = !eu; queryChanged();}}>EU</Button>-->
	<!--				<Button kind={oce?"primary":"secondary"} on:click={()=>{oce = !oce; queryChanged();}}>OCE</Button>-->
	<!--			</ButtonSet>-->

	<!--		</div>-->
	<!--	</Tile>-->
	<Search bind:value={search}/>

	{#if !teams}
		<DataTableSkeleton showHeader={false} showToolbar={false}/>
	{:else}


		<div style="overflow-x:scroll;">
			<table class="bx--data-table bx--data-table--sort bx--data-table--zebra">
				<thead>
				<tr>
					<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team Name</th>
				</tr>
				</thead>
				<tbody>
				{#each teams as t}
					<tr on:click={()=>{t['rosterVisible'] = !t['rosterVisible']; fetchRoster(t['teamName']);}}>
						<td>
							<div class="teamNameRow">
								<img class="teamLogo" src="https://vrmasterleague.com{t['teamLogo']}" loading="lazy"/>
								<a href="https://vrmasterleague.com/EchoArena/Teams/{t['teamID']}"
								   target="_blank">{t['teamName']}</a>
							</div>
						</td>
					</tr>
					{#if t['teamName'] in rosters && t['rosterVisible']}
						<tr class="details-row">
							<td>
								<div class="roster-table away">
									{#each rosters[t['teamName']]['players'] as player}
										<div>
											<div><a href={player['player_page']}
											        target="_blank">{player['player_name']}</a>
											</div>
											<img src={player['player_logo']}/>
										</div>
									{/each}
								</div>
							</td>
						</tr>
						<tr style="height: .5em"></tr>
					{/if}
				{/each}
				<tr></tr>
				</tbody>
			</table>
		</div>
	{/if}
</div>

