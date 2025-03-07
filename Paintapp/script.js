const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const tooBtn = document.querySelectorAll(".tool");
const fillCol = document.querySelector("#fillColor");
const brushWidthInput = document.querySelector(".range");
const range=document.querySelector(".range")
const colorBtn=document.querySelectorAll(".colors .option")
const picker=document.querySelector(".color-picker")


let prevmouseX, snapShot, prevmouseY, isDrawing = false, selectTool = "brush", brushwidth = 5,selectedColor="#000";

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

tooBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectTool = btn.id;
        console.log(selectTool);
    });
});

const drawRect = (e) => {
    if (!fillCol.checked) {
        ctx.strokeRect(e.offsetX, e.offsetY, prevmouseX - e.offsetX, prevmouseY - e.offsetY);
    } else {
        ctx.fillRect(e.offsetX, e.offsetY, prevmouseX - e.offsetX, prevmouseY - e.offsetY);
    }
};
const drawCircle = (e) => {
        ctx.beginPath()
        let radius=Math.sqrt(Math.pow((prevmouseX-e.offsetX),2)+Math.pow((prevmouseY-e.offsetY),2))
        ctx.arc(prevmouseX,prevmouseY,radius,0,2*Math.PI)
        fillCol.checked?ctx.fill():ctx.stroke();
        ctx.stroke()
    };
    const drawTriangle = (e) => {
        ctx.beginPath();
        ctx.moveTo(prevmouseX, prevmouseY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineTo(prevmouseX * 2 - e.offsetX, e.offsetY);
        ctx.closePath();
    
        if (fillCol.checked) {
            ctx.fill(); // Fill the triangle if the checkbox is checked
        } else {
            ctx.stroke(); // Stroke the triangle if the checkbox is not checked
        }
    };

const startDraw = (e) => {
    isDrawing = true;
    prevmouseX = e.offsetX; // Passing current mouseX position as prevMouseX value.
    prevmouseY = e.offsetY; // Passing current mouseY position as prevMouseY value.
    ctx.beginPath();
    ctx.lineWidth = brushwidth;
    ctx.strokeStyle=selectedColor
    ctx.fillStyle=selectedColor
    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height); // Copy canvas data and pass as snapshot value to avoid dragging the image.
};

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapShot, 0, 0); // Restore the snapshot to avoid dragging the image.

    if (selectTool === "brush" || selectTool==="eraser") {
        ctx.strokeStyle=selectTool==="eraser"?"#e9b9d7": selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // Creates lines according to the mouse pointer.
        ctx.stroke(); // Fills the line with color.
    } else if (selectTool === "rectangle") {
        drawRect(e); // Draw rectangle with or without fill based on checkbox state.
    }else if (selectTool === "circle") {
        drawCircle(e); // Draw circle with or without fill based on checkbox state.
    }else if (selectTool === "triangle") {
        drawTriangle(e); // Draw circle with or without fill based on checkbox state.
    }
};

range.addEventListener("change",()=>brushwidth=range.value)
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);

brushWidthInput.addEventListener("input", () => {
    brushwidth = brushWidthInput.value;
});


colorBtn.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector(".options .selected").classList.remove("selected")
        btn.classList.add("selected")
        selectedColor=window.getComputedStyle(btn).getPropertyValue("background-color")
    })
})

picker.addEventListener("change",()=>{
    picker.parentElement.style.background=picker.value
    picker.parentElement("click")
})
document.querySelector(".clear.butt").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.querySelector(".save.butt").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
});

const setBackground=()=>{
    ctx.fillStyle="#e9b9d7"
    ctx.fillRect(0,0,canvas.width,canvas,height)
    ctx.fillStyle=selectedColor
}