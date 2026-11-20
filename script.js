/* =========================================
   73-DIUM SCHOOL WEBSITE
   JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       PRELOADER
    ========================================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("hide");
            }
        }, 1000);
    });


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const header = document.getElementById("header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
        });

        const navLinks = navigation.querySelectorAll(".nav-link");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("open");
            });
        });
    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       3D SCHOOL CARD
    ========================================= */

    const schoolCard = document.getElementById("schoolCard");

    if (schoolCard && window.innerWidth > 760) {

        document.addEventListener("mousemove", (event) => {

            const x = (window.innerWidth / 2 - event.clientX) / 35;
            const y = (window.innerHeight / 2 - event.clientY) / 35;

            schoolCard.style.transform = `
                rotateY(${-x}deg)
                rotateX(${y}deg)
                translateZ(0)
            `;

        });

        document.addEventListener("mouseleave", () => {

            schoolCard.style.transform = `
                rotateY(0deg)
                rotateX(0deg)
            `;

        });
    }


    /* =========================================
       FLOATING ELEMENT PARALLAX
    ========================================= */

    const floatingElements = document.querySelectorAll(".floating-element");

    if (floatingElements.length > 0 && window.innerWidth > 760) {

        document.addEventListener("mousemove", (event) => {

            const mouseX = (event.clientX / window.innerWidth - 0.5);
            const mouseY = (event.clientY / window.innerHeight - 0.5);

            floatingElements.forEach((element, index) => {

                const speed = (index + 1) * 10;

                element.style.transform = `
                    translate(
                        ${mouseX * speed}px,
                        ${mouseY * speed}px
                    )
                `;

            });

        });
    }


    /* =========================================
       COUNTER ANIMATION
    ========================================= */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.target);

                let current = 0;
                const duration = 1800;
                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const easedProgress =
                        1 - Math.pow(1 - progress, 3);

                    current = Math.floor(
                        easedProgress * target
                    );

                    counter.textContent =
                        current.toLocaleString("uz-UZ");

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent =
                            target.toLocaleString("uz-UZ");
                    }
                }

                requestAnimationFrame(updateCounter);

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".info-card, .teacher-card, .achievement, .news-card, .contact-box"
    );

    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(35px)";
        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================================
       MAGNETIC BUTTONS
    ========================================= */

    const buttons = document.querySelectorAll(
        ".btn, .back-top"
    );

    if (window.innerWidth > 760) {

        buttons.forEach(button => {

            button.addEventListener("mousemove", event => {

                const rect = button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });

    }


    /* =========================================
       CUSTOM CURSOR
    ========================================= */

    const cursorDot = document.getElementById("cursorDot");
    const cursorRing = document.getElementById("cursorRing");

    if (
        cursorDot &&
        cursorRing &&
        window.innerWidth > 760
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });

        function animateCursor() {

            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        const interactiveElements = document.querySelectorAll(
            "a, button, .info-card, .teacher-card, .achievement, .news-card, .school-card"
        );

        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursorRing.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cursorRing.classList.remove("hover");
            });

        });

    }


    /* =========================================
       BACK TO TOP
    ========================================= */

    const backTop = document.getElementById("backTop");

    if (backTop) {

        backTop.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       CARD 3D TILT
    ========================================= */

    const cards = document.querySelectorAll(
        ".info-card, .teacher-card, .achievement, .news-card"
    );

    if (window.innerWidth > 760) {

        cards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect = card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    (y - centerY) / 20;

                const rotateY =
                    (centerX - x) / 20;

                card.style.transform = `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                `;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =========================================
       MOUSE LIGHT EFFECT
    ========================================= */

    const body = document.body;

    if (window.innerWidth > 760) {

        document.addEventListener("mousemove", event => {

            const x =
                (event.clientX / window.innerWidth) * 100;

            const y =
                (event.clientY / window.innerHeight) * 100;

            body.style.setProperty("--mouse-x", `${x}%`);
            body.style.setProperty("--mouse-y", `${y}%`);

        });

    }


    /* =========================================
       KEYBOARD ESCAPE
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navigation) {
                navigation.classList.remove("open");
            }

        }

    });


    /* =========================================
       CONSOLE MESSAGE
    ========================================= */

    console.log(
        "%c73-DIUM",
        "font-size: 30px; font-weight: 900; color: #4f8cff;"
    );

    console.log(
        "%cZamonaviy maktab sayti ishga tushdi!",
        "font-size: 14px; color: #35d9ff;"
    );

});

