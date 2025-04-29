// FAQ accordion functionality

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // FAQ accordion toggle
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all open items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // If the clicked item wasn't active, make it active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // FAQ filtering by category
    if (categoryButtons.length) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get selected category
                const category = button.getAttribute('data-category');
                
                // Filter FAQ items
                faqItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Add animation when FAQ items first appear
    setTimeout(() => {
        faqItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
});
