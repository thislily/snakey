document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startButton = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 //first div in grid
    let appleIndex = 0 //first div in grid
    let currentSnake = [2,1,0] //2 will be head, 0 will be tail, 1's will be body
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0 
    let interval = 0



    //to start, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        play()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 800
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


    //snake move outcomes
    function moveOutcomes() {

    //snake hitting border or self?
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake hits itself
        ) {
            return clearInterval(interval)
        }

        const tail = currentSnake.pop() //show tail
        squares[tail].classList.remove('snake') //removes tail
        currentSnake.unshift(currentSnake[0] + direction) //gives new direction to the head


    //snake getting apple?
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('.snake')
            currentSnake.push(tail)
            randomApple()
            bite()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }

        squares[currentSnake[0]].classList.add('snake')
    }


    //generate new apple once apple is eaten

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }


    //assign function tp keycodes
function control(e) {
    squares[currentIndex].classList.remove('snake')

    if (e.keyCode === 39) {
        direction = 1 //right arrow, snake goes right one
    } else if (e.keyCode === 38) {
        direction = -width //up arrow, snake goes back 10, appearing to go up one
    } else if (e.keyCode === 37) {
        direction = -1 //left arrow, snake will go left one
    } else if (e.keyCode === 40) {
        direction = +width //down arrow, snake goes forward 10, appearing to go down one
    }
}


function play() {
    var audio = new Audio("snake-jazz.mp3")
    audio.play()
  }

  function bite() {
    var biteSound = new Audio("bite.mp3")
    biteSound.bite()
  }



document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)


    //end of script
})