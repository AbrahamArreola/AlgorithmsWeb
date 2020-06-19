var fileRadioBtn;
var selectRadioBtn;
var fileField;
var divStart;
var divGoal;
var loadMaze;
var fileInput;

var divStartSelected = false;
var divGoalSelected = false ;
var mazeLoaded = false;

var currentImg = null;
var currentStartTile = null;
var currentGoalTile = null;

window.onload = function(){
    fileRadioBtn = document.getElementById("file-load");
    selectRadioBtn = document.getElementById("select-load");
    fileField = document.getElementById("load-file-field");
    selectField = document.getElementById("select-load-field");
    divStart = document.getElementById("start-div");
    divGoal = document.getElementById("goal-div");
    loadMaze = document.getElementById("load-maze-btn");
    fileInput = document.getElementById("file");

    selectRadioBtn.onclick = function(){
        fileField.disabled = true;
    }
    
    fileRadioBtn.onclick = function(){
        fileField.disabled = false;
    }

    divStart.onclick = function(){
        if(mazeLoaded){
            divStart.style.background = "#107EFE";
            if(divGoalSelected){
                divGoal.style.background = "white";
                divGoalSelected = !divGoalSelected;
            }
            currentImg = divStart.childNodes[1].getAttribute("src");
            divStartSelected = !divStartSelected;
        }
    }

    divGoal.onclick = function(){
        if(mazeLoaded){
            divGoal.style.background = "#107EFE";
            if(divStartSelected){
                divStart.style.background = "white";
                divStartSelected = !divStartSelected;
            }
            currentImg = divGoal.childNodes[1].getAttribute("src");
            divGoalSelected = !divGoalSelected;
        }
    }

    loadMaze.onclick = function(){
        mazeLoaded = true;
        fileField.disabled = true;
        selectField.disabled = true;
        selectRadioBtn.checked = false;
        loadMaze.disabled = true;
        alert("Maze loaded successfully");
    }

    fileInput.onchange = function(){
        //Pending
    }
}

function tileClicked(tile){
    if(currentImg != null && tile.style.background != "black"){
        if(divStartSelected){
            divStartSelected = false;
            divStart.style.background = "white";
            if(currentStartTile != null){
                currentStartTile.style.backgroundImage = "none";
            }
            currentStartTile = tile;
        }
        else{
            divGoalSelected = false;
            divGoal.style.background = "white";
            if(currentGoalTile != null){
                currentGoalTile.style.backgroundImage = "none";
            }
            currentGoalTile = tile;
        }
        tile.style.backgroundImage = "url(" + currentImg + ")";
        currentImg = null;
    }

    if(selectRadioBtn.checked){
        tile.style.background = "black";
    }
}