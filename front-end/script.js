document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Limpa mensagens de erro anteriores
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');

        console.log('Tentativa de login com:', { username, password });

        // Simulação de chamada de API para autenticação
        // No futuro, esta parte fará uma requisição HTTP para o backend
        try {
            // const response = await fetch('http://localhost:5000/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ username, password }),
            // });

            // const data = await response.json();

            // if (response.ok) {
            //     alert('Login bem-sucedido! Token: ' + data.access_token);
            //     // Redirecionar para a página principal do aplicativo
            //     window.location.href = '/dashboard.html'; 
            // } else {
            //     errorMessage.textContent = data.message || 'Erro ao fazer login.';
            //     errorMessage.classList.add('show');
            // }

            // Simulação temporária para demonstração
            if (username === 'user' && password === 'password') {
                alert('Login bem-sucedido! Redirecionando...');
                // Em um projeto real, você redirecionaria para a página principal
                // window.location.href = '/dashboard.html'; 
            } else {
                errorMessage.textContent = 'Usuário ou senha inválidos.';
                errorMessage.classList.add('show');
            }

        } catch (error) {
            console.error('Erro na requisição de login:', error);
            errorMessage.textContent = 'Ocorreu um erro na comunicação com o servidor.';
            errorMessage.classList.add('show');
        }
    });
});
