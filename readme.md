More up-to-date documentation and examples on http://blackjid.github.com/gwohelper


Google Web Optimizer Multi Experiment Helper
============================================
I wrote this helper to create multiple experiments with GWO in my startup [voxound.com](http://www.voxound.com "Voxound"), I hope you can use it too.

Description
-----------
This helper allow you to load dynamically the control script and the tracking script provided by GWO, as well to push the tracking beacon for the start of the experiment and for the goal.

It also provides a way to make changes to the page based on the experiments variantions delivered by GWO. This can be done using **CSS** or **javascript**.

Setup
-----

Insert the following snippet in your page and modifie de values for your needs. You can use it at the begining or end of your code depending when your are going to call the methods

        <script>
        GWO_helper.account = "UA-XXXXXXX-X";
        GWO_helper.debug = true; /* or false */
        GWO_helper.init([
                {id:"xxxxxxxxxx", name:"download", track:false},
                {id:"xxxxxxxxxx", name:"fork", track:false} /* n experiments */
            ],
            function(){/*callback code*/});                    
        </script>
        <script src="gwohelper.js"/>

**GWO_helper.account** *string*  
This is the google web optimizer account ID your are going to use. *i.e "UA-XXXXXXX-X"*

**GWO_helper.debug** *bool*  
If it's true, the script will write some logs in the browsers console and it will not send the tracking beacons	

**GWO_helper.init(*experiments*)**  *experimentDef*  
This is the initialization method. You pass an array with as many object as experiments you want to test    
        
**experimentDef**  
**id** Is the ID that GWO provide for this experiment (Step 9 in the GWO interface step by step guide)  
**name** This is a name you need to assign to the experiment.  
**track** Whether the experiment should start tracking automatically or you are going to start it manually  

Dealing with GWO interface to create the variations
---------------------------------------------------
This is a step by step guide to create the experiments in the GWO website

1.  Go to [Google Web Optimizer website](http://www.google.com/websiteoptimizer "Google Web Optimizer") 
2. 	Select the account that your are going to use
3. 	Create a new experiment
4. 	Select a *Multivariate Experiment*
5. 	Check the *I've completed the steps above and....* checkbox and click **Create**
6. 	Name your experiment
7. 	Add your url in the "Test page URL" and in the "Conversion page URL", none of these urls are going to be used so you can put whatever you want. Click "Continue"
8.	Select *You will install and validate the JavaScripts Tags* then click **Continue**
9.  In the Control and Tracking script text area, find the *experiment ID* and use it in the experiment definitions in the gwo_helper.js file
10. Create a file with the experiment sections definitions. You'll need to write one line for each section. Use the same name that you defined in the experiments definitions in the gwo_helper.js file It should read like this:

            <!-- utmx section name="Section1" -->
            <!-- utmx section name="Section2" -->

11. Click in the link **Test page not accessible? Try offline validation**, then select to browse the *Test Page* location and select the file you created in the step 10.
	It will return a few errors but it should detect the 2 sections you defined. Click **continue** in the window.
12. Click **Contiune**. Don't worry for all those errors.
13. Confirm clicking in **Contiune Anyway"**
14. Now you can create as many variations you want for each sections. Give them a name and you can leave the content empty. Then click on **Save and Continue**
15. Launch the experiment. You can launch the experiment with the debug property in gwo_helper set to true. This way your are not going to send any data until you change it to false in your production environment

Tracking the test and the goals
-------------------------------
The script will add to **GWO_helper.experiments** an object for each experiment you defined in the setup.
These objects have two methods to help you track your experiments and a few properties.

###experiment.start()###
This method start the tracking for this experiment. GWO will count this visit for the experiment statistics
This method is called automatically if the flag track is set to TRUE in the experiment definitions passed to the init method

Example: 
	 
	GWO_helper.experiments.experiment1.start();  

###experiment.goal()###
This method will tell GWO that this visit convert for this experiment.

Example:
	
	GWO_helper.experiments.experiment1.goal();

Example
-------
Try this [live example](http://blackjid.github.com/gwohelper/ "Example on GH Pages")

