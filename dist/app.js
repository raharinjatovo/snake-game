document.addEventListener("DOMContentLoaded", async () => {
  // Your code here
  const square = document.getElementById("square");
  console.log(square);
  square.style.top = "350px"; // Moves the div 200px from the top
  square.style.left = "100px"; // Moves the div 300px from the left
  let data = true;
  let firstPosition = 10;
    
  while (data) {
    //    wait 2sec
    await new Promise((resolve) => setTimeout(resolve, 20));
    firstPosition = firstPosition + 1;
    square.style.top = firstPosition + "px"; // Moves the div 200px from the top
    if (firstPosition == 350) {
      data = false;
    }
  }
});
