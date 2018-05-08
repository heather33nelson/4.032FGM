// ----- Dropdown -----

// Make a dropdown by JSON
var select = document.getElementById("select");
for(var i=0; i<attitudesdata.length;i++){
    attitudesdata[i].id = i;
    var option = document.createElement("OPTION"),
    txt = document.createTextNode(attitudesdata[i].name);
    option.value = i;
    option.appendChild(txt);
    select.insertBefore(option, select.lastChild);

}


// ----- Shaking spead update base on country selected -----

var pastInterval; 
select.onchange = function(){
    clearInterval(pastInterval);
    var indexSelected = this.selectedIndex; 
    var supportRate = attitudesdata[indexSelected-1].prevalence;
//    console.log(supportRate);
    pastInterval = setInterval(exercise.run, 100*supportRate/10);
}


// ----- Update Picture -----

var exercise = {};
exercise.flag = 0; // 0 = left  1 = right
exercise.run = function() {
    exercise.img = document.getElementById('pic');
    exercise.chooseImage();
};


// ----- Switch pictures -----  
exercise.chooseImage = function() {
        if (exercise.flag === 1) {
            exercise.img.src = "../img/left.png"; // update pic
            exercise.flag = 0;// update flag
        } else {
            exercise.img.src = "../img/right.png";
            exercise.flag = 1;
        }
};