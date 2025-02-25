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