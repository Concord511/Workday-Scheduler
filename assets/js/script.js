// assign an empty object to hold tasks
let currentTasks = {};

// function that checks the current time against hour blocks and assigns them their corresponding color
const auditTime = function() {
    $(".description").each(function() {
        let currentHour = parseInt(moment().hour());
        let hourBlock = parseInt($(this).attr("id").replace("div", ""));
        if (currentHour > hourBlock) {
            $(this).addClass("past");
        }
        else if (currentHour === hourBlock) {
            $(this).addClass("present");
        }
        else if (currentHour < hourBlock) {
            $(this).addClass("future");
        }
    });
    let currentDate = moment().format("dddd, MMM Do");
    $("#currentDay").text(currentDate);
}

// function that savesTasks
const saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(currentTasks));
}

// function that loads the current tasks and assign their text values to their corresponding IDs.
const loadTasks = function() {
    currentTasks = JSON.parse(localStorage.getItem("tasks"));
    if (!currentTasks) {
        currentTasks = {
            9: "",
            10: "",
            11: "",
            12: "",
            13: "",
            14: "",
            15: "",
            16: "",
            17: ""
        };
    }
    else {
        $.each(currentTasks, function(id, text) {
            $("#div" + id).text(text);
        });
    }
    auditTime();
}

// on-click event for editing hourly tasks
$(".time-block").on("click", "div", function() {
    let id = $(this).attr("id").replace("row", "");
    let divEl = $("#" + id);
    let divClasses = divEl.attr("class");
    let divText = divEl.text();
    let textInput = $("<textarea>").addClass(divClasses).val(divText);
    textInput.attr("id", id);
    divEl.replaceWith(textInput);
    textInput.trigger("focus");
});

// on-click event for saving hourly tasks
$(".time-block").on("click", ".saveBtn", function() {
    let id = $(this).attr("id").replace("btn", "");
    let textEl = $("#div" + id);
    let divText = textEl.val().trim();
    if (!divText) {
        divText = textEl.text().trim();
    };
    let divEl = $("<div>")
        .attr("id", "div" + id)
        .addClass(textEl.attr("class"))
        .text(divText);
    textEl.replaceWith(divEl);
    currentTasks[id] = divText;
    saveTasks();
});

// assign hour blocks colors based on past, present, future of current time
auditTime();

// set an interval to call auditTime() every minute
setInterval(function() {
    auditTime();
}, 60000);

// call the function to load tasks from localStorage
loadTasks();