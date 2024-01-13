document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.querySelector(".start");
    const restartButton = document.querySelector(".return_class");
    const circle1 = document.querySelector(".circle1");
    const circle2 = document.querySelector(".circle2");
    const circle3 = document.querySelector(".circle3");
    const car1 = document.querySelector(".xe1");
    const car2 = document.querySelector(".xe2");
    const metrol1 = document.querySelector(".metrol1");
    const metrol2 = document.querySelector(".metrol2");
    const wall = document.querySelector(".wall");
  
    let gameStarted = false;
  
    function getRandomSpeed() {
      return Math.floor(Math.random() * 10) + 1;
    }
  
    function startGame() {
      if (!gameStarted) {
        gameStarted = true;
  
        // Reset the width of metrol elements
        metrol1.style.width = "80px";
        metrol2.style.width = "80px";
  
        // Trigger circle animations
        animateCircles(() => {
          // Get random speeds for each car
          const speed1 = getRandomSpeed();
          const speed2 = getRandomSpeed();
  
          // Move cars and check positions
          moveCar(car1, metrol1, speed1);
          moveCar(car2, metrol2, speed2);
        });
      }
    }
  
    function animateCircles(callback) {
      // Show red color after 1s
      setTimeout(() => {
        circle1.style.backgroundColor = "red";
        // Show yellow color after 1s
        setTimeout(() => {
          circle2.style.backgroundColor = "yellow";
          // Show green color after 1s
          setTimeout(() => {
            circle3.style.backgroundColor = "green";
            // Call the callback function to start moving cars
            if (typeof callback === "function") {
              callback();
            }
          }, 1000);
        }, 1000);
      }, 1000);
    }
  
    function moveCar(car, metrol, speed) {
      const intervalId = setInterval(function () {
        const currentPosition = car.offsetLeft;
        const newPosition = currentPosition + speed;
  
        car.style.left = newPosition + "px";
  
        // Update the width of the metrol element based on speed
        const newWidth = 80 - (speed / 10) * 80 + "px";
  
        // Apply the transition effect to the metrol width
        metrol.style.transition = "width 2s ease-in-out";
        metrol.style.width = newWidth;
  
        if (newPosition >= wall.offsetLeft) {
          clearInterval(intervalId);
          finishGame(car, metrol);
        }
      }, 20);
    }
  
    function finishGame(winningCar, metrol) {
      gameStarted = false;
  
      car1.style.transition = "none";
      car2.style.transition = "none";
  
      alert(`Xe ${winningCar.className} chiến thắng!`);
  
      car1.style.left = "0";
      car2.style.left = "0";
  
      // Reset the width of metrol elements
      metrol1.style.width = "80px";
      metrol2.style.width = "80px";
  
      // Clear the transition effect after a delay
      setTimeout(function () {
        car1.style.transition = "left 2s linear";
        car2.style.transition = "left 2s linear";
        metrol.style.transition = "none";
      }, 100);
    }
  
    function restartGame() {
      // Reset the game state
      circle1.style.backgroundColor = "";
      circle2.style.backgroundColor = "";
      circle3.style.backgroundColor = "";
      car1.style.left = "0";
      car2.style.left = "0";
  
      // Enable the start button
      gameStarted = false;
  
      // Reset the width of metrol elements
      metrol1.style.width = "80px";
      metrol2.style.width = "80px";
    }
  
    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", restartGame);
  });
  function finishGame(winningCar, metrol) {
    gameStarted = false;
  
    car1.style.transition = "none";
    car2.style.transition = "none";
  
    if (winningCar === car1 && car2.offsetLeft >= wall.offsetLeft) {
      // Both cars reached the finish line simultaneously
      alert("Hòa! Cả hai xe đều chiến thắng!");
    } else {
      // Only one car reached the finish line
      alert(`Xe ${winningCar.className} chiến thắng!`);
    }
  
    car1.style.left = "0";
    car2.style.left = "0";
  
    // Reset the width of metrol elements
    metrol1.style.width = "80px";
    metrol2.style.width = "80px";
  
    // Clear the transition effect after a delay
    setTimeout(function () {
      car1.style.transition = "left 2s linear";
      car2.style.transition = "left 2s linear";
      metrol.style.transition = "none";
    }, 100);
  }
  