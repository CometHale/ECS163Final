
var correlation_dict = {} // correlations for the variables
var category_correlations = {} // correlations calculated based on the averaged absolute values of the variable correlations
var cat_var_dict = {}

loadCorrParser = function() {
	correlation_csv = "data/corr.csv"

	d3.csv(correlation_csv,function(corr_data){

		corr_data.forEach(function(cd){
			cur_row = null
			cur_key = null
			for(key in cd){

				if(key == ""){ 
					cur_row = cd[key] // cur_row is the left most cell on the row
					if(!(cur_row in correlation_dict) ){
						correlation_dict[cur_row] = {}
					}
				}
				else{

					cur_key = key
					var same_cat = false //tracks whether or not curkey and cur_row are in the same category
					for(cat in categoryObject){
						var set_array = Array.from(categoryObject[cat])

						if(set_array.indexOf(cur_key) > -1){
							if(set_array.indexOf(cur_row) > - 1){

								correlation_dict[cur_row][cur_key] = 0 // no correlation between variables under the same category
								same_cat = true
								break
							}
						}
					}
					
					if(!same_cat){
						// if(!(cur_key in correlation_dict[cur_row])){
							//cur_key is the column being compared to the current row
						correlation_dict[cur_row][cur_key] = cd[cur_key]
						// }
						
						// if(cur_key == cur_row){//correlation to itself i.e. Unemployment to Unemployment
						// 	correlation_dict[cur_row]["SELF"] = cd[cur_key]
						// }	
					}
					
				}

			}
		});
		
		for(catego in categoryObject){
			var array = Array.from(categoryObject[catego])
			cat_var_dict[catego] = []
			category_correlations[catego] = {}
			for(collection in array){
				var cur_var = array[collection]
				cat_var_dict[catego].push(cur_var)
			}

		}

		
	});
	
	calcCategoryCorrelations();
	
}

calcCategoryCorrelations = function(){

	for(correla in correlation_dict){
		console.log(correla)
		for(cate in cat_var_dict){
			
			if(cat_var_dict[cate].indexOf(correla) > -1){

				for(sub_key in correlation_dict[correla]){

					if(!(sub_key in category_correlations[cate])){
						category_correlations[cate][sub_key] = 0
					}
					category_correlations[cate][sub_key] += category_correlations[cate][sub_key]
					console.log("here")
				}
			}

		}
	}

	d3.json("../data/us-10m.v1.json", function(usGeo) {
	  loadChord();
	});

	
}

loadCorrParser();
