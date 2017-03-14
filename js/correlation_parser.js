correlation_csv = "./data/corr.csv"

var correlation_dict = {}

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
				if(!(cur_key in correlation_dict)){
					//cur_key is the column being compared to the current row
					correlation_dict[cur_row][cur_key] = cd[cur_key]
				}
				
				if(cur_key == cur_row){//correlation to itself i.e. Unemployment to Unemployment
					correlation_dict[cur_row]["SELF"] = cd[cur_key]
				}
			}

		}
	});
});