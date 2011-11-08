GWO_helper = {
     /**
     * Initialize all the control scripts defined in the experiment object
     * @callback             function   callback to be executed at the end of the last iteration
     */
    init: function(callback){
        
       // Create an array with the keys for each experiment
       var expArray = [];
       for(var experiment in this.experiments) {
           expArray.push(experiment);
       }
               
       // Load control scripts for each experiments 
       // Load the tracking script when finish
       this._loadControls(expArray, 0, callback);     
       
    },
    
    /***************************/
    /*    Private methods      */
    /***************************/
    
    /**
     * Load the GOOGLE CONTROL SCRIPTS recurively
     * @_experiments         array      array with the names of the experiments defined in GWO_helper.experiments
     * @idx                  int        index to load
     * @callback             function   callback to be executed at the end of the last iteration
     */
    _loadControls: function(_expNames, idx, callback){
        
        // GOOGLE CONTROL SCRIPT 
        function utmx_section(){}function utmx(){}
        (function(){var k=GWO_helper.experiments[_expNames[idx]].id,d=document,l=d.location,c=d.cookie;function f(n){
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
            // Get the variations
            GWO_helper._resolveVariations(_expNames[idx]);

            // Debug in the console
            if(GWO_helper.debug)
                GWO_helper._showlog(_expNames[idx]);

            // Recursively load controls for each experiment
            if(idx + 1 < _expNames.length)
                GWO_helper._loadControls(_expNames, idx + 1, callback);
            else{
                // Load the tracking script
                GWO_helper._loadTracking()
                // Load the callback
                if(callback) callback.call();
            }
        }
        
    },
    
    /**
     * Load the GOOGLE TRACKING SCRIPT
     */
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
    
    /**
     * Load the GOOGLE TRACKING SCRIPT
     */
    _showlog: function(_exp, _type){
        
        // DEBUG
        if(_type == undefined){
            console.log("******************************************************************");
            console.log("LOADED EXPERIMENT " + _exp, this.experiments[_exp]);
            console.log("TEST COMBINATION", this.experiments[_exp].combination);
            for(var i = 0; i < this.experiments[_exp].sections.length; i++){
                console.log("TEST VARIATIONS", this.experiments[_exp].sections[i].name + " - " + this.experiments[_exp].sections[i].variation);
            }
            console.log("******************************************************************");
        }
        else {
            console.log("******************************************************************");
            console.log("TRACKING EXPERIMENT", _exp, _type);
            console.log("******************************************************************");
        }
        
    }, 
    
    /**
     * Get the variations for each section of the experiment. Also get the combination
     */
    _resolveVariations: function(_exp){
        
        // Get the forced variations
        //this._getForcedVariations();

        // Request the variations with the utmx function
        for(var k = 0; k < this.experiments[_exp].sections.length; k++){
            this.experiments[_exp].sections[k].variation = utmx("variation_number", this.experiments[_exp].sections[k].name);
        }	
        
        // Set the combination for this experiment
        this.experiments[_exp].combination = utmx("combination");
        
        // Set th utmx function to the experiment
        this.experiments[_exp].utmx = utmx;
        
        // Set the tracking functions for the experiments
        this.experiments[_exp].start = function(){
            if(!GWO_helper.debug){
                _gaq.push(['gwo._trackPageview', '/' + GWO_helper.experiments[_exp].id + '/test']);
            }
            else{
                GWO_helper._showlog(_exp, "test");
            }
        };
        this.experiments[_exp].goal = function(){
            if(!GWO_helper.debug){
                _gaq.push(['gwo._trackPageview', '/' + GWO_helper.experiments[_exp].id + '/goal']);
            }
            else{
                GWO_helper._showlog(_exp, "goal");
            }
        };
        
        // ADD CLASS TO THE BODY  state-test(experiment)_(section)-(variation)
        var b = document.getElementsByTagName("body")[0];
        for(var l = 0; l < this.experiments[_exp].sections.length; l++){
            var testState = "state-test-" + (_exp) + "-" + l + "-" + this.experiments[_exp].sections[l].variation;
            
            if (!b.className.match(new RegExp('(\\s|^)'+testState+'(\\s|$)'))) 
                b.className += " "+testState;
        }
                
    },
    
    /**
     * Check the url hash for posibile test variations (only in debug mode)
     */
    _getForcedVariations: function(_experiment){
//        if(GWO_helper.debug){
//            var experiments = document.location.hash.substr(1).split("&");
//            if(experiments != undefined && experiments[0] != ""){
//                var forcedTests = {};
//                for (var i = 0; i < experiments.length ; i++){ 
//                    var experiment = experiments[i].split("=");
//                    forcedTests[experiment[0]] = {};
//
//                    var variations = experiment[1].split("-");
//
//                    for(var j = 0; j < variations.length; j++){
//                        forcedTests[experiment[0]][j] = variations[j];				
//                    }
//
//                }
//            }
//        }
    }
       
};

