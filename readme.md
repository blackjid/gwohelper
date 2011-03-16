Google Web Optimizer Multi Experiment Helper
============================================
I wrote this helper to create multiple experiments with GWO in my startup [voxound.com](http://www.voxound.com "Voxound"), I hope you can use it too.

Description
-----------
This helper allow you to load dynamically the control script and the tracking script provided by GWO, as well to push the tracking beacon for the start of the experiment and for the goal.

It also provides a way to make changes to the page based on the experiments variantions delivered by GWO. This can be done using **CSS** or **javascript**.

Setup
-----
1.	Config the helper changing the values in the *gwo_helper.config.js* file.

	    account: "UA-XXXXXXX-X" 
	
	This is the google web optimizer account ID your are going to use

	    debug: bool

	If it's true, the script will write some logs in the browsers console and it will not send the tracking beacons, that way you can test in your development environment without sending data to your production GWO account

	    experiments: {
		    experiment1: {
			    id: 0000000,
			    sections: [{name: "section1"}, {name: "section2"}, ....]
		    },
		    experiment2: ....
		}

	This is an object that has as many object inside as you need to experiment. 

	**experiment1.id** Is the ID that GWO provide for this experiment (Step 9 in the GWO interface step by step guide)  
	**experiment1.sections** Is an array with the sections of the experiments and it's names, the same you defined in the step 9 of the step by step guide

2.    Insert the script and the config script into your code, you can use it at the begining or end of your code depending when your are going to call the methods

            <script src="/gwo_helper.js"></script>
            <script src="/gwo_helper.config.js"></script>

3.    Create the variations in the GWO website (see next section)


Dealing with GWO interface to create the variations
---------------------------------------------------
This is a step by step guide to create the experiments in the GWO website

1. 	Go to [Google Web Optimizer website](http://www.google.com/websiteoptimizer "Google Web Optimizer") 
2. 	Select the account that your are going to use
3. 	Create a new experiment
4. 	Select a *Multivariate Experiment*
5. 	Check the *I've completed the steps above and....* checkbox and click **Create**
6. 	Name your experiment
7. 	Add your url in the "Test page URL" and in the "Conversion page URL", none of these urls are going to be used so you can put whatever you want. Click "Continue"
8.	Select *You will install and validate the JavaScripts Tags* then click **Continue**
9. 	In the Control and Tracking script text area, find the *experiment ID* and use it in the experiment definitions in the gwo_helper.js file
10. 	Create a file with the experiment sections definitions. You'll need to write one line for each section. Use the same name that you defined in the experiments definitions in the gwo_helper.js file It should read like this:

            <!-- utmx section name="Section1" -->
            <!-- utmx section name="Section2" -->

11. 	Click in the link **Test page not accessible? Try offline validation**, then select to browse the *Test Page* location and select the file you created in the step 10.
	It will return a few errors but it should detect the 2 sections you defined. Click **continue** in the window.
12. 	Click **Contiune**. Don't worry for all those errors.
13. 	Confirm clicking in **Contiune Anyway"**
14. 	Now you can create as many variations you want for each sections. Give them a name and you can leave the content empty. Then click on **Save and Continue**
15. 	Launch the experiment. You can launch the experiment with the debug property in gwo_helper set to true. This way your are not going to send any data until you change it to false in your production environment

Tracking the test and the goals
-------------------------------
There're two methods to help you track your experiments

###loadControl(*String* _experiment, *Boolean* _startExperiment)###
This method create load the control script from google web optimizer. You should call it only once for each experiment.  
**\_experiment** is the experiment name you setup in the experiments object
**\_startExperiment** set it to *true* if you want to track the begining of the test right after the control is loaded. It's the same than calling the track(_experiment, "test") after calling the loadControl methods  
Example:  
	 
	GWO_helper.loadControl("experiment1", true);  

###track(*String* _experiment, *String* _type)###
This method will track the experiment. It can track the begining or the end (goal) of the experiment.  
**\_experiment** is the experiment name you setup in the experiments object
**\_type** should be "test" or "goal" depending if you want to track the begining or the end of the experiment  
Example:
	
	GWO_helper.track("experiment1", "test"); //for begining or	
	GWO_helper.track("experiment1", "goal"); // for the goal

Testing the variations
----------------------
You can add a hash to the url to force the variation for each experiment

	http://yourdomain.com/#experiment1=0-0-0&experiment2=0-0
where the values are the variation of each section for that experiment

Example
-------
Try this [live example](http://jsfiddle.net/blackjid/FKJHf/ "Example on jsfiddle.net") hosted in jsfiddle.net

ToDO
----
*	Support GWO variation previews
*       Add callback to the loadControl method

