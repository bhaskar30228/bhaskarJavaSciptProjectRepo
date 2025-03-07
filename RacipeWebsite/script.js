const search=document.querySelector(".searchbox")
const submit=document.querySelector(".submitButt")
const details=document.querySelector(".recipe-container")
const viewMore=document.querySelector(".recipe-details-content")
const viewClose=document.querySelector(".recipe-close")
const changeBUtt=document.querySelector(".theme")
const fetchApi=(data)=>{
    console.log(data)
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`; // 
    details.innerHTML=""
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return response.json();
    })
    .then(result => {
        if (!result.meals) {
            details.innerHTML = `<h2>No recipes found for "${data}"</h2>`;
            return;
        }
            result.meals.forEach(meal => {
                const recipeDiv=document.createElement('div')
                recipeDiv.classList.add("recipe")
                recipeDiv.innerHTML=`
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p>Belongs to ${meal.strCategory} category </p>
                <input type="button" class="view" value="View Recipe">
                `
                details.appendChild(recipeDiv)
    
                const view=recipeDiv.querySelector(".view")
                view.addEventListener('click',()=>{
                   openRecipeDetails(meal)
                     
                })
                viewClose.addEventListener("click",()=>{
                    viewMore.parentElement.style.display="none"
                })
            });
        })
   
}
const openRecipeDetails=(meal)=>{
    viewMore.innerHTML=`
    <h1 class="recipeName">${meal.strMeal}</h1>
    <h3 class="ingredient">Ingredients</h3>
    <ul class="ingredients">${fetchIngredients(meal)}</ul>
    <div class="instruction">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    viewMore.parentElement.style.display="block"
}

const fetchIngredients=(meal)=>{
    let ingredientList=""
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`]
        if(ingredient){
            const measure=meal[`strMeasure${i}`]
            ingredientList+=`<li>${measure} ${ingredient}`
        }else{
            break;
        }

    }
    return ingredientList
}
submit.addEventListener("click",(e)=>{
    e.preventDefault();
    const food=search.value.trim();
    if(!food){
        details.innerHTML=`
        <h2>Please enter the food first?????</h2>
        `
        return
    }
    fetchApi(food)
})
const applySavedTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("darkTheme");
        changeBUtt.innerHTML = "Light";
    } else {
        document.body.classList.remove("darkTheme");
        changeBUtt.innerHTML = "Dark";
    }
};
document.addEventListener("DOMContentLoaded", applySavedTheme);
changeBUtt.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log("Hello")
    document.body.classList.toggle("darkTheme")
if(document.body.classList.contains("darkTheme")){
    changeBUtt.innerHTML="Light"
    localStorage.setItem("theme", "dark");
}else{
    changeBUtt.innerHTML="Dark"
    localStorage.setItem("theme", "light");
}
})









