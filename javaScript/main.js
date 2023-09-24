$(() => {
/* code for index.html page starts here*/
/* jQuery constants defined for submit button and the DOM locations are defined, then hidden, where the div for the confirmation message that will pop up when submit is clicked.  txtNameVal is declared and will later be used to insert the users name into the appropriate messages. */
const $alertPrimary = $('.alert-primary');
const $alertDanger = $('.alert-danger');
const $formReplacePhoto = $('#formReplacePhoto')
const $submitBtn = $('#submitBtn');
const $register = $('#register');
const $txtName = $('#txtName');
const $greeting = $('.greeting');
let txtNameVal;
$alertPrimary.hide();
$alertDanger.hide();
$formReplacePhoto.hide();
/* On submit for form. The HTML5 "required" atrtribute was used for name and email, and this checks for any value in the name field and a proper email format in the email field. Then I use an if statement to see if the "unsubscribe" checkbox is checked(if length value has length>0 it must be checked), and if so the user will need to confirm or cancel. window.scroll is used to bring the box into view to state this and give 2 options. If the unsubscribe checkbox is not checked the thank you message will show for 4 seconds. This box, and the entire form, disappears and is replaced with a message letting them know how to use site. Window.scroll is used to bring this message to the viewport. The variable txtNameVal is set equal to the text entered by the user in the name text box and a greeting with their name is inserted into the message that will be displayed to them if they subscribe, or if they click the unsubscribe box they will end up getting 2 messages, each of which will greet them by name. */ 
$('form').on('submit', function(e) {
    e.preventDefault();
    txtNameVal = $txtName.val();
    $greeting.text(`Hi ${txtNameVal}-`);
    if($('#unsubscribe:checked').length > 0) {
        $alertDanger.show();
        $submitBtn.hide();
        $register.hide();
        window.scroll({
            top: 1550,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        $alertPrimary.show();
        $submitBtn.hide();
        $register.hide();
        setTimeout(function() {
            hideFormSubscribed();
        }, 4000);
    }
});
/* if user has checked unsubscribe box, and confirms this by again clicking an unsubscribe button, then a message will show for 4 seconds, thanking them by name & confirming cancellation, then this box, and the entire form, disappears and is replaced with a message, which also thanks them by name, letting them know they can still use the site and how to do it. (scrollIntoView is used to bring this message to the viewport with the additional instruction of {block:'end'} which brings the inferior part of the division in line with the lowest part of the viewport- of note window.scroll was not used because due to the length of the msg a part of the msg was hidden by the navBar). */
$('.unsubscribe').on('click', function(e) {
    $alertDanger.text(`Thank you ${txtNameVal}- your subscription has been cancelled. Feel free to enjoy the site!`);
    setTimeout(function() {
        $alertDanger.hide();
        $('#formHead').hide();
        $formReplacePhoto.show();
    $('#registrationHead').text(`Thank you for visiting ${txtNameVal}- your subscription has been cancelled. Please feel free to visit the site without registering. To do so, go to the NavBar at the top of the page and click on "About the park" to learn more about Yellowstone, or click on "Take the quiz" to take a quiz about the park. If you change your mind and want to subscribe just refresh the page in your browser. Enjoy!`)
    document.querySelector('#registrationHead').scrollIntoView({block:'end'});
    }, 4000);
});
/* if user has checked unsubscribe box, and indicates this was a mistake by clicking on subscribe button, then a message will show for 4 seconds, thanking them by name & confirming subscription, then this box, and the entire form, disappears and is replaced with a message also thanking them by name & letting them know how to use site. (scrollIntoView is used to bring this message to the viewport with the additional instruction of {block:'end'} in the hideFormSubscribed fxn).*/
$('.subscribe').on('click', function(e) {
    $alertDanger.hide();
    $alertPrimary.show();
    setTimeout(function() {
        hideFormSubscribed();
    }, 4000);
});
/* hideFormSubscribed is the fxn to hide form and give user more info about site when subscription is submitted directly, or after initially checking unsubscribe but changing to subscribe when asked. This message thanks them by name in addition to giving them info about the site. (scrollIntoView is used to bring this message to the viewport with the additional instruction of {block:'end'}).*/
function hideFormSubscribed() {
    $('#formHead').hide();
    $formReplacePhoto.show();
    $('#registrationHead').text(`Thank you ${txtNameVal}- your registration information has been submitted. Please go to the NavBar at the top of the page and click on "About the park" to learn more about Yellowstone, or click on "Take the quiz" to take a quiz about the park. Enjoy!`)
    document.querySelector('#registrationHead').scrollIntoView({block:'end'});
}
/* code for index.html page ends here */

// ******* Here starts code for the "About the park" page: ********
/* Start by hiding the extra text (all text given classes below) and photos which are given the associated class as well. The const $readMore is also defined and will be used for the event listener for when the user desired to read more. */ 
const $readMore = $('.readMore');
$('.polHistAdd').hide();
$('.geoHistAdd').hide();
$('.geoFeaturesAdd').hide();
$('.wildlifeAdd').hide();
$('.myExperienceAdd').hide();
/* On click of a "Read more" aTag the division above the "Read more" tag will expand with extra paragraphs and at the same time additional photos will be toggled into place so that it they fill the empty space created by expanding paragraphs, based on the target of which specific read more aTag is clicked. SlideToggle('slow') is used to render an asthetically pleasing transformation as the additional info is added or subtracted, which depends on its current state. */
$readMore.on('click', function(e) {
    e.preventDefault();
    $(`.${e.target.dataset.id}`).slideToggle('slow');
    if(e.target.textContent === "Read more") {
        e.target.textContent = "Read less";
    } else {
        e.target.textContent = "Read more";
    }
});
    /* Here ends code for "About the park" page and starts code for the quiz page */
   
   /* Code for quiz section starts here */
    /* Quiz section variables include questionBank array which will hold all possible questions to ask and randomQuestions array which will be 10 randomized questions iterated from questionBank by function randomizeQuestions. TimerId set to null and will later be used to clear timer. Variable secsRemaining is for the timer display in the DOM.*/
   const questionBank = [];
   const randomQuestions = [];
   let timerId = null;
   let secsRemaining;
   /* Also $variables are set for event listeners and DOM manipulation locations. */
   const $quizStart = $('.quizStart');
   const $qAtt = $('#qAtt');
   const $qAC = $('#qAC');
   const $qAI = $('#qAI');
   const $qTO = $('#qTO');
   const $placeholderQNum = $('.placeholderQNum');
   const $placeholderQ = $('#placeholderQ');
   const $timeLeft = $('#timeLeft');
   const $qAdvance = $('#qAdvance');
   const $ansA = $('#ansA');
   const $ansB = $('#ansB');
   const $ansC = $('#ansC');
   const $ansD = $('#ansD');
   const $ansToHide = $('.ansToHide');
   const $qAndAnswerContainer = $('#qAndAnswerContainer');
   const $quizPhoto = $('#quizPhoto')
   /* variables set for counters and the variables trueAnswer and clickedAns are declared to allow comparison of clicked answer and the true answer which is provided in the question array. The 3 image variables are for adding an image and an image caption to be stored when question loads and added to DOM once answer is chosen by user. */
   let correctAns = 0;
   let inCorrectAns = 0;
   let timeOuts = 0;
   let questNum = 0;
   let trueAnswer = '';
   let clickedAns = '';
   let imgToAdd ='';
   let imgCaptionToAdd = '';
   let imgHTML = ``;
   /* button $qAdvance for next question and div with answers to questions hidden here until user starts quiz. */
   $qAdvance.hide();
   $ansToHide.hide();
   // event listener to start quiz when button is clicked. 1st the placeholder photo associated with start quiz is inserted, then the div with questions and answers is shown, the counters are reset to "0", randomQuestions.length set to "0" to clear array. A score of "0" is inserted into each counter display in the DOM. Then random questions array will be filled with randomized questions using randomizeQuestions fxn, then the 1st random question will be inserted into the DOM along with it's possible answers, using insertQuestion fxn.  Window.scroll is used to bring the question fully into view for small screen widths. At larger widths it has no effect. The Start Quiz button is hidden once quiz has started.
   $quizStart.on('click', function() {
       imgHTML = `<img class="photo" src="../images/capstoneAlpineLake.jpeg">`;
       $quizPhoto.html(imgHTML); 
       $ansToHide.show();
       correctAns = 0;
       inCorrectAns = 0;
       timeOuts = 0;
       questNum = 0;
       randomQuestions.length = 0;
       $qAC.text(correctAns);
       $qAI.text(inCorrectAns);
       $qAtt.text(questNum);
       $qTO.text(timeOuts);
       randomizeQuestions();
       insertQuestion();
       window.scroll({
            top: 450,
            left: 0,
            behavior: 'smooth'
        });
       $quizStart.hide();
   });
   function randomizeQuestions() {
       // questionNumberArray is initially an empty set (sets won't allow duplicate numbers). To obtain 10 random numbers (with a minimum value of 0, and a mximum value of a number equal to one less than the number of questions in questionBank a while loop is used and 10 random numbers are inserted into the set.
       let questionNumberArray = new Set();
           while (questionNumberArray.size < 10) {
               let x = Math.floor(Math.random() * (questionBank.length));
               questionNumberArray.add(x);
           }
       // The questionNumberArray is changed from a set to an array of 10 random numbers between 0 and the number of questions in questionBank
       questionNumberArray = [...questionNumberArray];
       // The for loop will loop through each of the random numbers in questionNumberArray and push a question with the randomized index from questionBank onto the randomQuestions array
       for (let idx of questionNumberArray) {
           randomQuestions.push(questionBank[idx]);
       }
   }
   /* In fxn insertQuestion, the questNum counter is used to determine which questions and answers are inserted into variables and then into the DOM. The image and image caption associated with the correct answer are stored in variables. These variables will be made into HTML using quizPhotoConstructor then after user picks an answer (or the question times out) it will be added to the DOM. The questNum counter is then advanced by one.  startTimer fxn is also called.*/
   function insertQuestion() {
       $placeholderQ.css({'color': 'black', 'font-size':'16px'});
       let questionToAdd = randomQuestions[questNum].questionText;
       let ansAToAdd = randomQuestions[questNum].answers[0];
       let ansBToAdd = randomQuestions[questNum].answers[1];
       let ansCToAdd = randomQuestions[questNum].answers[2];
       let ansDToAdd = randomQuestions[questNum].answers[3];
       imgToAdd = randomQuestions[questNum].img;
       imgCaptionToAdd = randomQuestions[questNum].imgCaption;
       questNum++;
       startTimer();
       $placeholderQ.text(questionToAdd);
       $ansA.text(ansAToAdd);
       $ansB.text(ansBToAdd);
       $ansC.text(ansCToAdd);
       $ansD.text(ansDToAdd);
       /* The quizPhotoConstructor takes the desired image and image caption from the question and using the HTML template string stores it in the variable imgHTML so that a representation of the correct answer can be plugged in (to the right of the question) once an answer is chosen or the question times out. */
        function quizPhotoConstructor(img, imgCaption) {
            imgHTML = `<figure><img class="photo" src="${img}" alt="${imgCaption}" /><br><figcaption>${imgCaption}</figcaption></figure>`;
        }
        quizPhotoConstructor(imgToAdd, imgCaptionToAdd);
    }
   /*The startTimer fxn uses setInterval to run a 20 second timer. When secsRemaining reaches 0 the timer and timerId are cleared and the questionTimeOut fxn is initiated. The interval is set to countdown from 20 to 0 over a 20 second clock and keeps the time remaining counting down in the DOM. If a user clicks on an answer the timer is stopped in the function associated with that event listenter. */
   function startTimer() {
       secsRemaining = 20;
       timerId = setInterval(function(){
           if(secsRemaining === 0) {
               clearInterval(timerId);
               timerId = null;
               questionTimeOut();
           } else {
               secsRemaining--;
               $timeLeft.text(`${secsRemaining} seconds`);
           }
       }, 1000);
   }
   /* In fxn questionTimeOut, the appropriate counters are advanced and shown in the DOM. The Next Question button appears and a msg is displayed for user telling them they timed out. Also, the image and image caption representing the right answer are inserted to the right of this message. In the case that it is the last (10th) question that times out, then  the quizOver fxn is called*/
   function questionTimeOut() {
       $timeLeft.text(`0 seconds`);
       $qAtt.text(questNum);
       $qAdvance.show();
       $ansToHide.hide();
       $placeholderQNum.hide();
       $placeholderQ.text('Sorry, you have timed out. Remember, you only have 20 seconds to answer each question. Click on the button below when you are ready for the next question. On smaller screens, scroll to bottom to see answer.').css({'color': 'sienna', 'font-size':'24px'});
        $quizPhoto.html(imgHTML);
       timeOuts++;
       $qTO.text(timeOuts);
       if(questNum >= 10) {
           quizOver();
       }
   }
   /* The qAndAnswerContainer is the Dom element acting as the event listener for an answer choice from user. event.target is used to determine users choice, which is then compared with true answer to see if correct answer is chosen or not. The non button areas are excluded from being wrong answers and instead disregarded using the if statement (!$(event.target).hasClass("btn").
   If a button is clicked the id of that button is inserted into clickedAns variable.  The true answer is inserted into true answer variable and then fxn answerChosen is called.
   */
   $qAndAnswerContainer.on('click', function(event) {
       event.preventDefault();
       if(!$(event.target).hasClass("btn")) {
           return;
       }
       clearInterval(timerId);
       timerId = null;
       clickedAns = event.target.getAttribute('id');
       trueAnswer = `a${randomQuestions[questNum-1].correct}`;
       answerChosen();
   });
   /* fxn answerChosen shows the next question button and hides all the answers from the previous question. Window.scroll is used to position the button, as well as the correct answer and accompanying photo into view. I want the clock to reset to 20 when a choice is made, but not when the question times out so the 20 is reset in timer both in fxn answerChosen and in the event handler for when next question is clicked on. Then based on whether or not trueAnswer === clickedAns the question is replaced with a statment letting user know if they were right or wrong and the correctAns counter or incorrectAns counter is augmented as appropriate and the new values are added to the counter displays for the user. Also, the image and image caption representing the right answer are inserted to the right of this message. At the end an if statement tests to see if there have been 10 questions. If not nothing happens until the "Next Question" button is clicked. Once 10 questions have been answered the quiz over fxn is called. */
   function answerChosen() {
       $qAdvance.show();
       $ansToHide.hide();
       $placeholderQNum.hide();
       secsRemaining = 20;
       $timeLeft.text(`${secsRemaining} seconds`);
       $quizPhoto.html(imgHTML);
       window.scroll({
        top: 1050,
        left: 0,
        behavior: 'smooth'
        });
       if(trueAnswer === clickedAns) {
           $placeholderQ.text('Congratulations! Your answer is correct! Click on the button below when you are ready for the next question.').css({'color': 'green', 'font-size':'24px'});
           correctAns++;
           $qAtt.text(questNum);
           $qAC.text(correctAns);
       } else {
           $placeholderQ.text('Sorry, your answer is incorrect! Click on the button below when you are ready for the next question.').css({'color': 'red', 'font-size':'24px'});
           inCorrectAns++;
           $qAtt.text(questNum);
           $qAI.text(inCorrectAns);
       }
       if(questNum >= 10) {
           quizOver();
       }
   }
   /*The $qAdvance event listener is on the Next question button. When clicked it resets secsRemaining to 20 and inserts this value into DOM, hides the NextQuestion Btn, shows the answers and replaces the question and answer DOM with the next question and answer set using the fxn insertQuestion. window.scroll is used to make sure questions is back in view */
   $qAdvance.on('click', function() {
       secsRemaining = 20;
       $timeLeft.text(`${secsRemaining} seconds`);
       $ansToHide.show();
       $placeholderQNum.show();
       insertQuestion();
       window.scroll({
            top: 450,
            left: 0,
            behavior: 'smooth'
        });
       $qAdvance.hide();
   });
   /* fxn quizOver hides NextQuestion Btn, replaces the text inside the explanatory paragraph to take out instructions to click on next button with a msg that the quiz is over and asking them to wait 5 seconds - This time delay is so that they can see how they did on the last question, which is also included during the 5 second delay. Then a setTimeoutFxn, is used to insert a new paragraph after the 5 seconds. To determine what the message is, first a switch statement is used to correlate their number correct score with a descriptor. Then the $placeholderQ paragraph text is changed to tell them the quiz is over, gives the number of correct answers and tells their status and lets them know to click the Start Quiz button to play again (The Start Quiz button is also changed to a show status. */
   function quizOver() {
       $qAdvance.hide();
       let endText = $placeholderQ.text();
       endText = endText.replace("Click on the button below when you are ready for the next question.", " ... The quiz is now over. Please wait 5 seconds while the computer analyzes your results.");
       $placeholderQ.text(endText);
       setTimeout(function() {
           let status;
           switch(correctAns) {
               case 9:
               case 10:
                   status = "Genius!!! 🎓";
                   break;
               case 7:
               case 8:
                   status = "Afficionado! 🥳";
                   break;
               case 5:
               case 6:
                   status = "Fan. 😛";
                   break;
               default:
                   status = "Rookie. 🥺";
           }
           $quizStart.show();
           $placeholderQ.css({'color': 'blue', 'font-size':'24px'});
           $placeholderQ.text(`The quiz is over. You had ${correctAns} correct answer${correctAns !== 1 ? 's' : ''} out of 10. Consider yourself a National Park ${status} Click on the Start Quiz button above to take the quiz again.`).css({'color': 'blue', 'font-size':'24px'})}, 5000);
       }        
        // Using class Constructors, an array of question objects are created. Each object will contain one question, an array of four possible answers, and the index number of the correct answer, followed by an image URL and an a caption that are associated with the correct answer for that question.
   class Question {
       constructor(q, answers, correct, img, imgCaption) {
           this.questionText = q,
           this.answers = answers,
           this.correct = correct,
           this.img = img,
           this.imgCaption = imgCaption
       }
   }
   // There are currently 20 questions below, which are constructed into objects using new Question and pushed into the array questionBank. Additional questions can be added as desired.
   let q0 = new Question('The geographic borders of Yellowstone National Park extend into three states. Which state does NOT include a part of Yellowstone National Park?', ['Idaho', 'Colorado', 'Wyoming', 'Montana'], 1, '../images/capstoneYSMap.jpg', 'Yellowstone National Park is primarily in Wyoming with small parts of the park extending into Idaho and Montana');
   questionBank.push(q0);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q1 = new Question('Which United States President signed into law the act which established Yellowstone as the first national park?', ['Ulysses Grant', 'Theodore Roosevelt', 'Franklin Roosevelt', 'Woodrow Wilson'], 0, '../images/capstoneGrantBooks.jpg', 'Ulysses S Grant signed the legislation founding Yellowstone as our first national park');
   questionBank.push(q1);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q2 = new Question('Which Yellowstone geyser is the world\'s largest active geyser?', ['Old Faithful', 'Beehive Geyser', 'Castle Geyser', 'Steamboat Geyser'], 3, '../images/capstoneSteamboatGeyser.jpg', 'Steamboat Geyser is the world\'s largest geyser');
   questionBank.push(q2);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q3 = new Question('Which of the following national parks is geographically closest to Yellowstone National Park?', ['Yosemite', 'Bryce Canyon', 'Grand Canyon', 'Grand Teton'], 3, '../images/capstoneSummerLake.jpeg', 'Grand Teton National Park is the closest to Yellowstone');
   questionBank.push(q3);
/* Photo above from https://lightbox.tlm.cloud/*/ 
   let q4 = new Question('Which of the following animals is NOT native to Yellowstone National Park?', ['Three-toed sloth', 'Painted turtle', 'Pronghorn', 'Grizzly bear'], 0, '../images/capstoneSloth.jpg', 'The three-toed sloth is NOT native to North America');
   questionBank.push(q4);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q5 = new Question('Which mammal was virtually eliminated from Yellowstone National Park by hunters, and then was reintroduced with great success beginning in 1995?', ['Red Fox', 'Grizzly bear', 'Gray wolf', 'Three-toed sloth'], 2,  '../images/capstoneWolf.jpg', 'Wolves were successfully reintroduced to Yellowstone in 1995');
   questionBank.push(q5);
/* Photo above from https://lightbox.tlm.cloud/*/ 
   let q6 = new Question('In 1988 several major fires combined to burn a significant area of Yellowstone National Park. Approximately how many acres of the park burned that year?', ['42,000', '233,000', '480,000', '793,000'], 3, '../images/capstoneFire2.jpg', 'The Great Fire of 1988 burned around 793,000 acres in Yellowstone');
   questionBank.push(q6);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q7 = new Question('The number of annual visitors to the park has been gradually increasing over time. Approximately how many people visited Yellowstone National Park in 2016?', ['1.5 million', '2.8 million', '4.2 million', '6.5 million'], 2, '../images/capstoneOldFaithfulInn.jpg', 'Approximately 4.2 million people vistied Yellowstone in 2016');
   questionBank.push(q7);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q8 = new Question('As of August 2015, how many humans are known to have been killed due to interactions with bears in the more than 140 years of the park\'s existence?', ['8', '22', '58', '133'], 0, '../images/capstoneGrizzly.jpg', '8 people are known to have been killed by bears in Yellowstone as of 2015');
   questionBank.push(q8);
/* Photo above from https://lightbox.tlm.cloud/*/ 
   let q9 = new Question('Which of the following Native American tribes is NOT known to have inhabited the region containing present day Yellowstone National Park, prior to exploration by Europeans?', ['Nez Perce', 'Cherokee', 'Crow', 'Shoshone'], 1, '../images/capstoneCherokeeMap.jpg', 'Cherokee originally lived in the Southeast US and were forced westward to Oklahoma on the \"trail of tears\". The Cherokee people never lived as a group in Yellowstone');
   questionBank.push(q9);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q10 = new Question('In what year did the first explorers of European descent explore Yellowstone as part of the Lewis and Clark Expedition?', ['1799', '1806', '1821', '1899'], 1, '../images/capstoneLewisAndClark.jpg', 'The Lewis and Clark Expedition reached Yellowstone in 1806');
   questionBank.push(q10);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q11 = new Question('Which US President signed legislation in 1916 creating the National Park Service?', ['Grover Cleveland', 'Theodore Roosevelt', 'William Howard Taft', 'Woodrow Wilson'], 3, '../images/capstoneWilson.jpg', 'Woodrow Wilson signed the bill establishing the NPS');
   questionBank.push(q11);
/* Photo above from https://lightbox.tlm.cloud/*/ 
   let q12 = new Question('Three giant volcanic explosions approximately 600,000 - 800,000 years apart caused the crust in Yellowstone to be relatively thin. How long ago was the most recent massive volcanic eruption?', ['40,000 years ago', '140,000 years ago', '640,000 years ago', '4,000,000 years ago'], 2, '../images/capstoneCaldera.jpg', 'The most recent of the 3 major eruptions was 640,000 years ago');
   questionBank.push(q12);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q13 = new Question('Eagle Peak is the highest peak in Yellowstone National Park. How many feet above sea level is the top of Eagle Peak?', ['11,358 feet', '12,973 feet', '13,540 feet', '14,888 feet'], 0, '../images/capstoneSummerMtn.jpeg', 'The top of Eagle Peak is at an altitude of 11,358 feet');
   questionBank.push(q13);
/* Photo above from https://lightbox.tlm.cloud/*/ 
   let q14 = new Question('Old Faithful Geyser is perhaps the most famous geyser in the world, largely because it erupts so regularly. What is the approximate frequency of eruptions of Old Faithful?', ['Every hour', 'Every 90 minutes', 'Every 3 hours', 'Once a day'], 1, '../images/capstoneGeyser.jpg', 'Old Faithful erupts an average of every 91 minutes');
   questionBank.push(q14);
/* Photo above from https://lightbox.tlm.cloud/*/ 
   let q15 = new Question('Approximately what percent of the world\'s geysers are within the borders of Yellowstone National Park?', ['10%', '33%', '50%', '80%'], 2, '../images/capstoneGeyser2.jpg', 'A little over 50% of the world\'s geysers are in Yellowstone');
   questionBank.push(q15);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q16 = new Question('All of the following raptors (birds that prey on other animals) call Yellowstone home EXCEPT?', ['Osprey', 'Bald Eagle', 'Peregrine Falcoln', 'Red Tail Hawk'], 3, '../images/capstoneImgHawkRectangle.jpg', 'Hawks like this one are not native to Yellowstone');
   questionBank.push(q16);
/* Photo above from https://lightbox.tlm.cloud/*/ 
   let q17 = new Question('Which type of tree is the dominant tree in Yellowstone?', ['Lodgepole Pines', 'Cedars', 'Douglas Firs', 'Aspen'], 0, '../images/capstoneWinterNtPath.jpeg', 'Lodgepole Pines are the most common tree in Yellowstone');
   questionBank.push(q17);
/* Photo above from: https://wikipedia.tlm.cloud/ */
   let q18 = new Question('Approximately how many different species of flowering plants exist in Yellowstone National Park?', ['580', '900', '1300', '3500'], 2, '../images/capstoneFlower.jpg', 'There are over 1300 species of flowering plants in Yellowstone, including the sand verbena seen here');
   questionBank.push(q18);
   /* Photo above from: https://wikipedia.tlm.cloud/ */
   let q19 = new Question('All of the following types of birds can be found in Yellowstone year-round EXCEPT?', ['Jays', 'Toucans', 'Ravens', 'Canada geese'], 1, '../images/capstoneToucan.jpg', 'Toucans are not found naturally in Yellowstone');
   questionBank.push(q19);
   /* Photo above from: https://wikipedia.tlm.cloud/ */
   /* END JAVASCRIPT- ready function closing is below. */
});   