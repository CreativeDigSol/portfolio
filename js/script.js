document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.navbar .mobile-menu-toggle');
    const mobileMenu = document.querySelector('.navbar .mobile-menu-items');

    toggleButton.addEventListener('click', function() {
       mobileMenu.classList.toggle('active'); 
    })

});

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Reset status
  formStatus.textContent = '';
  formStatus.classList.remove('success', 'error');

  const formData = {
    name: contactForm.querySelector('[name="name"]').value.trim(),
    email: contactForm.querySelector('[name="email"]').value.trim(),
    message: contactForm.querySelector('[name="message"]').value.trim(),
  };

  try {
    const response = await fetch('https://contact-form-backend-81gt.onrender.com/submit/client1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      formStatus.textContent = 'Thank you! Your message has been sent.';
      formStatus.classList.add('success');
      contactForm.reset();
    } else {
      throw new Error(result.error || 'Failed to submit form');
    }
  } catch (error) {
    formStatus.textContent = `Error: ${error.message}`;
    formStatus.classList.add('error');
  }
});