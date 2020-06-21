//DOM's elements variables
var fileRadioBtn;
var selectRadioBtn;
var fileField;
var divStart;
var divGoal;
var loadMaze;
var fileInput;
var playButton;

//Flag variables to control the program flow
var divStartSelected = false;
var divGoalSelected = false ;
var mazeLoaded = false;
var startSelected = false;
var goalSelected = false;

//Variables to move the images
var currentImg = null;
var currentStartTile = null;
var currentGoalTile = null;

//DOM's elements events
window.onload = function(){
    fileRadioBtn = document.getElementById("file-load");
    selectRadioBtn = document.getElementById("select-load");
    fileField = document.getElementById("load-file-field");
    selectField = document.getElementById("select-load-field");
    divStart = document.getElementById("start-div");
    divGoal = document.getElementById("goal-div");
    loadMaze = document.getElementById("load-maze-btn");
    fileInput = document.getElementById("file");
    playButton = document.getElementById("play-btn");

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
            startSelected = true;
            playButton.disabled = true;
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
            goalSelected = true;
            playButton.disabled = true;
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

    playButton.onclick = function(){
        playButton.disabled = true;
        var initialPosition = [parseInt((currentStartTile.id).charAt(4)), parseInt((currentStartTile.id).charAt(5))];
        finalPosition = [parseInt((currentGoalTile.id).charAt(4)), parseInt((currentGoalTile.id).charAt(5))];
        stack.push(initialPosition);
        positionCharacter = initialPosition;
        timer = setInterval(backTrackingAlgorithm, 500);
    }
}

//Variables to control the backtracking algorithm flow
var shownPositions = [];
var stack = [];
var positionCharacter;
var timer;
var finalPosition;

function backTrackingAlgorithm(){
    var currentPosition = stack[stack.length - 1];

    if(currentPosition.toString() == finalPosition.toString()){
        clearInterval(timer);
        alert("You've reached the goal");
        
        document.getElementById("tile" + positionCharacter[0] + positionCharacter[1]).style.background = "white";
        document.getElementById("tile" + positionCharacter[0] + positionCharacter[1]).style.backgroundSize = "contain";
        currentGoalTile.style.background = "white";
        currentGoalTile.style.backgroundSize = "contain";

        startSelected = false;
        goalSelected = false;
        shownPositions = [];
        stack = [];

        currentImg = null;
        currentStartTile = null;
        currentGoalTile = null;
    }
    else{
        var tile = document.getElementById("tile" + positionCharacter[0].toString() + positionCharacter[1].toString());
        tile.style.background = "white";
        tile.style.backgroundSize = "contain";

        var newTile = document.getElementById("tile" + currentPosition[0].toString() + currentPosition[1].toString());
        newTile.style.background = "url(" + divStart.childNodes[1].getAttribute("src") + ")";
        newTile.style.backgroundSize = "contain";

        var positions = getPositions(currentPosition);
        if(positions.length == 0){
            shownPositions.push(stack.pop());
        }
        else{
            shownPositions.push(currentPosition);
            stack.push(positions[0]);
        }
        positionCharacter = currentPosition;
    }
}

//Gets the child positions of the parent position
function getPositions(position){
    var positions = [];

    if((position[0] - 1 >= 0) && 
       (document.getElementById("tile" + (position[0] - 1).toString() + position[1].toString()).style.background != "black") &&
       (!shownPositions.some(x => x.toString() == [position[0] - 1, position[1]].toString()))
    ) positions.push([position[0] - 1, position[1]]);

    if((position[1] + 1 < 10) && 
       (document.getElementById("tile" + position[0].toString() + (position[1] + 1).toString()).style.background != "black") &&
       (!shownPositions.some(x => x.toString() == [position[0], position[1] + 1].toString()))
    ) positions.push([position[0], position[1] + 1]);

    if((position[0] + 1 < 10) && 
       (document.getElementById("tile" + (position[0] + 1).toString() + position[1].toString()).style.background != "black") &&
       (!shownPositions.some(x => x.toString() == [position[0] + 1, position[1]].toString()))
    ) positions.push([position[0] + 1, position[1]]);

    if((position[1] - 1 >= 0) && 
       (document.getElementById("tile" + position[0].toString() + (position[1] - 1).toString()).style.background != "black") &&
       (!shownPositions.some(x => x.toString() == [position[0], position[1] - 1].toString()))
    ) positions.push([position[0], position[1] - 1]);

    return positions;
}

//Check the txt file and loads the maze from it if it's supported
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

//Clear all the tiles
function clearMaze(){
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var tile = document.getElementById("tile"+i.toString()+j.toString());
            tile.style.background = "white";
            tile.style.backgroundSize = "contain";
        }
    }
}

//Function event if a tile of the maze is clicked
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
        if(startSelected && goalSelected){
            playButton.disabled = false;
        }
    }

    if(selectRadioBtn.checked){
        tile.style.background = "black";
    }
}