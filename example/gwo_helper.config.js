/**
* Google Web Optimizer account UA-XXXXXXX-X
*/
GWO_helper.account: "UA-8845687-3";

/**
* When true a summary of the experiment will be showed in the consol
* Also the tranking test and goals are omitted
*/
GWO_helper.debug: true; 

/**
* Definition of the experiments
*/
GWO_helper.experiments: {
	signup: {
	    id: "1635239698", /* GWO experiment id */
	    sections: [{name: 'header'}, {name: 'button'}]  /* Section Names */
	},
	viewpicture: {   
	    id: "3478664147",
	    sections: [{name: 'picture'},{name: 'caption'}]
	}
}    

