<svelte:head>
	<title>Team Matchup</title>
</svelte:head>

<script>
    import {page} from '$app/stores';
    import {
        Breadcrumb, BreadcrumbItem,
        Button,
        ButtonSet,
        Column,
        DataTableSkeleton,
        Grid,
        ImageLoader,
        Row,
        Search,
        SkeletonPlaceholder, SkeletonText,
        StructuredList, StructuredListBody, StructuredListCell,
        StructuredListHead,
        StructuredListRow,
        Tile
    } from "carbon-components-svelte";
    import TopRightLogo from "$lib/components/TopRightLogo.svelte";

    let team_details = [null, null];

    let teamNames = [
        $page.params["team1"],
        $page.params["team2"],
    ]

    for (let i = 0; i < 2; i++) {
        fetch(`https://api.ignitevr.gg/vrml/api/EchoArena/Teams/Search?name=${teamNames[i]}`)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.length >= 0) {
                    fetch(`https://api.ignitevr.gg/vrml/api/Teams/${resp[0]["id"]}`)
                        .then(resp => resp.json())
                        .then(resp => {
                            team_details[i] = resp["team"];
                            console.log(team_details[i]);
                        }).catch(_ => {
                        team_details[i] = null;
                    });
                } else {
                    team_details[i] = null;
                }
            }).catch(_ => {
            team_details[i] = null;
        });
    }
</script>

<style>
    .rosters img {
        width: 5em;
        height: 5em;
    }
</style>

