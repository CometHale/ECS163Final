
var correlation_dict = {} // correlations for the variables
var category_correlations = {} // correlations calculated based on the summed absolute values of the variable correlations
var category_avg_correls = {}	//averaged category_correlations
var category_correls = {}

loadCorrParser = function() {
	correlation_csv = "data/corr.csv"

var loadCorrParser = function(){

	d3.csv(correlation_csv,function(corr_data){
		var cat_var_dict = {}
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
					for(catego in categoryObject){
						var set_array = Array.from(categoryObject[catego])
						cat_var_dict[catego] = []
						category_correlations[catego] = {}
						for(collection in set_array){
							var cur_var = set_array[collection]
							cat_var_dict[catego].push(cur_var)
						}

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
		

		//adds up the variable correlations for each variable pair
		for(correla in correlation_dict){
			for(cate in cat_var_dict){
				if(cat_var_dict[cate].indexOf(correla) > -1){

					for(sub_key in correlation_dict[correla]){

						if(!(sub_key in category_correlations[cate])){
							category_correlations[cate][sub_key] = 0
						}

						var corr = parseFloat(correlation_dict[correla][sub_key])

						if(corr < 0 ){
							corr = corr * -1
						}
						category_correlations[cate][sub_key] += corr
					}
				}

			}
		}

		//add up the correlations within each category

		for(current_cat in cat_var_dict){
			category_avg_correls[current_cat] = {}

			for(sub_cate in category_correlations){
				var sub_cat_vars = cat_var_dict[sub_cate]
				for(variable in category_correlations[current_cat]){

					if(!(sub_cate in category_avg_correls[current_cat])){
						category_avg_correls[current_cat][sub_cate] = 0 
					}
					
					if(sub_cat_vars.indexOf(variable) > -1){
						category_avg_correls[current_cat][sub_cate] += category_correlations[current_cat][variable]
					}	

				}
				
			
			
			}
		}

		//average the totals
		for(category in category_avg_correls){
			category_correls[category] = {}
			for(sub_category in category_avg_correls[category]){
				var sub_cat_vars = cat_var_dict[sub_category]
				category_correls[category][sub_category] = category_avg_correls[category][sub_category] / ((71 - sub_cat_vars.length) * sub_cat_vars.length)
			}
		}
		console.log(category_correls)
	})

}
