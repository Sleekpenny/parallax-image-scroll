
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

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.parallax-image');
    const container = document.querySelector('.image-container');

    // Store initial positions
    const imageData = Array.from(images).map(img => ({
        element: img,
        initialLeft: parseInt(img.dataset.initialLeft),
        initialTop: parseInt(img.dataset.initialTop),
        initialWidth: parseInt(img.dataset.initialWidth)
    }));

    window.addEventListener('scroll', () => {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const isScrollingDown = window.scrollY > (window.lastScrollY || 0);
        window.lastScrollY = window.scrollY;

        imageData.forEach((img, index) => {
            const convergenceProgress = Math.max(0, Math.min(3, (scrollProgress - 3.5) * 4));

            const transformY = scrollProgress * containerHeight * (2 + index * 4.1);
            const centerX = containerWidth  - (img.initialWidth );
            const bottomY = containerHeight - img.initialWidth;
            const lerp = (start, end, progress) => start + (end - start) * progress;

            if (isScrollingDown) {
                img.element.style.transform = `translateY(${transformY}px)`;
                img.element.style.left = `${lerp(img.initialLeft, centerX, convergenceProgress)}px`;
                img.element.style.width = `${lerp(img.initialWidth, 4, convergenceProgress)}px`;
                img.element.style.opacity = scrollProgress > 0.3 ? 0 : 1;
            } 
            else {
                img.element.style.transform = `translateY(${Math.max(0, transformY * -1)}px)`;
                img.element.style.left = `${img.initialLeft}px`;
                img.element.style.width = `${img.initialWidth}px`;
                img.element.style.opacity = 1;
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.text-section');
    
    window.addEventListener('scroll', () => {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const sectionIndex = Math.min(
            Math.floor(scrollProgress * sections.length), 
            sections.length - 1
        );

        sections.forEach((section, index) => {
            section.classList.toggle('active', index === sectionIndex);
        });

        const currentSection = sections[sectionIndex];
        const words = currentSection.querySelectorAll('.word');
        
        const localScrollProgress = (scrollProgress * sections.length) % 1;
        const wordIndex = Math.floor(localScrollProgress * words.length);

        words.forEach((word, index) => {
            word.classList.toggle('visible', index === wordIndex);
        });
    });
});
