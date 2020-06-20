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

    fileInput.onclick = function(){
        this.value = null;
    }

    fileInput.onchange = function(){
        clearMaze();

        var reader = new FileReader();

        reader.onload = function(){
            var content = reader.result;
            loadMazeFromFile(content);
        }

        if(this.value != null) reader.readAsText(fileInput.files[0]);
    }
}

function loadMazeFromFile(content){
    if(content == ""){
        alert("File empty");
        return;
    }

    var rows = content.split(/\r?\n/);
    var columns;

    for(var i = 0; i < rows.length; i++){
        columns = rows[i].split(",");
        if(columns.length > 10 || i > 9){
            alert("Unsupported file sizes!");
            return;
        }
        for(var j = 0; j < columns.length; j++){
            if(columns[j] != "0" && columns[j] != "1"){
                alert("Unsupported file data!");
                return;
            }
        }
    }

    for(var i = 0; i < rows.length; i++){
        columns = rows[i].split(",");
        for(var j = 0; j < columns.length; j++){
            if(columns[j] == "1"){
                document.getElementById("tile"+i.toString()+j.toString()).style.background = "black";
            }
        }
    }
}

function clearMaze(){
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var tile = document.getElementById("tile"+i.toString()+j.toString());
            tile.style.background = "white";
            tile.style.backgroundSize = "contain";
        }
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