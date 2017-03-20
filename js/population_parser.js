var populationByState = {};
var populationByCounty = {};

function LoadPops()
{
  const state_csv = "data/StatePop.csv"
  const county_csv = "data/CountyPop.csv"

  d3.csv(state_csv, function(state_data){
    console.log(state_data);
	  state_data.forEach(function(s){
		  populationByState[s.State] = s.StatePopulation;
	  });
  });

  d3.csv(county_csv, function(county_data){
    console.log(county_data);
		county_data.forEach(function(c){
		  populationByCounty[+c.FIPSCode] = [c.State, c.CountyName,+c.PopulationEstimate_2012];
		});
  });
	
}
