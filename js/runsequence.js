LoadPops();
LoadData();
var firstLoad = true; 
MakeMap("firstLoad");
MakeMap("P_NOHS");
d3.json("data/us-10m.v1.json", function(us) {
    
AddAttribute("P_NOHS");
AddRegion(1019);
AddRegion(6083);
AddAttribute("CONVSPTH12");
AddAttribute("P_SOMECOLLEGE");
RemoveAttribute();
});
