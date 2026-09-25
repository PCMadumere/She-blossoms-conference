"use strict";


/* ============================================================
   SHE BLOSSOMS '26
   CARD GENERATOR
============================================================ */


/* ============================================================
   CONFERENCE
============================================================ */

const CONFERENCE = {

    name: "She Blossoms '26",

    organisation:
        "WORDFEAST GOSPEL NETWORK, AWKA",

    date:
        "Friday 23 & Saturday 24 October 2026",

    venue:
        "Alexander David's Event Place, Agu-Awka"

};


/* ============================================================
   COLOURS
   SAME BLUE + PINK DIRECTION AS SHOP
============================================================ */

const COLORS = {

    navy: "#071941",

    blue: "#123B82",

    blueLight: "#2467BD",

    pink: "#EC4899",

    pinkLight: "#FFB6DF",

    white: "#FFFFFF"

};


/* ============================================================
   CANVAS
============================================================ */

const canvas =
    document.getElementById("cardCanvas");

const ctx =
    canvas.getContext("2d", {
        alpha: false,
        desynchronized: false
    });

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";


const CANVAS_SIZE = 1080;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


/* ============================================================
   ELEMENTS
============================================================ */

const attendeeName =
    document.getElementById("attendeeName");

const photoUpload =
    document.getElementById("photoUpload");

const photoUploadBox =
    document.getElementById("photoUploadBox");

const photoZoom =
    document.getElementById("photoZoom");

const zoomValue =
    document.getElementById("zoomValue");

const downloadButton =
    document.getElementById("downloadCard");

const shareButton =
    document.getElementById("shareCard");

const resetButton =
    document.getElementById("resetCard");

const message =
    document.getElementById("creatorMessage");

const canvasHint =
    document.getElementById("canvasHint");

const year =
    document.getElementById("year");


/* ============================================================
   STATE
============================================================ */

let userPhoto = null;

let photoScale = 1;

let photoOffsetX = 0;

let photoOffsetY = 0;

let dragging = false;

let dragStartX = 0;

let dragStartY = 0;

let startingOffsetX = 0;

let startingOffsetY = 0;


/* ============================================================
   YEAR
============================================================ */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* ============================================================
   MESSAGE
============================================================ */

function showMessage(
    text,
    error = false
) {

    if (!message) return;

    message.textContent = text;

    message.style.color =
        error
            ? COLORS.pink
            : COLORS.blue;

}


/* ============================================================
   LOAD IMAGE
============================================================ */

function loadImage(file) {

    return new Promise(
        (resolve, reject) => {

            if (!file) {

                reject(
                    new Error(
                        "No image selected."
                    )
                );

                return;

            }


            if (!file.type.startsWith("image/")) {

                reject(
                    new Error(
                        "Please select an image file."
                    )
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const image =
                        new Image();


                    image.onload =
                        function () {

                            resolve(image);

                        };


                    image.onerror =
                        function () {

                            reject(
                                new Error(
                                    "Unable to load this image."
                                )
                            );

                        };


                    image.src =
                        event.target.result;

                };


            reader.onerror =
                function () {

                    reject(
                        new Error(
                            "Unable to read the image."
                        )
                    );

                };


            reader.readAsDataURL(file);

        }
    );

}


/* ============================================================
   DRAW COVER IMAGE
============================================================ */

function drawCoverImage(
    context,
    image,
    x,
    y,
    width,
    height
) {

    const imageRatio =
        image.width /
        image.height;

    const targetRatio =
        width /
        height;


    let sourceWidth;

    let sourceHeight;

    let sourceX;

    let sourceY;


    if (imageRatio > targetRatio) {

        sourceHeight =
            image.height;

        sourceWidth =
            image.height *
            targetRatio;

        sourceX =
            (image.width -
                sourceWidth) /
            2;

        sourceY = 0;

    } else {

        sourceWidth =
            image.width;

        sourceHeight =
            image.width /
            targetRatio;

        sourceX = 0;

        sourceY =
            (image.height -
                sourceHeight) /
            2;

    }


    context.drawImage(

        image,

        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,

        x,
        y,
        width,
        height

    );

}


/* ============================================================
   FIXED CARD BACKGROUND
   NO USER BACKGROUND IMAGE
============================================================ */

function drawCardBackground() {

    const width =
        CANVAS_SIZE;

    const height =
        CANVAS_SIZE;


    /*
     * Main blue background
     */

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            width,
            height
        );


    gradient.addColorStop(
        0,
        COLORS.navy
    );


    gradient.addColorStop(
        0.45,
        COLORS.blue
    );


    gradient.addColorStop(
        1,
        COLORS.blueLight
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
     * Pink glow - top right
     */

    const pinkGlow =
        ctx.createRadialGradient(
            850,
            110,
            20,
            850,
            110,
            500
        );


    pinkGlow.addColorStop(
        0,
        "rgba(236,72,153,0.42)"
    );


    pinkGlow.addColorStop(
        1,
        "rgba(236,72,153,0)"
    );


    ctx.fillStyle =
        pinkGlow;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
     * Pink glow - lower left
     */

    const secondPinkGlow =
        ctx.createRadialGradient(
            100,
            930,
            20,
            100,
            930,
            430
        );


    secondPinkGlow.addColorStop(
        0,
        "rgba(236,72,153,0.25)"
    );


    secondPinkGlow.addColorStop(
        1,
        "rgba(236,72,153,0)"
    );


    ctx.fillStyle =
        secondPinkGlow;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
     * Soft diagonal pink layer
     */

    const pinkLayer =
        ctx.createLinearGradient(
            0,
            0,
            width,
            height
        );


    pinkLayer.addColorStop(
        0,
        "rgba(236,72,153,0)"
    );


    pinkLayer.addColorStop(
        0.55,
        "rgba(236,72,153,0)"
    );


    pinkLayer.addColorStop(
        1,
        "rgba(236,72,153,0.18)"
    );


    ctx.fillStyle =
        pinkLayer;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );

}


