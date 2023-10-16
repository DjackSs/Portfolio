

const lightMode = ()=>
{
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

}

export default lightMode;