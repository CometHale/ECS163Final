const state_csv = "../data/2012StatePop.csv"
const county_csv = "../data/CountyPop.csv"

var population = {}

d3.csv(state_csv, function(state_data){

	state_data.forEach(function(s){
		var empty = {}
		population[s.State] = []
		population[s.State].push(s.StatePopulation)
		population[s.State].push(empty)

	});

	d3.csv(county_csv, function(county_data){
		county_data.forEach(function(c){

			if(+c.FIPSCode <= 1133){
				population["Alabama"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Alabama

			if(+c.FIPSCode >= 2013 & +c.FIPSCode <= 2290){
				population["Alaska"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Alaska

			if(+c.FIPSCode >= 4001 & +c.FIPSCode <= 4027){
				population["Arizona"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Arizona

			if(+c.FIPSCode >= 5001 & +c.FIPSCode <= 5149){
				population["Arkansas"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Arkansas

			if(+c.FIPSCode >= 6001 & +c.FIPSCode <= 6115){
				population["California"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//California

			if(+c.FIPSCode >= 8001 & +c.FIPSCode <= 8125){
				population["Colorado"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Colorado

			if(+c.FIPSCode >= 9001 & +c.FIPSCode <= 9015){
				population["Connecticut"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Connecticut

			if(+c.FIPSCode >= 10001 & +c.FIPSCode <= 10005){
				population["Delaware"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Delaware

			if(+c.FIPSCode == 11001){
				population["District of Columbia"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//DC

			if(+c.FIPSCode >= 12001 & +c.FIPSCode <= 12133){
				population["Florida"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Florida

			if(+c.FIPSCode >= 13001 & +c.FIPSCode <= 13321){
				population["Georgia"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Georgia

			if(+c.FIPSCode >= 15001 & +c.FIPSCode <= 15009){
				population["Hawaii"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Hawaii

			if(+c.FIPSCode >= 16001 & +c.FIPSCode <= 16087){
				population["Idaho"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Idaho

			if(+c.FIPSCode >= 17001 & +c.FIPSCode <= 17203){
				population["Illinois"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Illinois

			if(+c.FIPSCode >= 18001 & +c.FIPSCode <= 18183){
				population["Indiana"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Indiana

			if(+c.FIPSCode >= 19001 & +c.FIPSCode <= 19197){
				population["Iowa"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Iowa

			if(+c.FIPSCode >= 20001 & +c.FIPSCode <= 20209){
				population["Kansas"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Kansas

			if(+c.FIPSCode >= 21001 & +c.FIPSCode <= 21239){
				population["Kentucky"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Kentucky

			if(+c.FIPSCode >= 22001 & +c.FIPSCode <= 22127){
				population["Louisiana"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Louisiana

			if(+c.FIPSCode >= 23001 & +c.FIPSCode <= 23031){
				population["Maine"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Maine

			if(+c.FIPSCode >= 24001 & +c.FIPSCode <= 24510){
				population["Maryland"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Maryland

			if(+c.FIPSCode >= 25001 & +c.FIPSCode <= 25027){
				population["Massachusetts"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Massachusetts

			if(+c.FIPSCode >= 26001 & +c.FIPSCode <= 26165){
				population["Michigan"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Michigan

			if(+c.FIPSCode >= 27001 & +c.FIPSCode <= 27173){
				population["Minnesota"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Minnesota

			if(+c.FIPSCode >= 28001 & +c.FIPSCode <= 28163){
				population["Mississippi"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Mississippi

			if(+c.FIPSCode >= 29001 & +c.FIPSCode <= 29510){
				population["Missouri"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Missouri

			if(+c.FIPSCode >= 30001 & +c.FIPSCode <= 30111){
				population["Montana"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Montana

			if(+c.FIPSCode >= 31001 & +c.FIPSCode <= 31185){
				population["Nebraska"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Nebraska

			if(+c.FIPSCode >= 32001 & +c.FIPSCode <= 32510){
				population["Nevada"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Nevada

			if(+c.FIPSCode >= 33001 & +c.FIPSCode <= 33019){
				population["New Hampshire"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//New Hampshire

			if(+c.FIPSCode >= 34001 & +c.FIPSCode <= 34041){
				population["New Jersey"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//New Jersey

			if(+c.FIPSCode >= 35001 & +c.FIPSCode <= 35061){
				population["New Mexico"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//New Mexico

			if(+c.FIPSCode >= 36001 & +c.FIPSCode <= 36123){
				population["New York"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//New York

			if(+c.FIPSCode >= 37001 & +c.FIPSCode <= 37199){
				population["North Carolina"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//North Carolina

			if(+c.FIPSCode >= 38001 & +c.FIPSCode <= 38105){
				population["North Dakota"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//North Dakota

			if(+c.FIPSCode >= 39001 & +c.FIPSCode <= 39175){
				population["Ohio"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Ohio

			if(+c.FIPSCode >= 40001 & +c.FIPSCode <= 40153){
				population["Oklahoma"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Oklahoma

			if(+c.FIPSCode >= 41001 & +c.FIPSCode <= 41071){
				population["Oregon"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Oregon

			if(+c.FIPSCode >= 42001 & +c.FIPSCode <= 42133){
				population["Pennsylvania"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Pennsylvania

			if(+c.FIPSCode >= 44001 & +c.FIPSCode <= 44009){
				population["Rhode Island"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Rhode Island

			if(+c.FIPSCode >= 45001 & +c.FIPSCode <= 45091){
				population["South Carolina"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//South Carolina

			if(+c.FIPSCode >= 46003 & +c.FIPSCode <= 46137){
				population["South Dakota"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//South Dakota

			if(+c.FIPSCode >= 47001 & +c.FIPSCode <= 47189){
				population["Tennessee"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Tennessee

			if(+c.FIPSCode >= 48001 & +c.FIPSCode <= 48507){
				population["Texas"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Texas

			if(+c.FIPSCode >= 49001 & +c.FIPSCode <= 49057){
				population["Utah"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Utah

			if(+c.FIPSCode >= 50001 & +c.FIPSCode <= 42133){
				population["Vermont"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Vermont

			if(+c.FIPSCode >= 51001 & +c.FIPSCode <= 51840){
				population["Virginia"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Virginia

			if(+c.FIPSCode >= 53001 & +c.FIPSCode <= 53077){
				population["Washington"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Washington

			if(+c.FIPSCode >= 54001 & +c.FIPSCode <= 54109){
				population["West Virginia"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//West Virginia

			if(+c.FIPSCode >= 55001 & +c.FIPSCode <= 55141){
				population["Wisconsin"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Wisconsin

			if(+c.FIPSCode >= 56001 & +c.FIPSCode <= 56045){
				population["Wyoming"][1][c.FIPSCode] = [c.CountyName,c.PopulationEstimate_2012]
			}//Wyoming

		});
		
	});
	
});
