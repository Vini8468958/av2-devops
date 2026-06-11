document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Limpa mensagens de erro anteriores
            errorMessage.classList.remove('show');

            // Simulação de autenticação (usuário padrão para teste)
            // Você pode alterar 'admin' e 'admin123' para o que desejar
            if (username === 'admin' && password === 'admin123') {
                // Login bem-sucedido
                window.location.href = 'to-do-list.html';
            } else {
                // Falha no login
                errorMessage.classList.add('show');
            }
        });
    }
});
