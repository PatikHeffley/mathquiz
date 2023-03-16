"use Strict";
var $ = function(id) {
    return document.getElementById(id);
}
const user = {
    name: "user 1",
    questions: 0,
    correct: 0,
}
var n = 0;
var hour = 0;
var daynight;
const qc = $("questionContainer");
const ac = $("answerContainer");
var week = ["Sunday", "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday", "Sunday"];
var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var mathType = "";
var time = 0;
function randomNum(max) {
    // Creating Random numbers
    n ++;
    var num =  Math.floor(Math.random() * max);
    var num2 =  Math.floor(Math.random() * max);
    var answer = document.createElement('div');
    if (mathType == "addition") {
        // Creating and Hiding the correct answer for later
        var num3 = num + num2;
        answer.innerHTML = "Answer " + n + ": " + num3;
        answer.value = num3;
        answer.classList.add("answers");
        qc.appendChild(answer);
        answer.style.display = "none";
        answer.id = "answer" + n;
        // Returns formatted question to ask the user
        return "Question " + n + ": " + num + " + " + num2;
    }
    else if (mathType == "subtraction") {
        // Creating and Hiding the correct answer for later
        var num3 = num - num2;
        answer.innerHTML = "Answer " + n + ": " + num3;
        answer.value = num3;
        answer.classList.add("answers");
        qc.appendChild(answer);
        answer.style.display = "none";
        answer.id = "answer" + n;
        // Returns formatted question to ask the user
        return "Question " + n + ": " + num + " - " + num2;
    }
    else if (mathType == "multiplication") {
        // Creating and Hiding the correct answer for later
        var num3 = num * num2;
        answer.innerHTML = "Answer " + n + ": " + num3;
        answer.value = num3;
        answer.classList.add("answers");
        qc.appendChild(answer);
        answer.style.display = "none";
        answer.id = "answer" + n;
        // Returns formatted question to ask the user
        return "Question " + n + ": " + num + " * " + num2;
    }
    else if (mathType == "division") {
        // Creating and Hiding the correct answer for later
        num = num2 * num;
        var num3 = num / num2;
        if (isNaN(num3)) {
            num3 = 0;
        }
        answer.innerHTML = "Answer " + n + ": " + num3;
        answer.value = num3;
        answer.classList.add("answers");
        qc.appendChild(answer);
        answer.style.display = "none";
        answer.id = "answer" + n;
        // Returns formatted question to ask the user
        return "Question " + n + ": " + num + " / " + num2;
    }
}
function CheckQuiz() {
    $("answerContainer").style.boxShadow = "0px 18px 18px 0px rgb(71, 156, 185)"
    $("questionContainer").style.boxShadow = "0px 18px 18px 0px rgb(71, 156, 185)"
    // Removes old timer and replaces it with a static one
    $("timer").style.display = "none";
    $("clock").innerHTML = "Completed in: " + time + " Seconds";
    clearInterval(timer);
    // scroll to top
    window.scrollTo(0, 0);
    // Calculates whether the question is right or wrong by comparing it to the invisible answer created earlier
    for (var i = 1; i <= user.questions; i++) {
        var guess = $("userAnswer" + i).value;
        var answer = $("answer" + i).value;
        // Wrong if no input
        if (guess == "") {
            $("userAnswer" + i).style.backgroundColor = "rgba(255, 51, 0, 0.5)"
            $("userAnswer" + i).style.borderBottom = "3px solid red";
        }
        // Correct if correct
        else if (guess == answer) {
            $("userAnswer" + i).style.backgroundColor = "rgb(144, 238, 144)"
            $("userAnswer" + i).style.borderBottom = "3px solid green";
            user.correct += 1
            
        }
        // Wrong if wrong
        else {
            $("userAnswer" + i).style.backgroundColor = "rgba(255, 51, 0, 0.5)"
            $("userAnswer" + i).style.borderBottom = "3px solid red";
        }
        // Revealing the answer
        $("answer" + i).style.display = "block";
    }
    // Reveals the End Screen
    ac.style.display = "grid";
    // Shows current time and date
    var date = new Date()
    if (date.getHours() > 12) {
       hour = date.getHours() - 12;
       daynight = " PM";
    }
    else {
        hour = date.getHours();
        daynight = " AM";
    }
    $("time").innerHTML = week[date.getUTCDay()] + "<br>" + month[date.getUTCMonth()] + ", " + date.getUTCDate() + ", " + date.getFullYear() + "<br> Completed at: <br>" + hour + " : "+ date.getUTCMinutes() + " : " + date.getUTCSeconds() + daynight;
    // Calculating the percent correct
    $("percentage").innerHTML = ((user.correct / user.questions) * 100).toFixed(1) + "% Correct";
    $("amountcorrect").innerHTML = user.correct + " Correct " +  (user.questions - user.correct) + " Incorrect";
    // If score above 70%, congratulate the user
    if (user.correct / user.questions >= .70) {
        $("testdata").innerHTML = "Congratulations, You Passed! <br>Scroll down to see individual questions <br>";
    }
    else {
        $("testdata").innerHTML = "Sorry, You Failed <br>Scroll down to see individual questions  <br>";
    }
    $("check").style.display = "none";
}
function reset() {
    // Resets all the variables and reveals the beginning screen to try again
    user.correct = 0;
    time = 0;
    $("startScreen").style.display = "grid";
    qc.style.display = "none";
    ac.style.display = "none";
    qc.removeChild(check);
}
function begin() {
    n = 0;
    // Checks if user filled all required information
    if ($("name").value != "" && $("questions").value != "" && $("questions").value < 1000 ) {
        mathType = $("questionTypes").value;
        qc.innerHTML = "";
        // Creates a timer
        var clock = document.createElement('div');
        clock.id = "timer";
        qc.appendChild(clock);
        timer = setInterval(tick, 1000);
        // Displays username
        user.name = $("name").value;
        user.questions = $("questions").value;
        $("startScreen").style.display = "none";
        qc.style.display = "grid";
        var userName = document.createElement('div');
        userName.innerHTML = user.name;
        userName.id = "name";
        qc.appendChild(userName);
        // Creating The Questions
        for (var i = 0; i < user.questions; i++) {
            var question = document.createElement('div');
            question.classList.add("questions");
            // If multiplication or division make the questions easier
            if (mathType == "multiplication" || mathType == "division") {
                question.innerHTML = randomNum(10);
            }
            else {
                question.innerHTML = randomNum(100);
            }
            // Creating input boxes
            qc.appendChild(question)
            var userAnswer = document.createElement('input');
            userAnswer.classList.add("inputs");
            userAnswer.id = "userAnswer" + n ;
            qc.appendChild(userAnswer);
        }
        // Formatting for the question section
        var br = document.createElement('span');
        br.innerHTML = "<br>"
        br.style.lineHeight = "20px";
        var br2 = document.createElement('span');
        br2.innerHTML = "<br>";
        br2.style.lineHeight = "20px";
        var check = document.createElement('button');
        check.id = "check";
        check.onclick = CheckQuiz;
        check.innerHTML = "Check Answers?";
        qc.appendChild(br);
        qc.appendChild(check);
        qc.appendChild(br2);
    }
    // If user inputs information incorrectly
    else if ($("name").value == "") {
        alert("Invalid Entry")
        $("name").focus()
    }
    else {
        alert("Invalid Entry")
        $("questions").focus()
    }
}
// Timer function counting 1 every second
var tick = function() {
    time -= 1 * -1
    $("timer").innerHTML = time;
}
window.onload = function() {
    $("start").onclick = begin;
}