// let bg = document.getElementsByClassName("item1");
// let moon = document.getElementsByClassName("item2");
// let mountain = document.getElementsByClassName("item3");
// let road = document.getElementsByClassName("item4");
// let text = document.getElementsByClassName("item5");


// window.addEventListener('scroll', function(){
//     var value = window.screenY;

//     bg.style.top = value * 1.5 + 'px';
//     moon.style.left = value * -2.5 + 'px';
//     mountain.style.top = value * -2.15 + 'px';
//     road.style.top = value * 2.15 + 'px';
//     text.style.top = value * 1 + 'px';
// })

// document.addEventListener("mousemove", parallax);
// function parallax(e){
//     document.querySelectorAll('.object').forEach(function(move){
//         var moving_value = move.getAttribute("data-value");
//         var x = e.clientX * moving_value;
//         var y = e.clientY * moving_value;

//         move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)"
//     });
// }

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show')
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el))


// document.addEventListener('mousemove', parallax);
// function parallax(e){
// this.querySelectorAll('.layer').forEach(layer => {
//     const speed = layer.getAttribute('data-speed')

//     const x = (window.innerWidth - e.pageX*speed) /50
//     const y = (window.innerHeight - e.pageY*speed) /50

//     layer.style.transform = `translateX(${x}px) translateY(${y}px)`
// })
// }

class ParallaxImageEffect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.images = Array.from(this.container.querySelectorAll('.parallax-image'));
        
        this.imageData = this.images.map(img => ({
            element: img,
            initialX: parseFloat(img.style.left),
            initialY: parseFloat(img.style.top),
            parallaxSpeed: parseFloat(img.dataset.parallaxSpeed) || 1
        }));

        this.containerHeight = this.container.clientHeight;
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        this.imageData.forEach(imgData => {
            const transformY = scrollProgress * this.containerHeight * imgData.parallaxSpeed;
            imgData.element.style.transform = `translateY(${transformY}px)`;
            
            const imageBottom = imgData.initialY + transformY;
            
            if (imageBottom > this.containerHeight) {
                imgData.element.style.opacity = '0';
            } else {
                imgData.element.style.opacity = '1';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParallaxImageEffect('imageContainer');
});

