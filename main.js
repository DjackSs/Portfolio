
import "./css/normelize.css";
import './css/style.css';


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

        if(!video.src && button.id != 2)
        {

            video.src = `./video/map${button.id}_opening.mp4`;
            video.loop = false;
            video.muted = false;

            setTimeout(()=>
            {
                video.poster = `./image/map${button.id}_open_idle_frame.png`;

            }, 1000);
            
            

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

const header = document.querySelector("header");


const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const canvasWidth = header.getBoundingClientRect().width;

canvas.width = canvasWidth;

const canvasHeight = header.getBoundingClientRect().height;

canvas.height = canvasHeight;



ctx.fillStyle = "#242424";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);


ctx.fillStyle = "#646cff";


class ball
{
    constructor (effect)
    {
        this.effect = effect;
        this.radius = Math.random()* 80 + 50;
        this.x = Math.random() * this.effect.width;
        this.y = this.effect.height+this.radius;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() * -0.5;
        
    }
    update ()
    {
        if(this.x - this.radius <= 0 || this.x + this.radius >= this.effect.width)
        {
            this.speedX *= -1;
        }

        if(this.y  <= 0 - this.radius)
        {
            this.y = this.effect.height + this.radius;
        }

        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw (context)
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fill();
    }

   
}


class MetaballsEffect
{
    constructor (width, height)
    {
        this.width = width;
        this.height = height;
        this.metaballsArray= [];

    }

    init (numberOfBalles)
    {
        for(let i=0 ; i< numberOfBalles; i++)
        {
            this.metaballsArray.push(new ball(this));
        }
    }

    update ()
    {
        this.metaballsArray.forEach(metaball => metaball.update());

    }

    draw (context)
    {
        this.metaballsArray.forEach(metaball => metaball.draw(context));
        
    }
}



const test = new MetaballsEffect(canvasWidth, canvasHeight);
test.init(20);



function animate ()
{
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "#242424";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "#646cff";
    
    test.update();
    test.draw(ctx);

    requestAnimationFrame(animate);
}

animate();


