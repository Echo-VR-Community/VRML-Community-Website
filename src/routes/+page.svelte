<script lang="ts">
  import {
    Button,
    ButtonSet,
    Checkbox,
    DataTable,
    DataTableSkeleton, Pagination,
    Toolbar,
    ToolbarContent,
    ToolbarSearch
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/g100.css";
  import moment from "moment";

  let matches = null;
  let apiMatches = null;

  let master = true;
  let diamond = false;
  let platinum = false;
  let gold = false;
  let silver = false;
  let bronze = false;

  let pageSize = 20;
  let page = 1;

  let filteredRowIds = [];

  fetch("https://api.vrmasterleague.com/EchoArena/Matches/Upcoming")
    .then(r => r.json())
    .then(r => {
      let counter = 0;
      for (let match of r) {
        match["id"] = counter;
        counter++;
      }
      apiMatches = r;
      filterDivisions();
    });


  function filterDivisions() {
    matches = apiMatches.filter(row=>{
      if (row['homeTeam']['divisionName'].includes('Master') && master) return true;
      if (row['homeTeam']['divisionName'].includes('Diamond') && diamond) return true;
      if (row['awayTeam']['divisionName'].includes('Diamond') && diamond) return true;
      if (row['homeTeam']['divisionName'].includes('Platinum') && platinum) return true;
      if (row['awayTeam']['divisionName'].includes('Platinum') && platinum) return true;
      if (row['homeTeam']['divisionName'].includes('Gold') && gold) return true;
      if (row['awayTeam']['divisionName'].includes('Gold') && gold) return true;
      if (row['homeTeam']['divisionName'].includes('Silver') && silver) return true;
      if (row['awayTeam']['divisionName'].includes('Silver') && silver) return true;
      if (row['homeTeam']['divisionName'].includes('Bronze') && bronze) return true;
      if (row['awayTeam']['divisionName'].includes('Bronze') && bronze) return true;
      return false;
    });
  }
</script>


<div style="max-width: 100em; margin: 5em auto;">
  {#if !matches}
    <DataTableSkeleton />
  {:else}
    <DataTable
      title="Upcoming Matches"
      description="Search by team name or filter by division."
      sortable
      zebra
      headers={[
            {
              key: "dateScheduledUTC",
              value: "Time",
              display: (date) => `${new Date(date + "Z").toLocaleString()}  (${moment(new Date(date + "Z")).fromNow()})`
            },
            { key: "castUpvotes", value: "Cast Votes", display: data=>data == null ? 0: data, sort: (a,b)=>a<b },
            { key: "homeTeam.teamName", value: "Home Team",  } ,
            { key: "homeBetCount", value: "Home Bets" } ,
            { key: "awayBetCount", value: "Away Bets" } ,
            { key: "awayTeam.teamName", value: "Away Team" } ,
            { key: "homeTeam.divisionName", value: "Division"} ,
            { key: "castingInfo", value: "Casters", display: data=>{
              if (data['caster'] == null) return "";
              else{
                let ret = data['caster'];
                if (data['coCaster']) ret += ', ' + data['coCaster'];
                if (data['cameraman']) ret += ', ' + data['cameraman'];
                return ret;
              }
            }} ,
    ]}

      pageSize={pageSize}
      page={page}
      rows={matches}
    >
      <div style="display: flex; flex-direction: row; margin: 1em;">
        <ButtonSet>
          <Button kind={master?"primary":"secondary"} on:click={()=>{master = !master; filterDivisions();}}>Master</Button>
          <Button kind={diamond?"primary":"secondary"} on:click={()=>{diamond = !diamond; filterDivisions();}}>Diamond</Button>
          <Button kind={platinum?"primary":"secondary"} on:click={()=>{platinum = !platinum; filterDivisions();}}>Platinum</Button>
          <Button kind={gold?"primary":"secondary"} on:click={()=>{gold = !gold; filterDivisions();}}>Gold</Button>
          <Button kind={silver?"primary":"secondary"} on:click={()=>{silver = !silver; filterDivisions();}}>Silver</Button>
          <Button kind={bronze?"primary":"secondary"} on:click={()=>{bronze = !bronze; filterDivisions();}}>Bronze</Button>
        </ButtonSet>

      </div>
      <Toolbar>
        <ToolbarContent>

          <div style="display: flex; flex-direction: column; width: 100%; height: fit-content;">


            <ToolbarSearch
              persistent
              shouldFilterRows={(row, value) => {
                // filter out by team name
                return !(!row['homeTeam']['teamName'].toLowerCase().includes(value.toLowerCase()) &&
                  !row['awayTeam']['teamName'].toLowerCase().includes(value.toLowerCase()));
              }}
              bind:filteredRowIds
            />
          </div>
        </ToolbarContent>
      </Toolbar>
    </DataTable>

    <Pagination
      bind:pageSize
      bind:page
      totalItems={filteredRowIds.length}
      pageSizeInputDisabled
    />
  {/if}
</div>