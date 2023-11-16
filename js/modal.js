

const modal = ()=>
{
    const modal = document.querySelector("#modal");

    const projectImgs = document.querySelectorAll(`.project img[class="show"]`);


    // -------------no modal on small screen / mobile
    if(window.innerWidth >= 500)
    {
        for(let image of projectImgs)
        {
            if(image.classList.contains("show"))
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
                                src = src.replace(`${count}.webp`,`${count-1}.webp`);

                                modal.style.backgroundImage = `url("${src}")`;

                                count--;

                            }
                            else
                            {
                                src = src.replace(`${count}.webp`,`${count+3}.webp`);

                                modal.style.backgroundImage = `url("${src}")`;

                                count = 4;

                            }

                        }

                        if(e.target.classList.contains("modalButtonR"))
                        {
                            if(count < 4)
                            {
                                src = src.replace(`${count}.webp`,`${count+1}.webp`);

                                modal.style.backgroundImage = `url("${src}")`;

                                count++;

                            }
                            else
                            {
                                src = src.replace(`${count}.webp`,`${count-3}.webp`);

                                modal.style.backgroundImage = `url("${src}")`;

                                count = 1;

                            }

                        }
                        
                        
                        
                    });

                
                
                });

            }
            
        }

    }

}

export default modal;