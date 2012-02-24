$(document).ready(function(){

	$('#navbar').scrollspy({offset:20});


	


	window.prettyPrint && prettyPrint();
});

// Show the resolved experiment variations in the documentation
processExp = function(){
	var downloadJson = $("#downloadJson");
	var forkJson = $("#forkJson");

	$(".comb",downloadJson).html(gwohelper.experiments.download.combination);
	_.each(gwohelper.experiments.download.sections, function(section){
		$("." + section.name,downloadJson).html(section.variation);
	});

	$(".comb",forkJson).html(gwohelper.experiments.fork.combination);
	_.each(gwohelper.experiments.fork.sections, function(section){
		$("." + section.name,forkJson).html(section.variation);
	});
}

// Change the download button based on the variations
changeButton = function(){

	_.each(gwohelper.experiments.download.sections, function(section){
		// section button
		if(section.name == "button"){
			var buttons = ['btn-primary','btn','btn-success'];
			$("#download").toggleClass(buttons[section.variation], true);

		}
		// section copy
		if(section.name == "copy"){
			var copies = ['Download gwohelper.js','Download it'];
			$("#download").html(copies[section.variation]);

		}
	});
}

// Track goal on click
$(document).on('click', '[data-action=goal]',function(e){
	var goal = $(e.currentTarget).data().goal;
	gwohelper.experiments[goal].goal();
});