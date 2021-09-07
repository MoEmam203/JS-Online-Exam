window.addEventListener("load",function(){

    // to prevent back button in quiz page
    function disableBack() {
        window.history.forward();
    }
    setTimeout("disableBack()", 0);

    // to prevent refresh buttons F5 & Ctrl+R
    var ctrlKeyDown = false;

    $(document).ready(function(){    
        $(document).on("keydown", keydown);
        $(document).on("keyup", keyup);
    });

    function keydown(e) { 

        if ((e.which || e.keyCode) == 116 || ((e.which || e.keyCode) == 82 && ctrlKeyDown)) {
            // Pressing F5 or Ctrl+R
            e.preventDefault();
        } else if ((e.which || e.keyCode) == 17) {
            // Pressing  only Ctrl
            ctrlKeyDown = true;
        }
    };

    function keyup(e){
        // Key up Ctrl
        if ((e.which || e.keyCode) == 17) 
            ctrlKeyDown = false;
    };

    // create Quiz Object 
    var quiz = {
        QuizName:"Math",
        QuizTime:30,
        TotalDegree:100,
        Questions:[
            {
                header:"What is 2*5",
                answers:["2","5","10","15","20"],
                correctAnswer:2,
                degree:10
            },
            {
                header:"What is 18/3",
                answers:["2","5","6","4","3"],
                correctAnswer:2,
                degree:10
            },
            {
                header:"what is 25+25*2",
                answers:["100","75","50","60","40"],
                correctAnswer:1,
                degree:10
            },
            {
                header:"What is 14+28",
                answers:["40","42","44","41","38"],
                correctAnswer:1,
                degree:10
            },
            {
                header:"What is 5*3",
                answers:["12","15","10","13","8"],
                correctAnswer:1,
                degree:10
            },
            {
                header:"What is 10*10",
                answers:["20","50","1000","100","200"],
                correctAnswer:3,
                degree:10
            },
            {
                header:"What is 7*7",
                answers:["42","45","40","51","49"],
                correctAnswer:4,
                degree:10
            },
            {
                header:"What is 4*9",
                answers:["36", "32", "20", "24","26"],
                correctAnswer:0,
                degree:10
            },
            {
                header:"What is 9*9",
                answers:["82","85","81","87","84"],
                correctAnswer:2,
                degree:10
            },
            {
                header:"What is 20+55",
                answers:["75","73","80","65","70"],
                correctAnswer:0,
                degree:10
            },
        ]
    } 

    // get hearder elments of quiz 
    var us = $("#user")[0];
    var qName = $("#quizName")[0];
    var qTimer = $("#quizTimer")[0];
    var countTimer = $("#timer")[0];

    // get username , gender
    var username = localStorage.getItem("username");
    var gender = localStorage.getItem("gender");

    // get quiz div
    var mainwrraper = $(".mainwrapper")[0];
    
    // Change the background Color by gender
    switch(gender){
        case "male":
            mainwrraper.style.backgroundColor = "lightblue"
            break;
        case "female":
            mainwrraper.style.backgroundColor = "lightpink"
            break;
    }

    // change the headerr of quiz
    us.innerText = username;
    qName.innerText = quiz.QuizName;
    qTimer.innerText = quiz.QuizTime+" min";

    // set timer
    const startingminutes = 30;
    let time = startingminutes * 60;
    var interval = setInterval(updatecountdown, 1000);
    function updatecountdown() {
        const mint = Math.floor(time / 60);
        let sec = time % 60;
        sec = sec < 10 ? '0' + sec : sec;
        countTimer.innerHTML = mint+":"+sec;
        time--;

        // display degree when time finish
        if(mint == 00 && sec == 00){
            clearInterval(interval);
            alert("Time Up Click Ok to see your degree");
            displayDegree();
        }
    }
    var counter = 0

    var h =$("#header")[counter];
    var qnum = $("#Qnum")[0];

    // Display the first Question
    displayQuestion(counter);

    // Display Answers 
    var answers = $("[name='anss']");
    for(var i =0 ; i< answers.length; i++){
        answers[i].innerText = Q1.answers[i];
    }

    var nxtBtn = document.querySelectorAll("input[type='button']")[0];
    // register next btn 
    nxtBtn.addEventListener("click",function(e){
        var checkedAns = document.querySelectorAll("input[type='radio']:checked");
        if(checkedAns.length == 0){
            e.preventDefault();
        }else{
            calcDegree(Q1);
            counter++;
            if(counter == 9 ){
                this.value = "Finish";
                // register finish btn
                nxtBtn.addEventListener("click",function(){
                    // display score
                    displayDegree();
                });
            }
            displayQuestion(counter);
            // Display Answers 
            var answers = $("[name='anss']");
            for(var i =0 ; i< answers.length; i++){
                answers[i].innerText = Q1.answers[i];
            }
        }
    });

    // display Questions 
    function displayQuestion(c){
        Q1 = quiz.Questions[c];
        h.innerText = "Q : "+Q1.header;
        qnum.innerText = c+1;
    }

    // dispaly degree
    function displayDegree(){
        var degreeDiv = document.getElementById("degree");
        var degreeSpan = document.getElementById("userDegree");
        var questionDiv = document.getElementsByClassName("question")[0];

        degreeDiv.style.display ="block";
        questionDiv.style.display = "none";
        degreeSpan.innerText = userdegree;

        clearInterval(interval);

        nxtBtn.style.display = "none";
    }


}); // end of load

var userdegree = 0 ;

function calcDegree(que){
    // get answer 
    chossenAnswre = document.querySelectorAll("input[name='answer']:checked")[0];

    // check of crrectness of the answer 
    if(chossenAnswre.value == que.correctAnswer){
        userdegree += que.degree;
    }

    chossenAnswre.checked = false;
}
