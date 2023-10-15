
import "./css/normelize.css";
import './css/style.css';


// ============================================
// LIGHT MODE
// ============================================

const lightButton = document.querySelector(".light");

// -------------get the theme
const theme = localStorage.getItem("theme");

// -------------apply the theme if there is
theme && document.body.classList.add(theme);


// -------------switch theme and store if needed
lightButton.addEventListener("click",()=>
{
    document.body.classList.toggle("light");

    if(document.body.classList.contains("light"))
    {
        localStorage.setItem("theme", "light");
    }
    else
    {
        localStorage.removeItem("theme");
    }

})



// ============================================
// MODAL
// ============================================

const modal = document.querySelector("#modal");

const projectImgs = document.querySelectorAll(".project img");

for(let image of projectImgs)
{
    image.addEventListener("click", ()=>
    {
        // -------------this part open the modal
        let src = image.src;

        modal.style.backgroundImage = `url("${src}")`;

        modal.showModal();

        let count = 1;

        // -------------if user click on button, image.src switch, if user click anywhere else then modal.close
        modal.addEventListener("click", (e)=>
        {

            if(e.target.classList.contains("modal"))
            {
                modal.close();
            }

            if(e.target.classList.contains("modalButtonL"))
            {
                if(count > 1)
                {
                    src = src.replace(`${count}.png`,`${count-1}.png`);

                    modal.style.backgroundImage = `url("${src}")`;

                    count--;

                }
                else
                {
                    src = src.replace(`${count}.png`,`${count+3}.png`);

                    modal.style.backgroundImage = `url("${src}")`;

                    count = 4;

                }

            }

            if(e.target.classList.contains("modalButtonR"))
            {
                if(count < 4)
                {
                    src = src.replace(`${count}.png`,`${count+1}.png`);

                    modal.style.backgroundImage = `url("${src}")`;

                    count++;

                }
                else
                {
                    src = src.replace(`${count}.png`,`${count-3}.png`);

                    modal.style.backgroundImage = `url("${src}")`;

                    count = 1;

                }

            }
            
            
            
        });

       
      
    });
}


// ============================================
// ACCORDEON MENU
// ============================================


const accordeonButtons = document.querySelectorAll(".button-accordeon");


for(let button of accordeonButtons)
{
    button.addEventListener("click", (e)=>
    {
        const accordeonContent = document.querySelector(`button[id="${button.id}"] + article`);

        const video = document.querySelector(`button[id="${button.id}"] video`);
       
        button.classList.toggle("button-active");

        // for map 1 and 3, opening_video and opened_video are loaded once their buttons have been clicked
        if(!video.src && button.id != 2)
        {
            // switch the idle video with opening video
            video.src = `./video/map${button.id}_opening.mp4`;
            video.loop = false;
            video.muted = false;

            // scwitch the poster image after 1s
            setTimeout(()=>
            {
                video.poster = `./image/map${button.id}_open_idle_frame.png`;

            }, 1000);
            
            
            // when the opening video is finished, switch with the open_idle video
            video.addEventListener("ended", ()=>
            {
                video.src = `./video/map${button.id}_open_idle.mp4`;
                video.loop = true;
                video.muted = true;

            });
          
        }

        accordeonContent.classList.toggle("active");

    })
}


// ============================================
// CANVAS HEADER
// ============================================

// this script is inspired from https://www.youtube.com/@Frankslaboratory GREAT STUFF !


// -------------set up the canvas with the div's width and height
let header_div = document.querySelector("#heading").getBoundingClientRect();

const canvas = document.querySelector("canvas");

canvas.width = header_div.width;
canvas.height = header_div.height;

const ctx = canvas.getContext("2d");



// -------------get the mouse position

const mouse =
 {
    x: 0,
    y: 0
 };


window.addEventListener("mousemove", (e)=>
{
    mouse.x = e.x;
    mouse.y = e.y;
});


let theta = 0;


// -------------get the title metric for a bouncing effect, gotta add window.scrollY to get the fixed position y on the page
let title = document.querySelector("h1").getBoundingClientRect();
title.y += window.scrollY;



ctx.fillStyle = "rgba(36, 36, 36, 1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";






// -------------set up the classes

