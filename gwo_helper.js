GWO_helper = {
    
    /**
     * Google Web Optimizer account UA-XXXXXXX-X
     */
    account: "UA-XXXXXXX-X",
    
    /**
     * When true a summary of the experiment will be showed in the consol
     * Also the tranking test and goals are omitted
     */
    debug: true, 
    
    /**
     * Definition of the experiments
     */
    experiments: {
        example1: {
            id: "0000000000", /* GWO experiment id */
            sections: [{name: 'section1'}, {name: 'section2'}]  /* Section Names */
        },
        example2: {   
            id: "0000000001",
            sections: [{name: 'section1'},{name: 'section2'}]
        }
    },
    
     /**
     * Load the GOOGLE CONTROL SCRIPT
     * @_experiment         string      name of the experiment defined in GWO_helper.experiments
     * @_startExperiment    bool        (false) whether to start or not the experiment right after loading the control
     */
    loadControl: function(_experiment, _startExperiment){
        
        if(_experiment != undefined){
                        
            // GOOGLE CONTROL SCRIPT 
            function utmx_section(){}function utmx(){}
            (function(){var k=GWO_helper.experiments[_experiment].id,d=document,l=d.location,c=d.cookie;function f(n){
            if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.indexOf(';',i);return escape(c.substring(i+n.
            length+1,j<0?c.length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;
            var he = d.getElementsByTagName("head")[0];
            var s = d.createElement("script");
            s.type='text/javascript';
            s.src='http'+(l.protocol=='https:'?'s://ssl':'://www')+'.google-analytics.com'
            +'/siteopt.js?v=1&utmxkey='+k+'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='
            +new Date().valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'');
            s.onload = function(){
                loadCallback();                
            };
            s.onreadystatechange = function () {
                    if (s.readyState == 'loaded' || s.readyState == 'complete') {
                            loadCallback();
                    }
            }   
            he.appendChild(s);
            })();
            
            var loadCallback = function(){
                GWO_helper._loadTracking();
                
                // Get the variations
                GWO_helper._resolveVariations(_experiment);
                
                // Start the experiment
                if(_startExperiment)
                    GWO_helper.track(_experiment, "test");
                
                // Debug in the console
                if(GWO_helper.debug)
                    GWO_helper._showlog(_experiment);
            }
            
        }
        
    },
    
    /**
     * Set in google analytics for GWO the init or the goal of the experiment
     * @_experiment string          name of the experiment defined in GWO_helper.experiments
     * @_type       string          type of tracking ("goal", "test")
     */
    track: function(_experiment, _type){
	
		if(!this.debug)
			 if(_type == "test" || _type == "goal")
			 _gaq.push(['gwo._trackPageview', '/' + this.experiments[_experiment].id + '/' + _type]);

    },
    
    /***************************/
    /*    Private methods      */
    /***************************/
    
    _loadTracking: function(){
        
        if(!document.getElementById("GWO_trackingScript")){
		
            // GOOGLE TRACKING SCRIPT
            window._gaq = window._gaq || [];
            window._gaq.push(['gwo._setAccount', this.account]);
			
            (function() {
                var ga = document.createElement('script');ga.type = 'text/javascript';ga.async = true;
                ga.id = "GWO_trackingScript";
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga, s);
            })();
        }
    },
    
    _showlog: function(_experiment){

        // DEBUG
        console.log("******************************************************************");
        console.log("LOADED EXPERIMENT" + _experiment, this.experiments[_experiment]);
        console.log("TEST COMBINATION", this.experiments[_experiment].combination);
        for(var i = 0; i < this.experiments[_experiment].sections.length; i++){
            console.log("TEST VARIATIONS", this.experiments[_experiment].sections[i].name + " - " + utmx("variation_number", this.experiments[_experiment].sections[i].name));
        }
        console.log("******************************************************************");

    }, 
    
    _resolveVariations: function(_experiment){
	
		// Get the forced variations
        var experiments = document.location.hash.substr(1).split("&");
        if(experiments != undefined && experiments[0] != ""){
            var forcedTests = {};
            for (var i = 0; i < experiments.length ; i++){ 
                var experiment = experiments[i].split("=");
                forcedTests[experiment[0]] = {};

                var variations = experiment[1].split("-");

                for(var j = 0; j < variations.length; j++){
                    forcedTests[experiment[0]][j] = variations[j];				
                }

            }
        }

        // Request the variations with the utmx function
        for(var k = 0; k < this.experiments[_experiment].sections.length; k++){
            this.experiments[_experiment].sections[k].variation = (forcedTests == undefined) ? utmx("variation_number", this.experiments[_experiment].sections[k].name) : forcedTests[_experiment][k];
        }	
        
        // Set the combination for this experiment
        this.experiments[_experiment].combination = (forcedTests == undefined) ? utmx("combination") : "Forced Variations Used. No combination available";
        
        // ADD CLASS TO THE BODY  state-test(experiment)_(section)-(variation)
        var b = document.getElementsByTagName("body")[0];
        for(var j = 0; j < this.experiments[_experiment].sections.length; j++){
            var testState = "state-test-" + (_experiment) + "-" + j + "-" + this.experiments[_experiment].sections[j].variation;
            
            if (!b.className.match(new RegExp('(\\s|^)'+testState+'(\\s|$)'))) 
                b.className += " "+testState;
        }
                
    }
       
};

