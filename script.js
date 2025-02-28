document.addEventListener('DOMContentLoaded', function() {
    
    const sidebar = document.getElementById('sidebar');
    const sidebarEdge = document.getElementById('sidebarEdge');
    const backdrop = document.getElementById('backdrop');
    const mainContent = document.getElementById('mainContent');
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    setupGallery();
    
    // Sidebar toggle functions
    function openSidebar() {
        sidebar.classList.add('active');
        backdrop.classList.add('active');
        mainContent.classList.add('sidebar-open');
    }
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        backdrop.classList.remove('active');
        mainContent.classList.remove('sidebar-open');
    }

    // Setup touch interactions for mobile
    function setupTouchInteractions() {
        // Add touch event for opening sidebar
        sidebarEdge.addEventListener('touchstart', function(e) {
            e.preventDefault();
            openSidebar();
        });
        
        // Handle touch swipe to close sidebar
        document.addEventListener('touchstart', function(e) {
            const startX = e.touches[0].clientX;
            
            document.addEventListener('touchmove', function moveHandler(e) {
                const currentX = e.touches[0].clientX;
                if (startX < 100 && currentX - startX > 70) {
                    openSidebar(); // Swipe right from edge opens sidebar
                } else if (startX > 100 && startX - currentX > 70) {
                    closeSidebar(); // Swipe left closes sidebar
                }
            }, { once: true });
        });
    }

    // Mobile menu handling
    function setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            sidebar.classList.toggle('active');
            backdrop.classList.toggle('active');
            
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }

    // Setup dark mode functionality
    function setupDarkMode() {
        const hour = new Date().getHours();
        const isDarkModeTime = hour < 6 || hour >= 18; // Dark mode from 6 PM to 6 AM
        
        // Apply dark mode based on time
        if (isDarkModeTime) {
            document.body.classList.add('dark-mode');
        }
        
        // Set up dark mode toggle in menu
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
            });
        }
    }

    function setupGallery() {
        const slides = document.querySelectorAll('.gallery-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        let currentSlide = 0;
        let slideInterval;

        // Function to change slide
        function goToSlide(index) {
            // Reset all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Activate current slide and dot
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            // Reset interval
            clearInterval(slideInterval);
            startSlideShow();
        }
        
        // Auto-advance slides
        function startSlideShow() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 6000); // Change slide every 6 seconds
        }
        
        // Set up event listeners
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Start the slideshow
        startSlideShow();
        
        // Pause slideshow when hovering over gallery
        const gallery = document.querySelector('.hero-gallery');
        gallery.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        gallery.addEventListener('mouseleave', () => {
            startSlideShow();
        });
    }
 
    // Event listeners for sidebar
    sidebarEdge.addEventListener('mouseenter', openSidebar);
    sidebar.addEventListener('mouseleave', closeSidebar);
    backdrop.addEventListener('click', closeSidebar);
    
    // Tab switching
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Update active tab
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            tabContents.forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            
            // Close sidebar on mobile
            closeSidebar();
        });
    });
    
    // Initialize all functionality
    setupTouchInteractions();
    setupMobileMenu();
    setupDarkMode();
    
    // Check time every hour to update dark mode if needed
    setInterval(function() {
        const hour = new Date().getHours();
        const isDarkModeTime = hour < 6 || hour >= 18;
        if (isDarkModeTime && !document.body.classList.contains('dark-mode')) {
            document.body.classList.add('dark-mode');
        } else if (!isDarkModeTime && document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
        }
    }, 60 * 60 * 1000); // Check every hour
});