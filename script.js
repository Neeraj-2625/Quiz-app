
function generateQue(){
    return (Math.round(Math.random()*100));
}

const questions=[
    {
        t1:generateQue(),
        t2:generateQue()
    },
    {
        t1:generateQue(),
        t2:generateQue()
    },
    {
        t1:generateQue(),
        t2:generateQue()
    },
    {
        t1:generateQue(),
        t2:generateQue()
    }
];
const answers=genearateAns();

function genearateAns(){
      return [questions[0].t1+questions[0].t2,
              questions[1].t1+questions[1].t2,
              questions[2].t1+questions[2].t2,
              questions[3].t1+questions[3].t2
             ];  
}

const nextButton=document.querySelector('.next');
const questionElement=document.querySelector('.question');
const answerSection=document.querySelector('.btns');

let score=0;
let currIndex=0;


function startQuiz(){
    score=0;
    currIndex=0;
    nextButton.innerHTML='Next';
    showQuestion();
}

function showQuestion(){
    reset();
    let currQue=questions[currIndex];
    let questionNo=currIndex+1;
    
    questionElement.innerHTML=questionNo+'. '+currQue.t1+' + '+currQue.t2+' = ?';
    
    const ans=setsAns(currIndex);
    ans.forEach((value)=>{
         const btn=document.createElement('button');
         btn.innerHTML=value.text;
         btn.classList.add('btn');
         answerSection.appendChild(btn);

         if(value.correct){
            btn.dataset.correct=value.correct;
         }

         btn.addEventListener('click',selectAns);
    });
}

function reset(){
    nextButton.style.display='none';

    while(answerSection.firstChild){
        answerSection.removeChild(answerSection.firstChild)
    }
}
 
function setsAns(index){
    const temp=Math.random();
   if(temp>=0 && temp<1/4){
    return [{text:answers[index],correct:true},
            {text:answers[index]-9,correct:false},
            {text:answers[index]-2,correct:false},
            {text:answers[index]-87,correct:false}
           ];
   }else if(temp>=1/4 && temp<1/2){
    return [{text:answers[index]-9,correct:false},
            {text:answers[index],correct:true},
            {text:answers[index]-2,correct:false},
            {text:answers[index]-87,correct:false}
           ];
   }else if(temp>=1/2 && temp<3/4){
    return [{text:answers[index]-9,correct:false},
            {text:answers[index]-2,correct:false},
            {text:answers[index],correct:true},
            {text:answers[index]-87,correct:false}
          ];
   }else{
    return [{text:answers[index]-9,correct:false},
            {text:answers[index]-2,correct:false},
            {text:answers[index]-87,correct:false},
            {text:answers[index],correct:true},
          ];
   }
}

function selectAns(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==='true';
    if(isCorrect){
      selectedBtn.classList.add('correct');
      score++;
     }
    else
      selectedBtn.classList.add('incorrect');

    Array.from(answerSection.children).forEach(button=>{
        if(button.dataset.correct==='true')
           button.classList.add('correct');
        
           button.disabled=true;
    });

    nextButton.style.display='block';
}

nextButton.addEventListener('click',()=>{
   if(currIndex<questions.length){
      handleNext();
   }else{
     startQuiz();
   }
});

function handleNext(){
    currIndex++;
    if(currIndex<questions.length)
      showQuestion();
    else 
     showScore();
}

function showScore(){
    reset();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML='play Again';
    nextButton.style.display='block';
}

startQuiz();