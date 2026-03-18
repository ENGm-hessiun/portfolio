// ================= Smooth Scroll with Navbar Offset =================
const navbar = document.querySelector('.navbar');
let navbarHeight = navbar.offsetHeight;

function smoothScroll() {
  document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      const targetPosition = target.offsetTop - navbarHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      if(window.innerWidth <= 768){
        navbar.classList.remove('active');
      }
    });
  });
}

// ================= Scroll Animation =================
const sections = document.querySelectorAll("section");

function handleScroll() {

  sections.forEach(sec => {

    const top = sec.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){
      sec.classList.add("show");
    }

  });

  // Navbar Active Links
  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - navbarHeight - 5;

    if(window.pageYOffset >= sectionTop){
      current = section.getAttribute("id");
    }

  });

  document.querySelectorAll(".navbar a").forEach(link => {

    link.classList.remove("active");

    if(link.getAttribute("href") === "#" + current){
      link.classList.add("active");
    }

  });

}

// ================= Counters =================
let countersStarted = false;

function startCounters(){

  const statsSection = document.querySelector(".stats");

  if(!statsSection) return;

  const position = statsSection.getBoundingClientRect().top;

  if(position < window.innerHeight && !countersStarted){

    countersStarted = true;

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

      counter.innerText = "0";

      const target = +counter.getAttribute("data-target");

      const increment = target / 100;

      const update = () => {

        const current = +counter.innerText;

        if(current < target){

          counter.innerText = Math.ceil(current + increment);

          setTimeout(update, 20);

        }else{

          counter.innerText = target;

        }

      };

      update();

    });

  }

}

// ================= Projects Filter =================
function filterProjects(category){

  document.querySelectorAll(".card").forEach(card => {

    if(category === "all" || card.classList.contains(category)){
      card.style.display = "block";
    }else{
      card.style.display = "none";
    }

  });

}

// ================= Particles Background =================
particlesJS("particles-js", {

  particles: {
    number: { value: 80 },
    color: { value: "#38bdf8" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: { enable: true, distance: 150, color: "#38bdf8" },
    move: { enable: true, speed: 2 }
  }

});

// ================= Contact Form =================
const contactForm = document.querySelector(".contact-form");

if(contactForm){

  contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    emailjs.sendForm(
      "service_8db6q9x",
      "template_vsyc67d",
      this
    ).then(function(){

      alert("Message sent successfully ✅");
      contactForm.reset();

    }, function(error){

      alert("Failed to send message ❌");
      console.log(error);

    });

  });

}

// ================= Mobile Menu =================
function toggleMenu(){

  navbar.classList.toggle("active");

}

document.querySelector(".menu-icon")?.addEventListener("click", toggleMenu);

// ================= Events =================
window.addEventListener("scroll", () => {

  handleScroll();
  startCounters();

});

window.addEventListener("resize", () => {

  navbarHeight = navbar.offsetHeight;

  handleScroll();

});

window.addEventListener("load", () => {

  smoothScroll();
  handleScroll();
  startCounters();

});