/* ============================================================
   CARD BORDER
============================================================ */

function drawBorder() {

    const outer =
        30;


    /*
     * Pink outer border
     */

    ctx.save();

    ctx.strokeStyle =
        "rgba(255,182,223,0.95)";

    ctx.lineWidth =
        7;

    ctx.strokeRect(
        outer,
        outer,
        CANVAS_SIZE - outer * 2,
        CANVAS_SIZE - outer * 2
    );


    /*
     * Thin blue inner border
     */

    ctx.strokeStyle =
        "rgba(255,255,255,0.28)";

    ctx.lineWidth =
        2;

    ctx.strokeRect(
        outer + 17,
        outer + 17,
        CANVAS_SIZE -
            (outer + 17) * 2,
        CANVAS_SIZE -
            (outer + 17) * 2
    );

    ctx.restore();

}


/* ============================================================
   HEADER
============================================================ */

function drawHeader() {

    const center =
        CANVAS_SIZE / 2;


    ctx.save();


    /*
     * Organisation
     */

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillStyle =
        "rgba(255,255,255,0.76)";

    ctx.font =
        '600 15px "DM Sans", sans-serif';


    ctx.fillText(
        CONFERENCE.organisation,
        center,
        88
    );


    /*
     * Small pink line
     */

    ctx.strokeStyle =
        COLORS.pinkLight;

    ctx.lineWidth =
        2;


    ctx.beginPath();

    ctx.moveTo(
        center - 30,
        112
    );

    ctx.lineTo(
        center + 30,
        112
    );

    ctx.stroke();


    /*
     * Conference title
     */

    ctx.fillStyle =
        COLORS.white;

    ctx.font =
        '600 66px "Playfair Display", Georgia, serif';


    ctx.fillText(
        CONFERENCE.name,
        center,
        168
    );


    ctx.restore();

}


/* ============================================================
   PHOTO
============================================================ */

