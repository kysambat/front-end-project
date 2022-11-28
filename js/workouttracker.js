//exporting WorkoutTracker from JS file onto main project.js

export default class WorkoutTracker {
    constructor(root) {
        this.root = root;
        this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());
        this.entries = [];

 //Loading into local storage
        this.loadEntries();
        this.updateView();

//Add Event Listener into add Entry button
        this.root.querySelector(".logger__add").addEventListener("click", () => {
            //Date logging for date for Add Entry Button
            let date = new Date();
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, "0")
            let day = date.getDay().toString().padStart(2, "0");

            this.addEntry({
                date: `${year}-${month}-${day}`,
                workout: "walking",
                duration: 30,
                weight: "",
                comments: "",
            })
        })
    }

// moved table template onto JS to manipulate adding row when "Add Entry +" is clicked
static html() {
        return `        
        <table class="logger">
        <thead>
            <th>Date</th>
            <th>Workout</th>
            <th>Duration</th>
            <th>Weight</th>
            <th>Comments</th>
            <th>Remove</th>
        </thead>
        <tbody class="logger__entries">
        </tbody>
        <tbody>
            <tr class="logger__row logger__row--add">
                <td colspan="4">
                    <button class="logger__add">Add Entry &plus;</button>
                </td>
            </tr>
        </tbody>
    </table> 
        `;
    }

//declaring staticRowHtml for adding newRow from HTML template
static rowHtml() {
    return `        
    <tr class="logger__row">
    <td>
        <input type="date" class="logger__date">
    </td>
    <td> 
        <select class="logger__workout">
            <option value="running">Went for a run!</option>
            <option value="jogging">Went for a Jog!</option>
            <option value="walking">Relaxing stroll!</option>
            <option value="swimming">Went for a swim!</option>
            <option value="bicycling">Went for a bike ride!</option>
            <option value="pullDay">Back and bi's for the guys!</option>
            <option value="pushDay">Chest and tri's for the highs!</option>
            <option value="squatDay">Squats for days + abs!</option>
            <option value="deadliftDay">Deadlift or death + abs!</option>
            <option value="shoulderDay">Shoulders like boulders!</option>
            <option value="restDay">Mandatory Rest Day!</option>
        </select>
    </td>
    <td>
        <input type="number" class="logger__duration">
        <span class="logger__text">minutes</span>
    </td>
    <td>
    <input type="number" class="logger__weight">
    <span class="logger__text">lbs.</span>
    </td>
    <td>
  <input type="text" class="logger__comments">
  <span class="logger__text"></span>
    </td>
    <td>
        <button type="button" class="logger__button logger__delete" >&times;</button>
    </td>
</tr>
    `;
}

//Load Entries Storing data through JSON
loadEntries() {
    this.entries = JSON.parse(localStorage.getItem("workout-tracker-entries") || "[]");

}

//Save entries by storing data
saveEntries() {
    localStorage.setItem("workout-tracker-entries", JSON.stringify(this.entries));
}

//update view function
updateView() {
    let tableBody = this.root.querySelector(".logger__entries")
    let addRow = data => {
        let template = document.createElement("template")
        let row = null;

        template.innerHTML = WorkoutTracker.rowHtml();
        row = template.content.firstElementChild;

        row.querySelector(".logger__date").value = data.date
        row.querySelector(".logger__workout").value = data.workout
        row.querySelector(".logger__duration").value = data.duration
        row.querySelector(".logger__weight").value = data.weight
        row.querySelector(".logger__comments").value = data.comments

//EventListener so date workout and duration saves when adding Entry
            //**When you have time turn this into a helper function**
        row.querySelector(".logger__date").addEventListener ("change", ({target}) => {
            data.date = target.value;
            this.saveEntries();
        })

        row.querySelector(".logger__workout").addEventListener ("change", ({target}) => {
            data.workout = target.value;
            this.saveEntries();
        })

        row.querySelector(".logger__duration").addEventListener ("change", ({target}) => {
            data.duration = target.value;
            this.saveEntries();
        })

        row.querySelector(".logger__weight").addEventListener ("change", ({target}) => {
            data.weight = target.value;
            this.saveEntries();
        })

        row.querySelector(".logger__comments").addEventListener ("change", ({target}) => {
            data.comments = target.value;
            this.saveEntries();
        })

        
//EventListener for deleting the row
        row.querySelector(".logger__delete").addEventListener("click", () => {
            this.deleteEntry(data);
        })

        tableBody.appendChild(row);
    };

    tableBody.querySelectorAll(".logger__row").forEach(row => {
        row.remove();
    });
    
    this.entries.forEach(data => addRow(data))
}

//creating function for addEntry Event Listener
    addEntry(data) {
        this.entries.push(data);
        this.saveEntries();
        this.updateView()
    }

//creating function for Delete row Event Listener

    deleteEntry (dataToDelete) {
        this.entries = this.entries.filter(data => data !==dataToDelete)
        this.saveEntries();
        this.updateView();
    }

}