
var chord_svg = d3.select("#chord-chart").append("svg")
				.attr("width",width + 700)
				.attr("height",height + 700),
			    outerRadius = Math.min(width + 300, height + 300) * 0.5 - 40,
			    innerRadius = outerRadius - 30;

//chord_matrix = [Access, Education, Health, Poverty]

// Access:
	//Access
	//Stores
	//Restaurants
	//LocalFoodAccess
	//LocalFoodProduction

// Education:
	//Education
	//StudentAssistance

//Health:
	//Health

//Poverty
	//FoodCosts
	//Insecurity
	//Assistance
	
var chord_matrix = []