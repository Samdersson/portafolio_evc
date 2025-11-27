let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel');
const prevPreview = document.querySelector('.prev-preview img');
const nextPreview = document.querySelector('.next-preview img');
let autoPlayInterval;

// Array of image sources
const imageSources = [
    'Alumbrado\\001.png',
    'Alumbrado\\002.png',
    'Alumbrado\\003.png',
    'Alumbrado\\004.png',
    'Alumbrado\\005.png',
    'Alumbrado\\006.png',
    'Alumbrado\\007.png'
];

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    updatePreviews(index);
}

// Function to update preview images
function updatePreviews(index) {
    const prevIndex = index === 0 ? slides.length - 1 : index - 1;
    const nextIndex = index === slides.length - 1 ? 0 : index + 1;

    prevPreview.src = imageSources[prevIndex];
    nextPreview.src = imageSources[nextIndex];
}

// Function to move to next or previous slide
function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Auto-play function
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        moveSlide(1);
    }, 3000); // Change slide every 3 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Initialize the carousel
function initCarousel() {
    showSlide(currentSlide);
    startAutoPlay();

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Pause auto-play on button click
    const controls = document.querySelectorAll('.carousel-control');
    controls.forEach(control => {
        control.addEventListener('click', () => {
            stopAutoPlay();
            setTimeout(startAutoPlay, 5000); // Resume after 5 seconds
        });
    });

    // Click on previews to navigate
    document.querySelector('.prev-preview').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next-preview').addEventListener('click', () => moveSlide(1));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCarousel);

