const player = document.getElementById("player")
const game = document.getElementById("game")

const scoreDisplay = document.getElementById("score")
const highDisplay = document.getElementById("highscore")

const jumpSound = document.getElementById("jumpSound")
const hitSound = document.getElementById("hitSound")
const scoreSound = document.getElementById("scoreSound")

const gameOverScreen = document.getElementById("gameOver")

let velocity = 0
let gravity = 1
let jumpPower = -15
let playerY = 0

let gameOver = false
let score = 0

let blocks = []

let highScore = localStorage.getItem("jumpHighScore") || 0
highDisplay.textContent = highScore

function jump(){

if(playerY === 0){

velocity = jumpPower
jumpSound.play()

}

}

document.addEventListener("keydown", (e)=>{
if(e.code === "Space") jump()
})

document.addEventListener("touchstart", (e)=>{
e.preventDefault()
jump()
},{passive:false})

function spawnBlock(){

if(gameOver) return

const block = document.createElement("div")
block.classList.add("block")

game.appendChild(block)

blocks.push({element:block,x:500})

}

setInterval(spawnBlock,2000)

function update(){

if(gameOver) return

velocity += gravity
playerY += velocity

if(playerY > 0){
playerY = 0
velocity = 0
}

player.style.bottom = (-playerY) + "px"

blocks.forEach((b,i)=>{

b.x -= 6
b.element.style.right = (500 - b.x) + "px"

let playerRect = player.getBoundingClientRect()
let blockRect = b.element.getBoundingClientRect()

if(
blockRect.left < playerRect.right &&
blockRect.right > playerRect.left &&
blockRect.top < playerRect.bottom &&
blockRect.bottom > playerRect.top
){

hitSound.play()
gameOver = true

if(score > highScore){
localStorage.setItem("jumpHighScore",score)
}

gameOverScreen.style.display="flex"

}

if(b.x < -50){

b.element.remove()
blocks.splice(i,1)

score++
scoreDisplay.textContent = score

scoreSound.play()

}

})

requestAnimationFrame(update)

}

update()

function restart(){
location.reload()
}