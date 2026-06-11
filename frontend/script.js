document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // URL base da API do backend (ajuste se o backend estiver em outro lugar)
    const API_BASE_URL = 'http://localhost:5000'; 

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            errorMessage.classList.remove('show');
            errorMessage.textContent = '';

            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Login bem-sucedido
                    // Em um projeto real, você armazenaria o token (data.token) em localStorage ou cookies
                    alert('Login bem-sucedido! Redirecionando...');
                    window.location.href = 'to-do-list.html';
                } else {
                    // Falha no login
                    errorMessage.textContent = data.message || 'Erro ao fazer login.';
                    errorMessage.classList.add('show');
                }
            } catch (error) {
                console.error('Erro na requisição de login:', error);
                errorMessage.textContent = 'Ocorreu um erro na comunicação com o servidor.';
                errorMessage.classList.add('show');
            }
        });
    }
});
