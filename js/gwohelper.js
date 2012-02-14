GWO_helper = {
     /**
     * Initialize all the control scripts defined in the experiment object
     * @param   _experiments  object      initialization object contains account id, debug flag and experiments definitions
     * @param   callback      function    callback to be executed when the last control is loaded
     */
    init: function(_experiments, callback){
        
       // Load control scripts for each experiments 
       // Load the tracking script when finish
       this._loadControls(_experiments, 0, callback);            
    },
    
    /***************************/
    /*    Private methods      */
    /***************************/
    
    /**
     * Load the GOOGLE CONTROL SCRIPTS recurively
     * @param   _experiments    array      array with the experiments definitions provided in the init
     * @param    idx            int        index to load
     * @param   callback        function   callback to be executed when the last control is loaded
     */
    _loadControls: function(_experiments, idx, callback){
        
        // GOOGLE CONTROL SCRIPT 
        function utmx_section(){}function utmx(){}
        (function(){var k=_experiments[idx].id,d=document,l=d.location,c=d.cookie;function f(n){
        if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.indexOf(';',i);return escape(c.substring(i+n.
        length+1,j<0?c.length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;
        var he = d.getElementsByTagName("head")[0];
        var s = d.createElement("script");
        s.type='text/javascript';
        s.src='http'+(l.protocol=='https:'?'s://ssl':'://www')+'.google-analytics.com'
        +'/siteopt.js?v=1&utmxkey='+k+'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='
        +new Date().valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'');
        if (typeof s.onload !== 'undefined') {
            s.onload = function(){
                loadCallback();
            }
        }
        else if (typeof s.onreadystatechange !== 'undefined') {
            s.onreadystatechange = function () {
                if (s.readyState == 'loaded' || s.readyState == 'complete')
                        loadCallback();
            }
        }
        he.appendChild(s);
        })();

        var loadCallback = function(){
            // Get the variations
            GWO_helper._resolveVariations(_experiments[idx]);
            
            // Debug in the console
            if(GWO_helper.debug)
                GWO_helper._showlog(_experiments[idx].name);
                
            // Track this experiment if the flag is true
            if(_experiments[idx].track)
                GWO_helper.experiments[_experiments[idx].name].start();

            // Recursively load controls for each experiment
            if(idx + 1 < _experiments.length)
                GWO_helper._loadControls(_experiments, idx + 1, callback);
            else{
                // Load the tracking script
                GWO_helper._loadTracking()
                // Call the callback
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
     * Write to the console the information to from the experiments
     * @param   _expname    string  the name of the experiment to log to the console
     * @param   _type       string  when tracking an experiment, whether is a test or goal tracking event 
     */
    _showlog: function(_expnmame, _type){
        
        // DEBUG
        console.log("******************************************************************");
        if(_type == 'goal'){
            console.log("CONVERSTION TRACKED", _expnmame);
        }
        else if(_type == 'test'){
            console.log("START TRACKING EXPERIMENT", _expnmame);
        }
        else {
            console.log("LOADED EXPERIMENT " + _expnmame, this.experiments[_expnmame]);
            console.log("COMBINATION", this.experiments[_expnmame].combination);
            for(var i = 0; i < this.experiments[_expnmame].sections.length; i++){
                console.log("VARIATIONS FOR SECTION", this.experiments[_expnmame].sections[i].name + " - " + this.experiments[_expnmame].sections[i].variation);
            }
        }
        console.log("******************************************************************");
        
    }, 
    
    /**
     * Get the variations for each section of the experiment. Also get the combination
     * @param   _exp    string  the experiment definition with name, id, track flag
     * @return          void    Create start and goal methos and other properties for the experiments
     */
    _resolveVariations: function(_exp){
    
        var name = _exp.name;
        if(!this.experiments) this.experiments = {}; 
                
        // Set the id
        this.experiments[name] = {id: _exp.id};
        
        // Set the combination for this experiment
        this.experiments[name].combination = utmx("combination");
        
        // Set the utmx function to the experiment
        this.experiments[name].utmx = utmx;
        
        // Set the tracking functions for the experiments
        this.experiments[name].start = function(){
            if(!GWO_helper.debug){
                _gaq.push(['gwo._trackPageview', '/' + GWO_helper.experiments[name].id + '/test']);
            }
            else{
                GWO_helper._showlog(name, "test");
            }
        };
        this.experiments[name].goal = function(){
            if(!GWO_helper.debug){
                _gaq.push(['gwo._trackPageview', '/' + GWO_helper.experiments[name].id + '/goal']);
            }
            else{
                GWO_helper._showlog(name, "goal");
            }
        };
        
        // Prepare section container
        this.experiments[name].sections = []; 
        
        // Resolve sections
        for(var section in utmx_global_vd) {
            // Save the variations
            this.experiments[name].sections.push({name: section, variation: utmx_global_vd[section].index});
            
            // ADD CLASS TO THE BODY  gwo-(experiment)_(section)-(variation)
            var b = document.getElementsByTagName("body")[0];
            var testState = "gwo-" + name + "-" + section + "-" + utmx_global_vd[section].index;
            
            if (!b.className.match(new RegExp('(\\s|^)'+testState+'(\\s|$)'))) 
                b.className += " "+testState;
        }           
    }
};
