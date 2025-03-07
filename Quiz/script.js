const questions=[
    {
        question:"Which is the largest animal in the world?",
        answer:[
            {text:"Shark",correct:false},
            {text:"Elephant",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Lion",correct:false},
        ]
    },
    {
        question:"What is the capital of India?",
        answer:[
            {text:"New Delhi",correct:true},
            {text:"Paris",correct:false},
            {text:"New York",correct:false},
            {text:"Sydney",correct:false},
        ]
    },
    {
        question:"Who is the prime minister of India",
        answer:[
            {text:"Manmohan Singh",correct:false},
            {text:"Narendra Modi",correct:true},
            {text:"Soniya Gandhi",correct:false},
            {text:"Arvind Kejriwal",correct:false},
        ]
    },
    {
        question:"What is the full form of CPU?",
        answer:[
            {text:"Cental purpose unit",correct:false},
            {text:"Central processed unit",correct:false},
            {text:"Central processing unit",correct:true},
            {text:"Lion",correct:false},
        ]
    }
]

const question=document.getElementById("question");
const options=document.getElementById("answerButtons")
const submit=document.getElementById("submit")


let currentIndex=0;
let score=0;

function startQuiz(){
    currentIndex=0;
    score=0;
    submit.innerHTML="Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion=questions[currentIndex]
    let questionNo=currentIndex+1
    question.innerHTML=questionNo+"."+currentQuestion.question
    currentQuestion.answer.forEach(element => {
        const answer=document.createElement("button");
        answer.innerHTML=element.text
        answer.classList.add("btn")
        options.appendChild(answer)
        if(element.correct){
            answer.dataset.correct=element.correct
        }
        answer.addEventListener("click",selectAnswer)
    });
}
function resetState(){
    submit.style.display="none"
    while(options.firstChild){
        options.removeChild(options.firstChild)
    }
}

function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true"
    if(isCorrect){
        selectBtn.classList.add("Correct")
        score++
    }
    else{
        selectBtn.classList.add("Incorrect")
    }
    Array.from(options.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("Correct")
        }
        button.disabled=true;
    })
    submit.style.display="block"
}
function showScore(){
    resetState()
    question.innerHTML=`You score ${score} out of ${questions.length}}`
    submit.innerText="Play agin"
    submit.style.display="block"
}
function handleNextButton(){
    currentIndex++;
    if(currentIndex<questions.length){
        showQuestion()
    }
    else{
        showScore()
    }
}

submit.addEventListener("click",()=>{
    if(currentIndex<questions.length){
        handleNextButton()
    }
    else{
        startQuiz()
    }
})






startQuiz()