<div style="max-width: 100em; margin: 5em auto;">

	<Breadcrumb>
		<BreadcrumbItem href="/">Home</BreadcrumbItem>
		<BreadcrumbItem href="#" isCurrentPage>Team Matchup</BreadcrumbItem>
	</Breadcrumb>
	<br>
	<Tile>
		<TopRightLogo/>
		<h2>Team Matchup</h2>
		<p>See historical matchups and records for the selected teams.</p>
		<p>.</p>
	</Tile>
	<br>

	{#if team_details[0] != null && team_details[1] != null}
		<Tile>
			<Grid>
				<Row>
					<Column>
						<ImageLoader fadeIn
						             style="width:10em; height:10em;"
						             src={"https://vrmasterleague.com"+team_details[0]["teamLogo"]}/>
					</Column>
					<Column>
						<h2>{team_details[0]["teamName"]}</h2>
						<p>{team_details[0]["regionName"] ?? ""}</p>
						<p>{team_details[0]["bio"]["bioInfo"] ?? ""}</p>
					</Column>
					<Column>
						<h2>{team_details[1]["teamName"]}</h2>
						<p>{team_details[1]["regionName"] ?? ""}</p>
						<p>{team_details[1]["bio"]["bioInfo"] ?? ""}</p>
					</Column>
					<Column>
						<ImageLoader fadeIn
						             style="width:10em; height:10em;"
						             src={"https://vrmasterleague.com"+team_details[1]["teamLogo"]}/>
					</Column>
				</Row>
			</Grid>
		</Tile>
		<br>
		<Tile>
			<h3>Rosters</h3>
			<Grid>
				<Row>
					{#each team_details as t}
						<Column>
							<StructuredList condensed style="margin-bottom: 1em;">
								<StructuredListHead>
									<StructuredListRow head>
										<StructuredListCell head></StructuredListCell>
										<StructuredListCell head>{t["teamName"]}</StructuredListCell>
									</StructuredListRow>
								</StructuredListHead>
								<StructuredListBody class="rosters">
									{#each t["players"] as p}
										<StructuredListRow>
											<StructuredListCell><img alt=""
											                         style="margin: -.4em; height: 4em; width: 4em;"
											                         src={"https://vrmasterleague.com" + p["userLogo"]}/>
											</StructuredListCell>
											<StructuredListCell
													style="vertical-align: middle;">{p["playerName"]}</StructuredListCell>
											<StructuredListCell>{p["country"]}</StructuredListCell>
											<StructuredListCell>{p["isTeamOwner"] ? "Owner" : p["isTeamOwnerCaptainOrCoCaptain"] ? "Captain" : p["isTeamStarter"] ? "Starter" : ""}</StructuredListCell>
											{#if p["discordID"] != null }
												<StructuredListCell>
													<a href={"https://discordapp.com/users/"+p["discordID"]}
													   target="_blank">{p["discordTag"]}</a>
												</StructuredListCell>
											{/if}
										</StructuredListRow>
									{/each}

								</StructuredListBody>
							</StructuredList>
						</Column>
					{/each}

				</Row>
			</Grid>
		</Tile>
		<br>
		<Tile>
			<h3>Season History</h3>
			<br>
			<Grid>
				<Row>
					{#each team_details as t}
						<Column>
							<StructuredList condensed style="margin-bottom: 1em;">
								<StructuredListHead>
									<StructuredListRow head>
										<StructuredListCell head>{t["teamName"]}</StructuredListCell>
									</StructuredListRow>
								</StructuredListHead>
								<StructuredListBody>
									{#each t["seasonsPlayed"] as s}
										<StructuredListRow>
											<StructuredListCell>{s["seasonName"]}</StructuredListCell>
										</StructuredListRow>
									{/each}

								</StructuredListBody>
							</StructuredList>
						</Column>
					{/each}

				</Row>
			</Grid>
		</Tile>
		<br>
		<Tile>
			<h3>Team Stats</h3>
			<StructuredList condensed style="margin-bottom: 1em;">
				<StructuredListHead>
					<StructuredListRow head>
						<StructuredListCell></StructuredListCell>
						<StructuredListCell head>{team_details[0]["teamName"]}</StructuredListCell>
						<StructuredListCell head>{team_details[1]["teamName"]}</StructuredListCell>
					</StructuredListRow>
				</StructuredListHead>
				<StructuredListBody>
					<StructuredListRow>
						<StructuredListCell>Division</StructuredListCell>
						<StructuredListCell><img width="30px" height="30px" style="vertical-align: middle;"
						                         src={"https://vrmasterleague.com"+team_details[0]["divisionLogo"]}/> {team_details[0]["divisionName"]}
						</StructuredListCell>
						<StructuredListCell><img width="30px" height="30px" style="vertical-align: middle;"
						                         src={"https://vrmasterleague.com"+team_details[1]["divisionLogo"]}/> {team_details[1]["divisionName"]}
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell>MMR</StructuredListCell>
						<StructuredListCell>{team_details[0]["mmr"]}</StructuredListCell>
						<StructuredListCell>{team_details[1]["mmr"]}</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell>Rank (Region)</StructuredListCell>
						<StructuredListCell>#{team_details[0]["rank"]}</StructuredListCell>
						<StructuredListCell>#{team_details[1]["rank"]}</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell>Rank (Global)</StructuredListCell>
						<StructuredListCell>#{team_details[0]["rankWorldwide"]}</StructuredListCell>
						<StructuredListCell>#{team_details[1]["rankWorldwide"]}</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell>Games Played</StructuredListCell>
						<StructuredListCell>{team_details[0]["gp"]}</StructuredListCell>
						<StructuredListCell>{team_details[1]["gp"]}</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell>W/L Ratio</StructuredListCell>
						<StructuredListCell>{(100 * team_details[0]["w"] / (team_details[0]["w"] + team_details[0]["l"])).toFixed(0)}
							%
						</StructuredListCell>
						<StructuredListCell>{(100 * team_details[1]["w"] / (team_details[1]["w"] + team_details[1]["l"])).toFixed(0)}
							%
						</StructuredListCell>
					</StructuredListRow>
				</StructuredListBody>
			</StructuredList>
		</Tile>
	{:else}
		<SkeletonPlaceholder style="width:100%; height: 15em;"/>
		<br>
		<SkeletonText style="width:100%; height: 50em;"/>
	{/if}

</div>