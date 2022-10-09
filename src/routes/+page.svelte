<script lang="ts">
    import {
        Button,
        ButtonSet,
        DataTableSkeleton, Search, Theme, Tile
    } from "carbon-components-svelte";
    import "carbon-components-svelte/css/all.css";
    import moment from "moment";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";
    import {browser} from '$app/env';
    import vrml_logo_blue from '$lib/assets/vrml_logo_blue.png';


    let matches = null;
    let apiMatches = null;

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

        // load cookies
        // master = getCookie("master", "true") == "true";
        // diamond = getCookie("diamond") == "true";
        // platinum = getCookie("platinum") == "true";
        // gold = getCookie("gold") == "true";
        // silver = getCookie("silver") == "true";
        // bronze = getCookie("bronze") == "true";
        //
        // na = getCookie("na", "true") == "true";
        // eu = getCookie("eu") == "true";
        // oce = getCookie("oce") == "true";
        //
        // search = getCookie("search");


        fetch("https://api.ignitevr.gg/vrml/api/EchoArena/Matches/Upcoming?cache_time=60")
            .then(r => r.json())
            .then(r => {
                let counter = 0;
                for (let match of r) {
                    match["id"] = counter;
                    if (match["castingInfo"]["caster"] == null) match["castersList"] = "";
                    else {
                        let ret = match["castingInfo"]["caster"];
                        if (match["castingInfo"]["coCaster"]) ret += ", " + match["castingInfo"]["coCaster"];
                        if (match["castingInfo"]["postGameInterview"]) ret += ", " + match["castingInfo"]["postGameInterview"];
                        if (match["castingInfo"]["cameraman"]) ret += ", " + match["castingInfo"]["cameraman"];
                        match["castersList"] = ret;
                    }
                    counter++;
                }
                apiMatches = r;
                filterMatches();
            })
    });


    function filterMatches() {

        if (apiMatches === null) return;

        matches = apiMatches.filter(row => {
            if (row["homeTeam"]["divisionName"].includes("Master") && master) return true;
            if (row["homeTeam"]["divisionName"].includes("Diamond") && diamond) return true;
            if (row["awayTeam"]["divisionName"].includes("Diamond") && diamond) return true;
            if (row["homeTeam"]["divisionName"].includes("Platinum") && platinum) return true;
            if (row["awayTeam"]["divisionName"].includes("Platinum") && platinum) return true;
            if (row["homeTeam"]["divisionName"].includes("Gold") && gold) return true;
            if (row["awayTeam"]["divisionName"].includes("Gold") && gold) return true;
            if (row["homeTeam"]["divisionName"].includes("Silver") && silver) return true;
            if (row["awayTeam"]["divisionName"].includes("Silver") && silver) return true;
            if (row["homeTeam"]["divisionName"].includes("Bronze") && bronze) return true;
            if (row["awayTeam"]["divisionName"].includes("Bronze") && bronze) return true;
            return false;
        });

        matches = matches.filter(row => {
            if (row["homeTeam"]["regionName"] == "Oceania/Asia" && oce) return true;
            if (row["homeTeam"]["regionName"].includes("America") && na) return true;
            if (row["homeTeam"]["regionName"].includes("Europe") && eu) return true;
            return false;
        });

        if (search != "") {
            matches = matches.filter(row =>
                search == "" ||
                row["homeTeam"]["teamName"].toLowerCase().includes(search.toLowerCase()) ||
                row["awayTeam"]["teamName"].toLowerCase().includes(search.toLowerCase())
            );
        }
        matches = matches.filter(row => {
            if (row["castersList"] === "" && casted_only) return false;
            return true;
        });

        const maxUpvotes = Math.max.apply(Math, matches.map(m => m['castUpvotes']));
        for (let m of matches) {
            m['upvoteColor'] = m['castUpvotes'] / maxUpvotes;
        }
        matches = matches;

        // set cookies
        // setCookie("master", master.toString());
        // setCookie("diamond", diamond.toString());
        // setCookie("platinum", platinum.toString());
        // setCookie("gold", gold.toString());
        // setCookie("silver", silver.toString());
        // setCookie("bronze", bronze.toString());
        // setCookie("na", na.toString());
        // setCookie("eu", eu.toString());
        // setCookie("oce", oce.toString());
        //
        // setCookie("search", search);
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

        filterMatches();
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

    function fetchRosters(match) {
        match['rostersVisible'] = !match['rostersVisible'];
        matches = matches;

        if (match['rostersVisible']) {
            fetchRoster(match['homeTeam']['teamName']);
            fetchRoster(match['awayTeam']['teamName']);
        }
    }
</script>

<svelte:head>
	<title>Upcoming Matches</title>
</svelte:head>

<div style="max-width: 100em; margin: 5em auto;">
	<Tile>
		<div style="float: right; display: flex;flex-direction: column;align-items: end;">
			<img style="height: 4em;" src={vrml_logo_blue}/>
			<p style="margin: .5em; font-size: .9em; color: #aaa;">
				This is a community website not affiliated with VRML
			</p>
		</div>
		<h2>Upcoming Matches</h2>
		<p>Search by team name or filter by division.</p>
		<p>Click on a row to show rosters.</p>
	</Tile>
	<br>
	<Tile class="toggle-buttons">
		<div style="display: flex; flex-direction: row; margin: 1em;">
			<ButtonSet>
				<Button kind={master?"primary":"secondary"} on:click={()=>{master = !master; queryChanged();}}>
					Master
				</Button>
				<Button kind={diamond?"primary":"secondary"}
						on:click={()=>{diamond = !diamond; queryChanged();}}>Diamond
				</Button>
				<Button kind={platinum?"primary":"secondary"}
						on:click={()=>{platinum = !platinum; queryChanged();}}>Platinum
				</Button>
				<Button kind={gold?"primary":"secondary"} on:click={()=>{gold = !gold; queryChanged();}}>Gold
				</Button>
				<Button kind={silver?"primary":"secondary"} on:click={()=>{silver = !silver; queryChanged();}}>
					Silver
				</Button>
				<Button kind={bronze?"primary":"secondary"} on:click={()=>{bronze = !bronze; queryChanged();}}>
					Bronze
				</Button>
			</ButtonSet>

		</div>

		<div style="display: flex; flex-direction: row; margin: 1em;">

			<ButtonSet>
				<Button kind={na?"primary":"secondary"} on:click={()=>{na = !na; queryChanged();}}>NA</Button>
				<Button kind={eu?"primary":"secondary"} on:click={()=>{eu = !eu; queryChanged();}}>EU</Button>
				<Button kind={oce?"primary":"secondary"} on:click={()=>{oce = !oce; queryChanged();}}>OCE</Button>
			</ButtonSet>

		</div>
		<div style="display: flex; flex-direction: row; margin: 1em;">

			<ButtonSet>
				<Button kind={casted_only?"primary":"secondary"}
						on:click={()=>{casted_only = !casted_only; queryChanged();}}>
					Casted
				</Button>
			</ButtonSet>

		</div>
	</Tile>
	<Search bind:value={search}/>

	{#if !matches}
		<DataTableSkeleton showHeader={false} showToolbar={false}/>
	{:else}


		<div style="overflow-x:scroll;">
			<table class="bx--data-table bx--data-table--sort bx--data-table--zebra">
				<thead>
				<tr>
					<th>Time</th>
					<th style="max-width: 3em;padding: 0;">Cast Votes</th>
					<th style="text-align: center">Home Team</th>
					<th>Bets</th>
					<th style="text-align: center">Away Team</th>
					<th>Division</th>
					<th>Casters</th>
					<th>Twitch</th>
				</tr>
				</thead>
				<tbody>
				{#each matches as m}
					<tr on:click={()=>{fetchRosters(m);}}>
						<td class="time-col">
							<a href="https://vrmasterleague.com/EchoArena/Match/{m['matchID']}" target="_blank">
								{`${moment(new Date(m['dateScheduledUTC'] + "Z")).format('ddd h:mm A')}  (${moment(new Date(m['dateScheduledUTC'] + "Z")).fromNow()})`}
							</a>
						</td>
						<td style="background-color: rgba(6,104,157,{m['upvoteColor']});">{m['castUpvotes'] ? m['castUpvotes'] : 0}</td>
						<td>
							<div class="teamNameRow">
								<img class="teamLogo" src="https://vrmasterleague.com{m['homeTeam']['teamLogo']}"/>
								<a href="https://vrmasterleague.com/EchoArena/Teams/{m['homeTeam']['teamID']}"
								   target="_blank">{m['homeTeam']['teamName']}</a>
							</div>

						</td>
						<td>{m['homeBetCount']} - {m['awayBetCount']}</td>
						<td>
							<div class="teamNameRow away">
								<img class="teamLogo" src="https://vrmasterleague.com{m['awayTeam']['teamLogo']}"/>
								<a href="https://vrmasterleague.com/EchoArena/Teams/{m['awayTeam']['teamID']}"
								   target="_blank">{m['awayTeam']['teamName']}</a>
							</div>
						</td>
						<td>{m['homeTeam']['divisionName'].split(' ')[0]}</td>
						<td>{m['castersList']}</td>
						<td>
							{#if m['castingInfo']['channelURL']}
								<a href="{m['castingInfo']['channelURL']}" target="_blank">Watch</a>
							{/if}
						</td>
					</tr>
					{#if m['homeTeam']['teamName'] in rosters && m['awayTeam']['teamName'] in rosters && m['rostersVisible']}
						<tr class="details-row">
							<td></td>
							<td></td>
							<td>
								<div class="roster-table">
									{#each rosters[m['homeTeam']['teamName']]['players'] as player}
										<div>
											<div><a href={player['player_page']}
													target="_blank">{player['player_name']}</a>
											</div>
											<img src={player['player_logo']}/>
										</div>
									{/each}
								</div>
							</td>
							<td></td>
							<td>
								<div class="roster-table away">
									{#each rosters[m['awayTeam']['teamName']]['players'] as player}
										<div>
											<div><a href={player['player_page']}
													target="_blank">{player['player_name']}</a>
											</div>
											<img src={player['player_logo']}/>
										</div>
									{/each}
								</div>
							</td>
							<td></td>
							<td></td>
							<td></td>
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

