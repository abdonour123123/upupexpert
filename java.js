const playBtn = document.querySelector(".play-button .btn");
const modal = document.getElementById("gifModal");
const closeBtn = document.querySelector("#gifModal .close");

// Open modal on button click
playBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close modal when clicking "X"
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Optional: close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const menuBar = document.getElementById("menuBar");
const dropdownBox = document.getElementById("dropdownBox");

menuBar.addEventListener("click", () => {
  dropdownBox.classList.toggle("show");
});

// Close dropdown if clicking outside
window.addEventListener("click", (e) => {
  if (!menuBar.contains(e.target) && !dropdownBox.contains(e.target)) {
    dropdownBox.classList.remove("show");
  }
});

const counters = document.querySelectorAll(".award-nums span, .award-total");
const section = document.querySelector(".award-section");

let started = false;

const startCounting = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    let count = 0;

    const updateCount = () => {
      const increment = target / 60;

      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !started) {
      startCounting();
      started = true; // prevents re-trigger
    }
  },
  {
    threshold: 0.5,
  },
);

observer.observe(section);

const logoParts = document.querySelectorAll(".logo-part");
const circles = document.querySelectorAll(".circle");

const orgBtn = document.getElementById("org-logos");
const techBtn = document.getElementById("tech-logos");

function showPage(pageNumber) {
  logoParts.forEach((part) => part.classList.remove("active"));
  circles.forEach((circle) => circle.classList.remove("active"));

  document.getElementById(`logo-part-${pageNumber}`).classList.add("active");

  document
    .querySelector(`.circle[data-page="${pageNumber}"]`)
    .classList.add("active");
}

// Organizations → Page 1
orgBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showPage(1);
});

// Technology → Page 2
techBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showPage(2);
});

// Circles
circles.forEach((circle) => {
  circle.addEventListener("click", () => {
    const page = circle.dataset.page;
    showPage(page);
  });
});

techBtn.addEventListener("click", () => {
  console.log("Technology clicked");
  showPage(2);
});

const logoTrack = document.querySelector(".logo-track");
function showPage(pageNumber) {
  logoTrack.style.transform = `translateX(-${(pageNumber - 1) * 100}%)`;
}

orgBtn.addEventListener("click", () => showPage(1));
techBtn.addEventListener("click", () => showPage(2));

const testimonials = document.querySelectorAll(".testimonial-box");

// Track current active testimonial
let currentIndex = 0;

// Function to show testimonial
function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove("active");
    if (i === index) t.classList.add("active");
  });
}

// Show first testimonial initially
showTestimonial(currentIndex);

// Add event listeners to all arrows
testimonials.forEach((testimonial, index) => {
  const next = testimonial.querySelector(".right-arrow");
  const prev = testimonial.querySelector(".left-arrow");

  if (next) {
    next.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });
  }

  if (prev) {
    prev.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });
  }
});
