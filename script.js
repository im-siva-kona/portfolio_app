$(document).ready(function() {

  // Sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  // Smooth scrolling when clicking on header links
  $(".navbar li a").click(function(e) {
    e.preventDefault();

    var target = $(this).attr("href");

    // Check if target section is already active
    if ($(target).hasClass("active-section")) {
      return; 
    }

    var offset = 0;
    if (target !== "#home") {
      offset = $(target).offset().top - 40;
    }

    // Smooth scroll animation
    $("html, body").animate(
      {
        scrollTop: offset
      },
      500,
      function() {
        // Callback function to update active class after scrolling
        $(".navbar li a").removeClass("active");
        $(target).addClass("active-section");
        $(target).siblings().removeClass("active-section");
        updateActiveSection();
      }
    );

    // Add active class to clicked header link
    $(".navbar li a").removeClass("active");
    $(this).addClass("active");
  });

  // Initial content revealing with ScrollReveal.js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".profile-photo, .profile-text", {
    origin: "left"
  });
  ScrollReveal().reveal(".about-content, .about-skills", {
    origin: "right"
  });
  ScrollReveal().reveal(".timeline-item", {
    origin: "bottom"
  });

  // Contact form submission to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.querySelector('.contact-form');
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(function() {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch(error => console.error('Error!', error.message));
  });

});

// Function to update active section in the header based on scroll position
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".navbar li a").removeClass("active");
    $(".navbar li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function() {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".navbar li a").removeClass("active");
      $(".navbar li a[href='#" + target + "']").addClass("active");
    }
  });
}
