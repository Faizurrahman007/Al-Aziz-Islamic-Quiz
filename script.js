document.addEventListener('DOMContentLoaded', function () {
    
    const menuToggle = document.getElementById('menu-toggle');
    const navbarLinks = document.getElementById('navbar-links');

    
    menuToggle.addEventListener('click', function() {
        
        navbarLinks.classList.toggle('active');
        
       
        const icon = menuToggle.querySelector('i');
        
        
        if (navbarLinks.classList.contains('active')) {
           
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); 
        } else {
            
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

  
    const navLinks = navbarLinks.querySelectorAll('a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
         
            navbarLinks.classList.remove('active');
            
            
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});