document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarEdge = document.getElementById('sidebarEdge');
    const backdrop = document.getElementById('backdrop');
    const mainContent = document.getElementById('mainContent');
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
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

function setupTouchInteractions() {
    // For mobile devices, add touch events
    const sidebarEdge = document.getElementById('sidebarEdge');
    
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
  
  // Call this function when the DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...
    
    // Add touch interactions
    setupTouchInteractions();
  });
    
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
});