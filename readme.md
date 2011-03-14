Google Web Optimizer Multi Experiment Helper
============================================
I wrote this helper to create multiple experiments with GWO in my startup www.voxound.com, I hope you can use it too.

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
