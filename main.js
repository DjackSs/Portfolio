
import "./css/normelize.css";
import './css/style.css';




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