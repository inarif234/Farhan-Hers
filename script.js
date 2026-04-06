document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENT ================= */
    const mobileMenu = document.getElementById("mobileMenu");
    const menuBtn = document.getElementById("menuBtn");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const contactModal = document.getElementById("contactModal");

    /* ================= SMOOTH SCROLL ================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Tutup mobile menu kalau klik link
            mobileMenu?.classList.add("hidden");
        });
    });

    /* ================= MOBILE MENU ================= */
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    /* ================= CONTACT MODAL ================= */
    function openContactModal() {
        contactModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeContactModal() {
        contactModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    /* ================= LIGHTBOX ================= */
    function openLightbox(src) {
        if (!lightbox || !lightboxImg) return;
        lightbox.classList.add("active");
        lightboxImg.src = src;
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    document.querySelectorAll(".work-item img").forEach(img => {
        img.addEventListener("click", (e) => {
            e.stopPropagation();
            openLightbox(img.src);
        });
    });

    /* ================= LOAD MORE ================= */
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            document.querySelectorAll(".work-item.extra").forEach(item => {
                item.classList.remove("hidden");
            });
            loadMoreBtn.style.display = "none";
        });
    }

    /* ================= FADE IN ================= */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

    /* ================= GLOBAL ACCESS ================= */
    window.openContactModal = openContactModal;
    window.closeContactModal = closeContactModal;
    window.closeLightbox = closeLightbox;

    /* ================= GALLERY VIEWER ================= */

    const viewer = document.getElementById("galleryViewer");
    const viewerImg = document.getElementById("viewerImg");
    const images = document.querySelectorAll(".work-item img");

    let currentIndex = 0;

    // OPEN VIEWER
    images.forEach((img, index) => {
        img.addEventListener("click", (e) => {
            e.stopPropagation();
            viewer.style.display = "flex";
            viewerImg.src = img.src;
            currentIndex = index;
            document.body.style.overflow = "hidden";
        });
    });

    // CLOSE VIEWER
    function closeViewer() {
        viewer.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // NEXT
    function nextImg() {
        currentIndex = (currentIndex + 1) % images.length;
        viewerImg.src = images[currentIndex].src;
    }

    // PREV
    function prevImg() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        viewerImg.src = images[currentIndex].src;
    }

    /* ================= BUTTON ================= */

    document.getElementById("nextBtn").onclick = (e) => {
        e.stopPropagation();
        nextImg();
    };

    document.getElementById("prevBtn").onclick = (e) => {
        e.stopPropagation();
        prevImg();
    };

    /* ================= CLICK OUTSIDE CLOSE ================= */

    viewer.addEventListener("click", (e) => {
        if (e.target === viewer) {
            closeViewer();
        }
    });

    /* ================= SWIPE MOBILE ================= */

    let startX = 0;

    viewer.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    viewer.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) {
            nextImg();
        } else if (endX - startX > 50) {
            prevImg();
        }
    });

    /* ================= GLOBAL ================= */
    window.closeViewer = closeViewer;

});