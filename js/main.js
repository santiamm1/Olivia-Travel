document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if(navLinks.classList.contains('active')) {
                mobileBtn.innerHTML = '&#10005;'; // Close icon
            } else {
                mobileBtn.innerHTML = '&#9776;'; // Hamburger icon
            }
        });
    }

    // Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Video Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            let index = (currentSlide + 1) % slides.length;
            showSlide(index);
        }

        function prevSlide() {
            let index = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(index);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                resetInterval();
            });
        });

        // Start autoplay
        resetInterval();
    }

    // Horizontal Scroller Logic
    const scroller = document.getElementById('soldOutScroller');
    const scrollerPrev = document.querySelector('.scroller-btn.prev');
    const scrollerNext = document.querySelector('.scroller-btn.next');

    if (scroller && scrollerPrev && scrollerNext) {
        scrollerPrev.addEventListener('click', () => {
            scroller.scrollBy({ left: -300, behavior: 'smooth' });
        });
        scrollerNext.addEventListener('click', () => {
            scroller.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
    // Quote Modal Logic
    const quoteModal = document.getElementById('quoteModal');
    const closeModalBtn = document.getElementById('closeModal');
    const quoteBtns = document.querySelectorAll('.medida-btn');
    const modalDestinationText = document.getElementById('modalDestinationText');
    const destinationInput = document.getElementById('destinationInput');
    const quoteForm = document.getElementById('quoteForm');

    if (quoteModal) {
        quoteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const destination = btn.getAttribute('data-destination');
                modalDestinationText.textContent = `Destino seleccionado: ${destination}`;
                destinationInput.value = destination;
                quoteModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closeModal = () => {
            quoteModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeModalBtn.addEventListener('click', closeModal);

        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                closeModal();
            }
        });

        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate sending data
            alert('¡Gracias! Tu solicitud para ' + destinationInput.value + ' ha sido enviada. Nos pondremos en contacto pronto.');
            closeModal();
            quoteForm.reset();
        });
    }
});
