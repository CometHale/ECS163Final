

// Generate filename strings:
var CategoryNames = ["Access","Assistance","Demographics","Economic","Education","FoodCosts","Health","Insecurity","LocalFoodAccess","LocalFoodProduction","Restaurants","Stores","StudentAssistance"];
var Filenames = [];

for (var i in CategoryNames)
{ 
    var cat = CategoryNames[i];
    var filename = "data/" + cat + ".csv";
    Filenames.push(filename);
}


// Generate stateMap
var dataObject = {};
var categoryObject = {};

var LoadData = function()
{
  var allData = [];
  Filenames.forEach(function(f,i){
    d3.csv(f,function(data){
      allData[i] = data;
      if (d3.keys(allData).length == Filenames.length)
      {
      // Code that runs after all files are loaded:
      
        allData.forEach(function(m,index) 
        {
          var category = CategoryNames[index];
          var newCatSet = new Set();
          for (var propertystart in m[0])
          {
            if (propertystart != "FIPS")
            {
            newCatSet.add(propertystart);
            dataObject[propertystart] = d3.map();
            }
          }
          m.forEach(function(d) 
          {
           for (var property in d) //iterates through properties of d
            if (property != "FIPS")
            {
              if (d.FIPS == "max")
              {
                dataObject[property].set("max", d[property]);
              } else {
                dataObject[property].set(+d.FIPS, d[property]);
              }
            }
            categoryObject[category] = newCatSet;
         });
      }); //loops through all rows (m) of 
     } // after files load function
    }); // d3.csv
  }); // foreach file
         // console.log(dataObject);
// console.log(categoryObject);
// console.log(categoryObject["Access"]);
  
}// end LoadData function

LoadData();
loadCorrParser();
d3.json("data/us-10m.v1.json", function(usGeo) {
drawbp();
loadChord();
  // console.log(dataObject);
  // console.log(categoryObject);
  // console.log(dataObject["PCT_WIC14"]);
  // console.log(categoryObject["Access"]);
});

