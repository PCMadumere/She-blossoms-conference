document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".theme-slider");

    if (!slider) return;

    const track = slider.querySelector(".theme-slider-track");
    const originalSlides = Array.from(
        track.querySelectorAll(".theme-slide")
    );

    const previousButton = slider.querySelector(".theme-slider-prev");
    const nextButton = slider.querySelector(".theme-slider-next");

    if (
        !track ||
        originalSlides.length === 0 ||
        !previousButton ||
        !nextButton
    ) {
        return;
    }


    /* =========================================
       SETTINGS
    ========================================= */

    const AUTO_PLAY_DELAY = 4500;
    const TRANSITION_TIME = 800;


    /* =========================================
       CREATE INFINITE LOOP
    ========================================= */

    /*
     * Clone the first slide and put it
     * after the last slide.
     */

    const firstClone = originalSlides[0].cloneNode(true);

    /*
     * Clone the last slide and put it
     * before the first slide.
     */

    const lastClone =
        originalSlides[originalSlides.length - 1].cloneNode(true);


    track.appendChild(firstClone);

    track.insertBefore(lastClone, track.firstChild);


    const allSlides =
        track.querySelectorAll(".theme-slide");


    let currentIndex = 1;

    let isMoving = false;
    let isPaused = false;

    let autoPlayTimer = null;


    /* =========================================
       INITIAL POSITION
    ========================================= */

    function getSlideWidth() {
        return slider.getBoundingClientRect().width;
    }


    function updatePosition(animate = true) {

        const slideWidth = getSlideWidth();

        track.style.transition = animate
            ? `transform ${TRANSITION_TIME}ms cubic-bezier(0.22, 1, 0.36, 1)`
            : "none";

        track.style.transform =
            `translate3d(-${currentIndex * slideWidth}px, 0, 0)`;
    }


    /*
     * Position the slider on the first real image.
     */

    updatePosition(false);


    /* =========================================
       MOVE TO SLIDE
    ========================================= */

    function moveTo(index) {

        if (isMoving) return;

        isMoving = true;

        currentIndex = index;

        updatePosition(true);
    }


    /* =========================================
       NEXT
    ========================================= */

    function nextSlide() {

        if (isMoving) return;

        moveTo(currentIndex + 1);
    }


    /* =========================================
       PREVIOUS
    ========================================= */

    function previousSlide() {

        if (isMoving) return;

        moveTo(currentIndex - 1);
    }


    /* =========================================
       INFINITE LOOP RESET
    ========================================= */

    track.addEventListener(
        "transitionend",
        function () {

            /*
             * We reached the cloned first image.
             *
             * Instantly move to the real first image.
             *
             * Because the images are identical,
             * the user doesn't see the reset.
             */

            if (currentIndex === allSlides.length - 1) {

                currentIndex = 1;

                updatePosition(false);
            }


            /*
             * We reached the cloned last image.
             *
             * Instantly move to the real last image.
             */

            else if (currentIndex === 0) {

                currentIndex = allSlides.length - 2;

                updatePosition(false);
            }


            /*
             * Allow another movement.
             */

            requestAnimationFrame(function () {
                isMoving = false;
            });
        }
    );


    /* =========================================
       BUTTONS
    ========================================= */

    nextButton.addEventListener(
        "click",
        function () {

            nextSlide();

            restartAutoPlay();
        }
    );


    previousButton.addEventListener(
        "click",
        function () {

            previousSlide();

            restartAutoPlay();
        }
    );


    /* =========================================
       AUTO PLAY
    ========================================= */

    function startAutoPlay() {

        stopAutoPlay();

        if (isPaused) return;

        autoPlayTimer = setInterval(
            function () {

                if (!isPaused) {
                    nextSlide();
                }

            },
            AUTO_PLAY_DELAY
        );
    }


    function stopAutoPlay() {

        if (autoPlayTimer !== null) {

            clearInterval(autoPlayTimer);

            autoPlayTimer = null;
        }
    }


    function restartAutoPlay() {

        stopAutoPlay();

        if (!isPaused) {
            startAutoPlay();
        }
    }


    /* =========================================
       HOVER = PAUSE
    ========================================= */

    slider.addEventListener(
        "mouseenter",
        function () {

            isPaused = true;

            stopAutoPlay();
        }
    );


    slider.addEventListener(
        "mouseleave",
        function () {

            isPaused = false;

            startAutoPlay();
        }
    );


    /* =========================================
       TOUCH / SWIPE
    ========================================= */

    let touchStartX = 0;
    let touchStartY = 0;


    slider.addEventListener(
        "touchstart",
        function (event) {

            const touch = event.changedTouches[0];

            touchStartX = touch.clientX;
            touchStartY = touch.clientY;

            stopAutoPlay();

        },
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        function (event) {

            const touch = event.changedTouches[0];

            const differenceX =
                touch.clientX - touchStartX;

            const differenceY =
                touch.clientY - touchStartY;


            /*
             * Only treat it as a swipe if the
             * horizontal movement is greater
             * than the vertical movement.
             */

            if (
                Math.abs(differenceX) > 50 &&
                Math.abs(differenceX) > Math.abs(differenceY)
            ) {

                if (differenceX < 0) {

                    nextSlide();

                } else {

                    previousSlide();
                }
            }


            if (!isPaused) {
                startAutoPlay();
            }

        },
        {
            passive: true
        }
    );


    /* =========================================
       WINDOW RESIZE
    ========================================= */

    let resizeTimer;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                function () {

                    updatePosition(false);

                },
                100
            );
        }
    );


    /* =========================================
       START
    ========================================= */

    startAutoPlay();

});