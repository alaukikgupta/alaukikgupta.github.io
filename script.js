document.addEventListener('DOMContentLoaded', function() {
    
    const sidebar = document.getElementById('sidebar');
    const sidebarEdge = document.getElementById('sidebarEdge');
    const backdrop = document.getElementById('backdrop');
    const mainContent = document.getElementById('mainContent');
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');

    // Add functionality for "View Projects" button
    document.addEventListener('DOMContentLoaded', function() {
        const viewProjectsBtn = document.getElementById('viewProjectsBtn');
        if (viewProjectsBtn) {
            viewProjectsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Find and click the projects tab button
                const projectsTabButton = document.querySelector('.menu-item[data-tab="projects"]');
                if (projectsTabButton) {
                    projectsTabButton.click();
                    setupProjectsTab();
                }
            });
        }
    });
    
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
    
        // Check if gallery elements exist
        if (!slides.length || !dots.length || !prevBtn || !nextBtn) {
            console.warn('Gallery elements not found');
            return;
        }
    
        // Function to change slide
        function goToSlide(index) {
            // Reset all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Activate current slide and dot
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            // Clear existing interval and restart it
            resetSlideInterval();
        }
        
        // Function to reset and restart the slideshow interval
        function resetSlideInterval() {
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
        if (gallery) {
            gallery.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            gallery.addEventListener('mouseleave', () => {
                startSlideShow();
            });
        }
    }
 
    function setupProjectsTab() {
        // Elements
        const categoryCards = document.querySelectorAll('.category-card');
        const projectCollections = document.querySelectorAll('.project-collection');
        const backButtons = document.querySelectorAll('.back-button');
        const projectDetailsButtons = document.querySelectorAll('.project-details-btn');
        const projectModal = document.getElementById('project-modal');
        const modalClose = document.querySelector('.modal-close');
        const modalContent = document.getElementById('modal-content-container');
        
        // Check if project elements exist
        if (categoryCards.length === 0 || projectCollections.length === 0) {
            console.warn('Project tab elements not found');
            return;
        }
        
        // Make sure the project categories container is visible by default
        const projectCategories = document.querySelector('.project-categories');
        if (projectCategories) {
            projectCategories.style.display = 'grid';
        }
        
        // Hide all project collections initially
        projectCollections.forEach(collection => {
            collection.classList.remove('active');
        });
        
        // Show category collection when a category card is clicked
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                const targetCollection = document.getElementById(`${category}-projects`);
                
                if (targetCollection) {
                    // Hide categories, show specific collection
                    if (projectCategories) {
                        projectCategories.style.display = 'none';
                    }
                    
                    projectCollections.forEach(collection => {
                        collection.classList.remove('active');
                    });
                    
                    targetCollection.classList.add('active');
                    
                    // Scroll to the collection
                    setTimeout(() => {
                        window.scrollTo({
                            top: document.querySelector('.section-title').offsetTop - 20,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            });
        });
        
        // Back button functionality
        backButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Hide all collections, show categories
                projectCollections.forEach(collection => {
                    collection.classList.remove('active');
                });
                
                if (projectCategories) {
                    projectCategories.style.display = 'grid';
                    
                    // Scroll back to the top of projects section
                    setTimeout(() => {
                        window.scrollTo({
                            top: document.querySelector('.section-title').offsetTop - 20,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            });
        });
        
        // Project details modal
        if (projectDetailsButtons.length && projectModal && modalClose && modalContent) {
            projectDetailsButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // Get project information from the parent card
                    const card = button.closest('.project-card');
                    const title = card.querySelector('h3').textContent;
                    const period = card.querySelector('.project-header span').textContent;
                    const description = card.querySelector('p').textContent;
                    
                    // Create detailed content for modal
                    const detailedContent = `
                        <h2>${title}</h2>
                        <p class="project-period">${period}</p>
                        <div class="project-detail-section">
                            <h3>Overview</h3>
                            <p>${description}</p>
                        </div>
                        <div class="project-detail-section">
                            <h3>Challenge</h3>
                            <p>This project addressed the challenge of [expand with specific details].</p>
                        </div>
                        <div class="project-detail-section">
                            <h3>Approach</h3>
                            <p>The approach involved [expand with methodology and process].</p>
                        </div>
                        <div class="project-detail-section">
                            <h3>Results</h3>
                            <ul>
                                <li>Result 1: [specific measurable outcome]</li>
                                <li>Result 2: [specific measurable outcome]</li>
                                <li>Result 3: [specific measurable outcome]</li>
                            </ul>
                        </div>
                        <div class="project-detail-section">
                            <h3>Skills Applied</h3>
                            <div class="skills-tags">
                                <span>Skill 1</span>
                                <span>Skill 2</span>
                                <span>Skill 3</span>
                            </div>
                        </div>
                    `;
                    
                    // Set modal content and show
                    modalContent.innerHTML = detailedContent;
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                });
            });
            
            // Close modal
            modalClose.addEventListener('click', () => {
                projectModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
            
            // Close modal if clicking outside content
            projectModal.addEventListener('click', (e) => {
                if (e.target === projectModal) {
                    projectModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    // Setup the US experience map
    function setupExperienceMap() {
        const experienceMap = document.getElementById('experienceMap');
        const timelineItems = document.querySelectorAll('.timeline-item, .education-card');
        
        if (!experienceMap) {
            console.warn('Experience map element not found');
            return;
        }
        
        console.log('Setting up experience map with timeline integration');
        
        // Get all US states and markers
        const states = experienceMap.querySelectorAll('.state');
        const mapMarkers = document.querySelectorAll('.map-marker');
        
        // Dictionary to store locations and their related timeline items
        const locationMap = {};
        
        // Process all timeline items and build location mapping
        timelineItems.forEach(item => {
            const location = item.getAttribute('data-location');
            const stateId = item.getAttribute('data-state');
            
            if (location) {
                if (!locationMap[location]) {
                    locationMap[location] = [];
                }
                locationMap[location].push(item);
            }
            
            if (stateId) {
                if (!locationMap[stateId]) {
                    locationMap[stateId] = [];
                }
                locationMap[stateId].push(item);
            }
        });
        
        console.log('Location mapping:', Object.keys(locationMap));
        
        // Setup state interactions
        states.forEach(state => {
            const stateId = state.getAttribute('id');
            const jobInfo = state.getAttribute('data-job');
            
            if (jobInfo || locationMap[stateId]) {
                // Add hover and click event listeners for states
                state.addEventListener('mouseenter', () => {
                    state.classList.add('active');
                });
                
                state.addEventListener('mouseleave', () => {
                    if (!state.classList.contains('highlighted')) {
                        state.classList.remove('active');
                    }
                });
                
                state.addEventListener('click', () => {
                    // Clear previous highlights
                    states.forEach(s => s.classList.remove('highlighted'));
                    
                    // Highlight this state
                    state.classList.add('highlighted');
                    
                    // Find and highlight timeline items for this state
                    if (locationMap[stateId]) {
                        // Remove highlights from all timeline items
                        timelineItems.forEach(item => {
                            item.classList.remove('highlighted');
                        });
                        
                        // Add highlight to matching items
                        locationMap[stateId].forEach(item => {
                            item.classList.add('highlighted');
                            
                            // Scroll to the first matching item
                            if (item === locationMap[stateId][0]) {
                                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        });
                    }
                });
            }
        });
        
        // Setup map marker interactions
        mapMarkers.forEach(marker => {
            const location = marker.getAttribute('data-location');
            const stateId = marker.getAttribute('data-state');
            
            marker.addEventListener('click', () => {
                // Clear previous highlights from states
                states.forEach(s => s.classList.remove('highlighted'));
                
                // Find and highlight the corresponding state
                if (stateId) {
                    const state = document.getElementById(stateId);
                    if (state) {
                        state.classList.add('highlighted');
                    }
                }
                
                // Find and highlight timeline items for this location
                if (locationMap[location]) {
                    // Remove highlights from all timeline items
                    timelineItems.forEach(item => {
                        item.classList.remove('highlighted');
                    });
                    
                    // Add highlight to matching items
                    locationMap[location].forEach(item => {
                        item.classList.add('highlighted');
                        
                        // Scroll to the first matching item
                        if (item === locationMap[location][0]) {
                            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    });
                }
            });
        });
        
        // Set up intersection observer to highlight map points when timeline items are visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const location = entry.target.getAttribute('data-location');
                    const stateId = entry.target.getAttribute('data-state');
                    
                    // Find and activate the corresponding marker
                    if (location) {
                        mapMarkers.forEach(marker => {
                            marker.classList.remove('active');
                            if (marker.getAttribute('data-location') === location) {
                                marker.classList.add('active');
                            }
                        });
                    }
                    
                    // Find and activate the corresponding state
                    if (stateId) {
                        states.forEach(state => {
                            state.classList.remove('active');
                            if (state.getAttribute('id') === stateId) {
                                state.classList.add('active');
                            }
                        });
                    }
                }
            });
        }, { threshold: 0.5 });
        
        // Observe all timeline items
        timelineItems.forEach(item => {
            observer.observe(item);
        });
        
        // Add styling for highlighted timeline items
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .timeline-item.highlighted, .education-card.highlighted {
                border-left: 3px solid var(--accent-color);
                background-color: rgba(var(--accent-color-rgb), 0.05);
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                transform: translateX(5px);
                transition: all 0.3s ease;
            }
            
            .map-marker.active .marker-dot {
                background-color: var(--accent-color);
                transform: scale(1.2);
                box-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.7);
            }
            
            .timeline-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 1rem;
            }
            
            .timeline-tags span {
                background-color: var(--card-bg);
                padding: 0.3rem 0.7rem;
                border-radius: 50px;
                font-size: 0.85rem;
                color: var(--text-color);
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Add animation for skill bars when they come into view
    function setupSkillBarsAnimation() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        if (!progressBars.length) {
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the desired width from the style attribute
                    const targetWidth = entry.target.style.width;
                    
                    // First set width to 0
                    entry.target.style.width = '0%';
                    
                    // Force a reflow
                    entry.target.offsetWidth;
                    
                    // Then animate to the target width
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                    }, 100);
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe all progress bars
        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Event listeners for sidebar
    if (sidebarEdge) {
        sidebarEdge.addEventListener('mouseenter', openSidebar);
    }
    if (sidebar) {
        sidebar.addEventListener('mouseleave', closeSidebar);
    }
    if (backdrop) {
        backdrop.addEventListener('click', closeSidebar);
    }
    
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
            
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
                
                // Initialize specific tab functionality when switching to it
                if (tabId === 'experience') {
                    setupExperienceMap();
                    setupSkillBarsAnimation();
                }
            } else {
                console.error(`Tab #${tabId} not found`);
            }
            
            // Close sidebar on mobile
            closeSidebar();
        });
    });

    // Initialize all functionality
    setupGallery();
    setupProjectsTab();
    setupTouchInteractions();
    setupMobileMenu();
    setupDarkMode();
    
    // Initialize experience map if we're starting on that tab
    if (document.getElementById('experience').classList.contains('active')) {
        setupExperienceMap();
        setupSkillBarsAnimation();
    }
    
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