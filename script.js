/* ================= DESKTOP SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* ================= MOBILE SCROLL ================= */
document.querySelectorAll('#mobileMenu a').forEach(item => {
    item.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    function openContactModal() {
        document.getElementById('contactModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeContactModal() {
        document.getElementById('contactModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    function closeLightbox() {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    /* ================= MOBILE MENU ================= */
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
        document.querySelectorAll("#mobileMenu a, #mobileMenu button").forEach(item => {
            item.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });
    }

    /* ================= FADE IN ================= */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    /* ================= LIGHTBOX ================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    document.querySelectorAll('.work-item img').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            lightbox.classList.add('active');
            lightboxImg.src = item.src;
            document.body.style.overflow = 'hidden';
        });
    });

    
    // Biar bisa dipanggil dari HTML
    window.openContactModal = openContactModal;
    window.closeContactModal = closeContactModal;
    window.closeLightbox = closeLightbox;
});

/* ================= LOAD MORE ================= */
const loadMoreBtn = document.getElementById("loadMoreBtn");

if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
        document.querySelectorAll(".work-item.extra").forEach(item => {
            item.classList.remove("hidden");
        });

        loadMoreBtn.style.display = "none";
    });
}
