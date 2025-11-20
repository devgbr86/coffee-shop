const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async (e) => {
     e.preventDefault();

     const formData = new FormData(form);

     try {
          const response = await fetch(form.action, {
               method: 'POST',
               body: formData,
               headers: {
                    'Accept': 'application/json'
               }
          });

          if (response.ok) {
               successMessage.style.display = 'block';
               errorMessage.style.display = 'none';
               form.reset();

               setTimeout(() => {
                    successMessage.style.display = 'none';
               }, 5000);
          } else {
               throw new Error('Erro no envio');
          }
     } catch (error) {
          errorMessage.style.display = 'block';
          successMessage.style.display = 'none';

          setTimeout(() => {
               errorMessage.style.display = 'none';
          }, 5000);
     }
});