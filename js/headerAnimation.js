

const headerAnimation = () =>
{
    // / this script is inspired from https://www.youtube.com/@Frankslaboratory GREAT STUFF !


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

    // let title2 = document.querySelector("h1");

    // window;addEventListener("scroll", ()=>
    // {
    //     title2.style.transform = `translateY(${window.scrollY/4}px)`;


    // })



    ctx.fillStyle = " #070A13";
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

        ctx.fillStyle = "#070A13";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";

        
        eyeballAnimation.update();
        eyeballAnimation.draw(ctx);


        frame = requestAnimationFrame(animate);
    }
}


export default headerAnimation;