function drawPhoto() {

    const centerX = CANVAS_SIZE / 2;
    const centerY = 425;
    const radius = 148;

    /*
     * No photo uploaded
     */

    if (!userPhoto) {

        ctx.save();

        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            radius + 20,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle = COLORS.pinkLight;
        ctx.lineWidth = 7;
        ctx.stroke();


        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            radius + 9,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 5;
        ctx.stroke();


        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(255,255,255,0.10)";
        ctx.fill();


        ctx.fillStyle = "rgba(255,255,255,0.70)";
        ctx.font =
            '600 18px "DM Sans", sans-serif';

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            "YOUR PHOTO",
            centerX,
            centerY
        );

        ctx.restore();

        return;
    }


    /*
     * --------------------------------------------------------
     * PHOTO SHADOW
     * --------------------------------------------------------
     */

    ctx.save();

    ctx.shadowColor =
        "rgba(0, 0, 0, 0.35)";

    ctx.shadowBlur =
        24;

    ctx.shadowOffsetY =
        12;

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius + 5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "rgba(0,0,0,0.15)";

    ctx.fill();

    ctx.restore();


    /*
     * --------------------------------------------------------
     * CLIP PHOTO TO CIRCLE
     * --------------------------------------------------------
     */

    ctx.save();

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.clip();


    /*
     * High-quality image smoothing
     */

    ctx.imageSmoothingEnabled = true;

    ctx.imageSmoothingQuality = "high";


    /*
     * --------------------------------------------------------
     * PROPER COVER CALCULATION
     * --------------------------------------------------------
     */

    const targetSize =
        radius * 2;


    const imageWidth =
        userPhoto.naturalWidth ||
        userPhoto.width;


    const imageHeight =
        userPhoto.naturalHeight ||
        userPhoto.height;


    /*
     * Scale the image so the entire circle
     * is covered without unnecessary enlargement.
     */

    const scale =
        Math.max(
            targetSize / imageWidth,
            targetSize / imageHeight
        ) * photoScale;


    const drawWidth =
        imageWidth * scale;


    const drawHeight =
        imageHeight * scale;


    /*
     * Centre the image.
     */

    const drawX =
        centerX -
        drawWidth / 2 +
        photoOffsetX;


    const drawY =
        centerY -
        drawHeight / 2 +
        photoOffsetY;


    /*
     * --------------------------------------------------------
     * PHOTO ENHANCEMENT
     * --------------------------------------------------------
     *
     * Very subtle enhancement.
     * This helps avoid the washed-out / flat look.
     */

    ctx.filter =
        "contrast(1.06) saturate(1.05)";


    ctx.drawImage(
        userPhoto,
        drawX,
        drawY,
        drawWidth,
        drawHeight
    );


    ctx.filter =
        "none";


    ctx.restore();


    /*
     * --------------------------------------------------------
     * PHOTO RINGS
     * --------------------------------------------------------
     */

    ctx.save();


    /*
     * Pink outer ring
     */

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius + 20,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        COLORS.pinkLight;

    ctx.lineWidth =
        7;

    ctx.stroke();


    /*
     * White ring
     */

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius + 9,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.95)";

    ctx.lineWidth =
        5;

    ctx.stroke();


    /*
     * Very subtle inner edge
     */

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius - 2,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(7,25,65,0.20)";

    ctx.lineWidth =
        3;

    ctx.stroke();


    ctx.restore();

}


/* ============================================================
   NAME
============================================================ */

function drawName() {

    const center =
        CANVAS_SIZE / 2;


    /*
     * Photo bottom:
     *
     * 425 + 148 = 573
     *
     * Name baseline:
     *
     * 573 + 75 = 648
     *
     * This gives the photo and name
     * a proper visible gap.
     */

    const nameY =
        648;


    let name =
        attendeeName.value.trim();


    if (!name) {

        name =
            "Your Name";

    }


    let fontSize =
        53;


    if (name.length > 25) {

        fontSize =
            45;

    }


    if (name.length > 31) {

        fontSize =
            39;

    }


    ctx.save();


    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    /*
     * Name shadow
     */

    ctx.shadowColor =
        "rgba(0,0,0,0.28)";

    ctx.shadowBlur =
        8;

    ctx.shadowOffsetY =
        2;


    ctx.fillStyle =
        COLORS.white;


    ctx.font =
        `600 ${fontSize}px "Playfair Display", Georgia, serif`;


    ctx.fillText(
        name,
        center,
        nameY
    );


    ctx.restore();


    /*
     * I WILL BE THERE
     */

    ctx.save();


    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.shadowColor =
        "transparent";


    ctx.fillStyle =
        COLORS.pinkLight;


    ctx.font =
        '600 18px "DM Sans", sans-serif';


    ctx.fillText(
        "I  W I L L  B E  T H E R E",
        center,
        nameY + 58
    );


    ctx.restore();

}


/* ============================================================
   DATE + VENUE
============================================================ */

function drawDetails() {

    const center =
        CANVAS_SIZE / 2;


    ctx.save();


    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    /*
     * Date
     */

    ctx.fillStyle =
        "rgba(255,255,255,0.90)";

    ctx.font =
        '500 18px "DM Sans", sans-serif';


    ctx.fillText(
        CONFERENCE.date,
        center,
        795
    );


    /*
     * Venue
     */

    ctx.fillStyle =
        "rgba(255,255,255,0.70)";

    ctx.font =
        '400 16px "DM Sans", sans-serif';


    ctx.fillText(
        CONFERENCE.venue,
        center,
        829
    );


    ctx.restore();

}


/* ============================================================
   CARD FOOTER
============================================================ */

function drawCardFooter() {

    const center =
        CANVAS_SIZE / 2;


    ctx.save();


    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.fillStyle =
        "rgba(255,182,223,0.78)";


    ctx.font =
        '600 11px "DM Sans", sans-serif';


    ctx.fillText(
        CONFERENCE.organisation,
        center,
        1000
    );


    ctx.restore();

}


