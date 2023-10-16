

const accordeonMenu = ()=>
{

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


}

export default accordeonMenu;