const dob=document.querySelector("#dob")
const output=document.querySelector("#print")
dob.addEventListener("click",function(){
    this.showPicker()
})
const today = new Date().toISOString().split("T")[0];
dob.setAttribute("max",today)

const button=document.querySelector("#but")
button.addEventListener("click",function getAge(){
    const birthDate=new Date(dob.value)
    let d1=birthDate.getDate();
    let m1=birthDate.getMonth()+1;
    let y1=birthDate.getFullYear();
    
    const Datetoday=new Date()
    let d2=Datetoday.getDate();
    let m2=Datetoday.getMonth()+1;
    let y2=Datetoday.getFullYear();

    let y3=y2-y1
    let m3,d3
    if(m2>=m1){
        m3=m2-m1
    }
    else{
        y3--;
      m3=12+m2-m1
    }
    if(d2>=d1){
        d3=d2-d1
    }
    else{
        m3--
        d3=getDayInMonth(y1,m1) + d2 - d1
    }
    if(m3<0){
        m3=11
        y3--
    }
    output.innerHTML = '';
    if(dob.value){
        const show=document.createElement("p")
        show.innerText=`Your are ${y3} years, ${m3} months and ${d3} days old`
        show.classList.toggle("para")
        output.appendChild(show)
    }
    else{
        alert("Please enter the date of birth first")
    }
})


function getDayInMonth(year,month){
    return new Date(year,month,0).getDate();
}