/* ============================================================
   DRAW COMPLETE CARD
============================================================ */

function drawCard() {

    /*
     * Fixed background
     */

    drawCardBackground();


    /*
     * Border
     */

    drawBorder();


    /*
     * Header
     */

    drawHeader();


    /*
     * Photo
     */

    drawPhoto();


    /*
     * Name
     */

    drawName();


    /*
     * Conference details
     */

    drawDetails();


    /*
     * Footer
     */

    drawCardFooter();


    /*
     * Canvas hint
     */

    if (canvasHint) {

        if (userPhoto) {

            canvasHint.classList.add(
                "hidden"
            );

        } else {

            canvasHint.classList.remove(
                "hidden"
            );

        }

    }

}


/* ============================================================
   PHOTO UPLOAD
============================================================ */

photoUpload?.addEventListener(
    "change",
    async function (event) {

        const file =
            event.target.files?.[0];


        if (!file) return;


        try {

            userPhoto =
                await loadImage(file);


            /*
             * Reset positioning
             */

            photoScale =
                1;

            photoOffsetX =
                0;

            photoOffsetY =
                0;


            photoZoom.value =
                100;

            zoomValue.textContent =
                "100%";


            /*
             * Update upload UI
             */

            photoUploadBox.innerHTML = `

                <span class="upload-plus">
                    ✓
                </span>

                <strong>
                    Photo uploaded
                </strong>

                <small>
                    Click to choose another
                </small>

            `;


            drawCard();


            showMessage(
                "Photo added. You can drag it on the card."
            );


        } catch (error) {

            showMessage(
                error.message ||
                "Unable to load your photo.",
                true
            );

        }

    }
);


/* ============================================================
   NAME
============================================================ */

attendeeName?.addEventListener(
    "input",
    function () {

        drawCard();

    }
);


/* ============================================================
   ZOOM
============================================================ */

photoZoom?.addEventListener(
    "input",
    function () {

        const value =
            Number(
                photoZoom.value
            );


        photoScale =
            value / 100;


        zoomValue.textContent =
            `${value}%`;


        drawCard();

    }
);


/* ============================================================
   CANVAS POSITION
============================================================ */

function getCanvasPoint(event) {

    const rect =
        canvas.getBoundingClientRect();


    return {

        x:
            (
                event.clientX -
                rect.left
            ) *
            (
                canvas.width /
                rect.width
            ),

        y:
            (
                event.clientY -
                rect.top
            ) *
            (
                canvas.height /
                rect.height
            )

    };

}


/* ============================================================
   CHECK PHOTO AREA
============================================================ */

function isPhotoArea(
    x,
    y
) {

    const centerX =
        CANVAS_SIZE / 2;

    const centerY =
        425;

    const radius =
        175;


    const distance =
        Math.sqrt(

            Math.pow(
                x - centerX,
                2
            )

            +

            Math.pow(
                y - centerY,
                2
            )

        );


    return (
        distance <=
        radius
    );

}


/* ============================================================
   DRAG START
============================================================ */

canvas.addEventListener(
    "pointerdown",
    function (event) {

        if (!userPhoto) return;


        const point =
            getCanvasPoint(event);


        if (
            !isPhotoArea(
                point.x,
                point.y
            )
        ) {

            return;

        }


        dragging =
            true;


        canvas.classList.add(
            "dragging"
        );


        canvas.setPointerCapture(
            event.pointerId
        );


        dragStartX =
            point.x;

        dragStartY =
            point.y;


        startingOffsetX =
            photoOffsetX;

        startingOffsetY =
            photoOffsetY;

    }
);


/* ============================================================
   DRAG MOVE
============================================================ */

canvas.addEventListener(
    "pointermove",
    function (event) {

        if (!dragging) return;


        const point =
            getCanvasPoint(event);


        photoOffsetX =
            startingOffsetX +
            (
                point.x -
                dragStartX
            );


        photoOffsetY =
            startingOffsetY +
            (
                point.y -
                dragStartY
            );


        /*
         * Limit movement
         */

        photoOffsetX =
            Math.max(
                -145,
                Math.min(
                    145,
                    photoOffsetX
                )
            );


        photoOffsetY =
            Math.max(
                -145,
                Math.min(
                    145,
                    photoOffsetY
                )
            );


        drawCard();

    }
);


/* ============================================================
   DRAG END
============================================================ */

