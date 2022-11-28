//import workout tracker from seperate JS file onto main  javascript file project.js
    //script type must be "module"

import WorkoutTracker from "./workouttracker.js"


let app = document.getElementById("logContainer")

let wt = new WorkoutTracker(app);



// AJAX Inspiration Quote API

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://motivational-quotes1.p.rapidapi.com/motivation",
	"method": "POST",
	"headers": {
		"content-type": "application/json",
		"X-RapidAPI-Key": "7bce73b43dmsh61a524524da4ee8p1d9f18jsnacd1f5a505a9",
		"X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com"
	},
	"processData": false,
	"data": {
		"key1": "value",
		"key2": "value"
	}
};

$.ajax(settings).done(function (response) {
	const markup = `${response}`

            document.querySelector('ul').insertAdjacentHTML('beforeend', markup)
});


//using Get
/*
$.get("https://motivational-quotes1.p.rapidapi.com/motivation", 
    function (data) {
        console.log(data)
        const markup = `${response}`

            document.querySelector('ul').insertAdjacentHTML('beforeend', markup)
});
    }
)
*/

//Using FETCH
/*fetch("https://api.goprogram.ai/inspiration")
    .then ( res => {
        return res.json();
    })
    .then ( data => {
        console.log(data)
    })
*/

  

