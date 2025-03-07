const butt=document.querySelector("#butt")
const icon=document.querySelector("#icon")
butt.addEventListener("click",function(){
    document.body.classList.toggle("dark-theme")
    if( document.body.classList.contains("dark-theme")){
        icon.src="moon.svg"
        butt.innerHTML="Dark"
    }else{
        icon.src="sun.svg"
    }
})