canvas.addEventListener(
    "pointerup",
    function (event) {

        dragging =
            false;


        canvas.classList.remove(
            "dragging"
        );


        try {

            canvas.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {

            // Nothing required.

        }

    }
);


canvas.addEventListener(
    "pointercancel",
    function () {

        dragging =
            false;


        canvas.classList.remove(
            "dragging"
        );

    }
);


/* ============================================================
   FILE NAME
============================================================ */

function cleanFileName(
    name
) {

    return name

        .trim()

        .replace(
            /[^a-zA-Z0-9]+/g,
            "-"
        )

        .replace(
            /^-+|-+$/g,
            ""
        )

        .toLowerCase();

}


/* ============================================================
   DOWNLOAD
============================================================ */

downloadButton?.addEventListener(
    "click",
    function () {

        const name =
            attendeeName.value.trim();


        if (!name) {

            showMessage(
                "Please enter your name first.",
                true
            );

            attendeeName.focus();

            return;

        }


        if (!userPhoto) {

            showMessage(
                "Please upload your photo first.",
                true
            );

            return;

        }


        canvas.toBlob(
            function (blob) {

                if (!blob) {

                    showMessage(
                        "Unable to create the card.",
                        true
                    );

                    return;

                }


                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                const safeName =
                    cleanFileName(
                        name
                    ) ||
                    "attendee";


                link.href =
                    url;


                link.download =
                    `she-blossoms-26-${safeName}.png`;


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                setTimeout(
                    function () {

                        URL.revokeObjectURL(
                            url
                        );

                    },
                    1000
                );


                showMessage(
                    "Your card has been downloaded."
                );

            },
            "image/png"
        );

    }
);


/* ============================================================
   SHARE
============================================================ */

shareButton?.addEventListener(
    "click",
    async function () {

        const name =
            attendeeName.value.trim();


        if (!name) {

            showMessage(
                "Please enter your name first.",
                true
            );

            return;

        }


        if (!userPhoto) {

            showMessage(
                "Please upload your photo first.",
                true
            );

            return;

        }


        canvas.toBlob(
            async function (blob) {

                if (!blob) return;


                const safeName =
                    cleanFileName(
                        name
                    ) ||
                    "attendee";


                const file =
                    new File(
                        [
                            blob
                        ],
                        `she-blossoms-26-${safeName}.png`,
                        {
                            type:
                                "image/png"
                        }
                    );


                /*
                 * Native share
                 */

                if (
                    navigator.share &&
                    navigator.canShare &&
                    navigator.canShare({
                        files:
                            [file]
                    })
                ) {

                    try {

                        await navigator.share({

                            title:
                                "She Blossoms '26",

                            text:
                                "I will be at She Blossoms '26!",

                            files:
                                [file]

                        });


                        showMessage(
                            "Card shared successfully."
                        );


                        return;

                    } catch (error) {

                        if (
                            error.name ===
                            "AbortError"
                        ) {

                            return;

                        }

                    }

                }


                /*
                 * Fallback:
                 * download the card.
                 */

                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;


                link.download =
                    `she-blossoms-26-${safeName}.png`;


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                setTimeout(
                    function () {

                        URL.revokeObjectURL(
                            url
                        );

                    },
                    1000
                );


                showMessage(
                    "Sharing is not available here, so the card was downloaded instead."
                );

            },
            "image/png"
        );

    }
);


/* ============================================================
   RESET
============================================================ */

resetButton?.addEventListener(
    "click",
    function () {

        userPhoto =
            null;


        photoScale =
            1;


        photoOffsetX =
            0;


        photoOffsetY =
            0;


        attendeeName.value =
            "";


        photoUpload.value =
            "";


        photoZoom.value =
            100;


        zoomValue.textContent =
            "100%";


        photoUploadBox.innerHTML = `

            <span class="upload-plus">
                +
            </span>

            <strong>
                Upload your photo
            </strong>

            <small>
                JPG, PNG or WEBP
            </small>

        `;


        drawCard();


        showMessage(
            "Your card has been reset."
        );

    }
);


/* ============================================================
   MOBILE NAVIGATION
============================================================ */

const menuButton =
    document.getElementById(
        "cardMenuButton"
    );

const cardNav =
    document.getElementById(
        "cardNav"
    );


menuButton?.addEventListener(
    "click",
    function () {

        const open =
            cardNav.classList.toggle(
                "card-mobile-open"
            );


        menuButton.setAttribute(
            "aria-expanded",
            String(open)
        );


        menuButton.setAttribute(
            "aria-label",
            open
                ? "Close menu"
                : "Open menu"
        );

    }
);


/* ============================================================
   INITIAL DRAW
============================================================ */

drawCard();