class eyeball
{
    constructor (effect)
    {
        this.effect = effect;
        this.radius = Math.random()* 30 + 60;
        this.x = Math.random() * this.effect.width;
        this.y = this.effect.height + this.radius;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() * -0.5;
        this.bouncable = false;
        
    }

    // ------detect collisions and set up dierection
    update ()
    {
        if(this.x - this.radius <= 0 || this.x + this.radius >= this.effect.width)
        {
            this.speedX *= -1;
        }

        // -------------if eyeballs leaves canvas from top, then create another
        if(this.y  <= 0 - this.radius)
        {
            this.y = this.effect.height + this.radius;
        }

        // -------------eyeballs that hase once bounce on title, can bounce with canvas bottom
        if(this.y + this.radius >= this.effect.height && this.bouncable)
        {
            this.speedY *= -1;
        }

        // -------------if eyeballs collided with the title, then bounce = define title hitbox
        if((this.y + this.radius > this.effect.obstacle.y) && (this.y - this.radius < this.effect.obstacle.y + this.effect.obstacle.height-10))
        {
            if((this.x + this.radius > this.effect.obstacle.x) && (this.x - this.radius < this.effect.obstacle.x + this.effect.obstacle.width-10))
            {
                this.speedX *= -1;
                this.speedY *= -1;
                this.bouncable = true;
            }
            
        }


        this.x += this.speedX;
        this.y += this.speedY;
    }

    // ------contain the canva's methodes to draw the eyes
    draw (context)
    {
        // ------eyeball
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fillStyle = "rgba(67, 56, 202, 1)";
        context.fill();


        // ------get angle
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        theta = Math.atan2(dy, dx);


        // ------iris
        let iris_x = this.x + Math.cos(theta) * this.radius/10;
        let iris_y = this.y + Math.sin(theta) * this.radius/10;

        let irisRadius = this.radius /1.2;

        context.beginPath();
        context.arc(iris_x, iris_y, irisRadius, 0, Math.PI*2);
        context.fillStyle = "white";
        context.fill();

        // ------pupil
        let pupil_x = this.x + Math.cos(theta) * this.radius/1.9;
        let pupil_y = this.y + Math.sin(theta) * this.radius/1.9;

        let pupilRadius = this.radius /2.5;

        context.beginPath();
        context.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI*2);
        context.fillStyle = "rgba(36, 36, 36, 1)";
        context.fill();

        // ------reflection
        context.beginPath();
        context.arc(pupil_x-pupilRadius/3, pupil_y-pupilRadius/3, pupilRadius/2, 0, Math.PI*2);
        context.fillStyle = "rgba(255,255,255,0.1";
        context.fill();



    }

   
}


class eyeballEffect
{
    constructor (width, height, obstacle)
    {
        this.width = width;
        this.height = height;
        this.obstacle = obstacle;
        this.eyeballs= [];

    }

    // ------creat the desire eyeballs number
    init (numberOfBalles)
    {
        for(let i=0 ; i< numberOfBalles; i++)
        {
            this.eyeballs.push(new eyeball(this));
        }
    }

    
    update ()
    {
        for(let eye of this.eyeballs)
        {
            eye.update();
        }

        // this.balls.forEach(ball => metaball.update());

    }

   
    draw (context)
    {
        for(let eye of this.eyeballs)
        {
            eye.draw(context);
        }

        // this.balls.forEach(ball => ball.draw(context));
        
    }
}




// -------------script initialisation. The effect take place within the canvas and the title(h1) is passed as an obstacle for bouncing
let eyeballAnimation = new eyeballEffect(canvas.width, canvas.height, title);
eyeballAnimation.init(50);

let frame = 0;

animate();




// -------------reset the script when resizing
window.addEventListener("resize", ()=>
{
    window.cancelAnimationFrame(frame);

    header_div = document.querySelector("#heading").getBoundingClientRect();

    canvas.width = header_div.width;
    canvas.height = header_div.height;


    title = document.querySelector("h1").getBoundingClientRect();
    title.y += window.scrollY;

    eyeballAnimation = new eyeballEffect(canvas.width, canvas.height, title);
    eyeballAnimation.init(50);

    animate();




})


// -------------animation loop
function animate ()
{


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(36, 36, 36, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";

    
    eyeballAnimation.update();
    eyeballAnimation.draw(ctx);


    frame = requestAnimationFrame(animate);
}


