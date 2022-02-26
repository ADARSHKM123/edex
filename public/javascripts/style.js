
    const image = document.querySelector(".image");
    const images = ['images/image(1).png','images/image(2).png'];
    setInterval(()=>{
     const random = Math.floor(Math.random() * 2);
     image.src = images[random]
    },800)
