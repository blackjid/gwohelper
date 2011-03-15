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
    }       
};

