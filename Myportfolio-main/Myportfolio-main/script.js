// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinksElements = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const animatedElements = document.querySelectorAll('.animate-fadeInUp, .animate-fadeIn');
const skillProgressFills = document.querySelectorAll('.skill-progress-fill');
const backToTopButton = document.getElementById('back-to-top');
const themeToggle = document.getElementById('theme-toggle');

// Apply dark theme immediately
document.body.classList.add('dark-theme');

// Ensure mobile menu is closed initially
document.addEventListener('DOMContentLoaded', () => {
    if (navLinks) {
        navLinks.classList.remove('active');
    }
    if (hamburger) {
        hamburger.classList.remove('active');
    }
});

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        e.target !== hamburger && 
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navLinksElements.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update active link
            updateActiveLink(targetId);
        }
    });
});

// Update Active Navigation Link
function updateActiveLink(targetId) {
    navLinksElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Highlight Active Section on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    if (current) {
        updateActiveLink(`#${current}`);
    }
});

// Parallax Effect for Hero Section
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Typing Animation for Hero Title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation when the page loads
    window.addEventListener('load', typeWriter);
}

// Changing text animation for hero section
const changingText = document.getElementById('changing-text');
if (changingText) {
    const phrases = [
        'Artificial Intelligence',
        'Machine Learning',
        'Python Development',
        'Data Science',
        'Problem Solving'
    ];
    
    let currentPhraseIndex = 0;
    
    function changeText() {
        // Reset any animation
        changingText.style.animation = 'none';
        void changingText.offsetWidth; // Trigger reflow to restart animation
        
        // Update text and restart animation
        changingText.textContent = phrases[currentPhraseIndex];
        changingText.style.animation = 'typing 3s steps(30, end), blink-caret 0.5s step-end infinite';
        
        // Move to next phrase
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }
    
    // Initial call
    changeText();
    
    // Change text every 4 seconds
    setInterval(changeText, 4000);
}

// Animations on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let delay = 0;
            
            if (entry.target.classList.contains('delay-1')) delay = 0.1;
            else if (entry.target.classList.contains('delay-2')) delay = 0.2;
            else if (entry.target.classList.contains('delay-3')) delay = 0.3;
            else if (entry.target.classList.contains('delay-4')) delay = 0.4;
            else if (entry.target.classList.contains('delay-5')) delay = 0.5;
            
            if (entry.target.classList.contains('animate-fadeInUp')) {
                entry.target.style.animation = `fadeInUp 1s ${delay}s forwards`;
            } else if (entry.target.classList.contains('animate-fadeIn')) {
                entry.target.style.animation = `fadeIn 1s ${delay}s forwards`;
            }
        }
    });
}, { threshold: 0.1 });

// Observe all animated elements
animatedElements.forEach(element => {
    observer.observe(element);
});

// Skill Progress Animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target;
            const targetWidth = progressFill.style.width;
            
            // Reset width to 0 first
            progressFill.style.width = '0%';
            
            // Animate to target width
            setTimeout(() => {
                progressFill.style.width = targetWidth;
            }, 200);
            
            // Unobserve after animation
            progressObserver.unobserve(progressFill);
        }
    });
}, { threshold: 0.1 });

// Observe all progress bars
if (skillProgressFills && skillProgressFills.length > 0) {
    skillProgressFills.forEach(fill => {
        progressObserver.observe(fill);
    });
}

// Back to Top Button
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme Toggle (Light/Dark mode)
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Default to dark theme
        const savedTheme = localStorage.getItem('dark-theme');
        if (savedTheme === null || savedTheme === 'true') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('dark-theme', 'true');
        } else {
            document.body.classList.remove('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Add event listener to toggle theme
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            // Save theme preference to localStorage
            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('dark-theme', isDarkTheme);
            
            // Update toggle icon
            themeToggle.innerHTML = isDarkTheme ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
        });
    } else {
        // If toggle button doesn't exist, create it
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const themeBtn = document.createElement('button');
            themeBtn.id = 'theme-toggle';
            themeBtn.className = 'theme-toggle';
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            themeBtn.setAttribute('aria-label', 'Toggle theme');
            navbar.appendChild(themeBtn);
            
            // Re-run setup with newly created button
            setupThemeToggle();
        }
    }
}

// Apply theme from local storage on page load (with dark theme as default)
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('dark-theme');
    if (savedTheme === null || savedTheme === 'true') {
        document.body.classList.add('dark-theme');
        
        // Update toggle icon if it exists
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Save default preference
        localStorage.setItem('dark-theme', 'true');
    }
    
    setupThemeToggle();
    
    // Initialize skill progress animations
    const skillProgressFills = document.querySelectorAll('.skill-progress-fill');
    if (skillProgressFills.length > 0) {
        skillProgressFills.forEach(fill => {
            progressObserver.observe(fill);
        });
    }
});

// Project page hash navigation
if (window.location.pathname.includes('project.html') && window.location.hash) {
    window.addEventListener('load', function() {
        // Check if there's a hash in the URL
        if (window.location.hash) {
            // Small delay to ensure the page is fully loaded
            setTimeout(function() {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    });
} 
// ---------------------
// Project Filtering
// ---------------------
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        const categories = card.getAttribute("data-category").split(" ");

        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex"; // show card
          card.classList.add("show-card");
          card.classList.remove("hide-card");
        } else {
          card.classList.add("hide-card");
          setTimeout(() => {
            card.style.display = "none"; // hide after fade
          }, 300);
        }
      });
    });
  });
});
