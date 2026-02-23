let canvas = document.querySelector('#canvas')
canvas.height = screen.width /1.8
canvas.width = screen.width
let game_speed = 20
let ctx = canvas.getContext('2d')
let background = 'images/backgrounds/bg1.png'
let floor = canvas.height *0.87

let img = new Image()
img.src = background
class Player {
    constructor(player,name,side,px,k1,k2,k3,k4,k5,k6,k7,k8) {
        this.player = player
        this.name = name
        this.resources = resources[name]
        this.properties = {
            health: this.resources.properties.health,
            x: px * canvas.width / 2000,
            y: floor - this.resources.properties.height * (canvas.width/2000 ),
            width: this.resources.properties.width * (canvas.width/2000),
            height: this.resources.properties.height * (canvas.width/2000),
            condition: 'ground',
            attack_flag: false,
            move_flag: false,
            fall_flag: false,
            jump_flag: false,
            img: new Image(),
            side: side,
            speed: this.resources.properties.speed,
            anim_speed: 100
        }
        this.animation = {
            current: 'idle',
            last: 'idle',
            timer: 0,
            frame: 0,
            frame_max: this.resources.sprites['idle_' + this.properties.side].frames
        }
        this.key_obj = {
            W: k1,
            A: k2,
            S: k3,
            D: k4,
            Z: k5,
            X: k6,
            C: k7,
            F: k8,
        }
        this.key_obj_r = {}
        this.keys_arr = []
        this.keys_history = []
        this.keys = []
        this.keysArrSet()
        this.keysGet()
        this.physics = {
            y_speed: 0,
            gravitation_force: 3,
            jump_force: 30
        }
    }
    drawPlayer(){
        this.animationCheck()
        this.gravitation()
        this.animationFunction(this.animation.current)
        ctx.drawImage(this.properties.img, this.properties.img.width/this.animation.frame_max*this.animation.frame, 0,this.properties.img.width/this.animation.frame_max, this.properties.img.height, this.properties.x, this.properties.y, this.properties.width , this.properties.height)
    }

    gravitation(){
        if(this.y_speed != 0 && this.properties.condition == 'air' && (this.properties.y - this.physics.y_speed) > floor){
            console.log('d')
            this.physics.y_speed -= this.physics.gravitation_force
            this.properties.y-=this.physics.y_speed
            if(this.y_speed < 0){
                this.jump_flag = false
                this.fall_flag = true
            }
        }else{
            this.fall_flag = false
            this.physics.y_speed = 0
            this.properties.condition = 'ground'
        }
    }
    keysGet(){
        document.addEventListener('keydown',(e)=>{
            if(!this.keys.includes(e.code) && this.keys_arr.includes(e.code)){
                this.keys.push(e.code)
                this.keys_history.push(e.code)
                this.showKey()
            }
        })
        document.addEventListener('keyup', (e) => {
            this.keys = this.keys.filter(key => key !== e.code)
        })
    }
    keysClear(){
        this.keys = []
    }
    keysArrSet(){
        for(let elem in this.key_obj){
            this.keys_arr.push(this.key_obj[elem])
        }
    }
    animationFunction(anim){
        this.properties.img.src = this.resources.sprites[anim + '_' + this.properties.side].sprite
        this.animation.frame_max = this.resources.sprites[anim + '_' + this.properties.side].frames
        this.animation.timer += game_speed
        if (this.animation.timer >= this.properties.anim_speed) {
            this.animation.timer = 0
            this.updateAnimation()
        }
    }
    showKey(){
        console.log(this.keys, this.player)
    }
    checkMove(){
        this.properties.move_flag = false
        if(this.keys.includes(this.key_obj['D']) & this.properties.x+this.properties.speed < canvas.width-this.properties.width/1.5 ){
            this.properties.move_flag = true
            this.properties.side = 'right'
            this.properties.x+=this.properties.speed
        }else if(this.keys.includes(this.key_obj['A']) & this.properties.x-this.properties.speed > 0 - this.properties.width/4 ){
            this.properties.move_flag = true
            this.properties.side = 'left'
            this.properties.x-=this.properties.speed
        }
        if(this.keys.includes(this.key_obj['Z']) && !this.jump_flag && !this.fall_flag){
            this.jump_flag = true
            this.physics.y_speed+=this.physics.jump_force
            this.properties.condition = 'air'
        }
    }
    updateAnimation(){
        if(this.animation.frame == this.animation.frame_max-1){
            if(this.resources.sprites[this.animation.current + '_' + this.properties.side].replay){
               this.animation.frame = 0 
            }
        }else{
            this.animation.frame++
        }
    }
    animationCheck(){
        this.animation.last = this.animation.current
        if(this.properties.move_flag == true){
            if(this.properties.condition == 'ground' && !this.properties.attack_flag){
                this.animation.current = 'walk'
            }
            if(this.properties.jump_flag = true){
                this.animation.current = 'jump'
            }
        }else{
            this.animation.current = 'idle'
        }
        if(this.animation.last!=this.animation.current){
            this.animation.frame = 0
        }
        
    }
}
let player1 = new Player(1,'knight','right',300,'KeyW','KeyA','KeyS','KeyD','KeyZ','KeyX','KeyC','KeyF')
let player2 = new Player(2,'knight','right',1800,'ArrowUp','ArrowLeft','ArrowDown','ArrowRight','Numpad4','Numpad5','Numpad6','Numpad9')

img.onload = function(){
    drawFrame()
}

function drawFrame(){
    player1.checkMove()
    player2.checkMove()
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    player1.drawPlayer()
    player2.drawPlayer()
    setTimeout(drawFrame, 20)
}
