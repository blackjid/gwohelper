Google Web Optimizer Multi Experiment Helper
============================================
I wrote this helper to create multiple experiments with GWO in my startup http://www.voxound.com, I hope you can use it too.

Description
===========
This helper allow you to load dynamically the control script and the tracking script provided by GWO, as well to push the tracking beacon for the start of the experiment and for the goal.

It also provides a way to make changes to the page based on the experiments variantions delivered by GWO. This can be done using CSS or javascript.

Setup
=====
1) Config the helper changing the values of the first to objects in the file.

`account: "UA-XXXXXXX-X"`

This is the google web optimizer accound ID your are going to use

`debug: bool`

If it's true, the script will write some logs in the browsers console and it will not send the tracking beacons, that way you can test in your development environment without sending data to your production GWO account

`experiments: {}`

This is an object that has as many object inside as you need to experiment. The following is the structure of each experiment:

	experiments.experiment1.id: "00000000" Is the id that GWO provide for this experiment
	experiments.experiment1.sections: [{name:'name1'},{name:'name2'}]  Is an array with the sections of the experiments and it's names

2) Insert the script into your code, you can use it at the begining or end of your code

	<script src="/gwo_helper.js"></script>


Testing the variations
=====================
You can add a hash to the url to force the variation for each experiment

`http://yourdomain.com/#experiment1=0-0-0&experiment2=0-0`
where the values are the variation of each section for that experiment

Dealing with GWO interface to create the variations
===================================================
This is a step by step guide to create the experiments in the GWO website

1) Go to http://www.google.com/websiteoptimizer
2) Select the account that your are going to use
3) Create a new experiment
4) Select a Multivariate Experiment
5) Check the "I've completed the steps above and...." checkbox and click "Create"
6) Name your experiment
7) Add your url in the "Test page URL" and in the "Conversion page URL", none of these urls are going to be used so you can put whatever you want. Click "Continue"
8) In the Control and Tracking script text area, find the experiment ID and use it in the experiment definitions in the gwo_helper.js file
9) Create a file with the experiment sections definitions. It should read like this:
	
	<!-- utmx section name="Section1" -->
	<!-- utmx section name="Section2" -->

You'll need to write one line for each section. Use the same name that you defined in the experiments definitions in the gwo_helper.js file
10) Click in the link "Test page not accessible? Try offline validation", then select to browse the Test Page location and select the file you created in the step 9.
It will return a few errors but it should detect the 2 sections you defined. Click continue in the window.
11) Click contiune. Don't worry for all those errors.
12) Confirm clicking in "Contiune Anyway"
13) Now you can create as many variations you want for each sections. Give them a name and you can leave the content empty. Then click on "Save and Continue"
14) Launch the experiment. You can launch the experiment with the debug property in gwo_helper set to true. This way your are not going to send any data until you change it to false in your production environment



