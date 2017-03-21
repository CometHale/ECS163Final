var map = $("#mapPart")
// var bar = $("#barPart")
var chord = $("#chord-chart")
var bipartite = $("#bipartite")
// var scatter = $("#scatterplot")

var map_link = $("#map-link")
// var bar_link = $("#bar-link")
var chord_link = $("#chord-link")
var bipartite_link = $("#bipartite-link")
// var scatter_link = $("#scatter-link")

map_link.click(function(){
	$('html, body').animate({
	    scrollTop: map.offset().top
	}, 2000);
});


// bar_link.click(function(){
// 	$('html, body').animate({
// 	    scrollTop: bar.offset().top
// 	}, 2000);
// });

chord_link.click(function(){
	$('html, body').animate({
	    scrollTop: chord.offset().top
	}, 2000);
});

bipartite_link.click(function(){
	$('html, body').animate({
	    scrollTop: bipartite.offset().top
	}, 2000);
});

// scatter_link.click(function(){
// 	$('html, body').animate({
// 	    scrollTop: scatter.offset().top
// 	}, 2000);
// });
