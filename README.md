# Gerenciador de Tarefas (To-Do List)

## Descrição do Projeto

Este projeto consiste em uma **Plataforma de Gerenciamento de Tarefas** robusta e intuitiva, desenvolvida para auxiliar indivíduos e equipes na organização, priorização e acompanhamento de suas atividades diárias. A aplicação oferece uma interface web amigável para a criação e manipulação de tarefas, enquanto o backend gerencia a lógica de negócio e a persistência dos dados. O principal objetivo é proporcionar uma ferramenta eficiente para aumentar a produtividade e garantir que as tarefas sejam concluídas de forma organizada.

O foco deste projeto vai além da funcionalidade da aplicação, demonstrando a aplicação de **boas práticas de DevOps**, incluindo controle de versão com Git e GitHub, containerização com Docker e orquestração com Docker Compose, e uma esteira de Integração Contínua e Entrega Contínua (CI/CD) utilizando GitHub Actions. Isso garante um ciclo de vida de desenvolvimento ágil, escalável e confiável.

## Tecnologias Utilizadas

As seguintes tecnologias foram utilizadas no desenvolvimento desta plataforma:

| Componente | Tecnologia | Versão/Detalhes |
|---|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla JS) | Interface de usuário estática e interativa. |
| **Backend** | Python | Linguagem de programação. |
| | Flask | Microframework web para a API RESTful. |
| | Flask-SQLAlchemy | Extensão para integração com SQLAlchemy. |
| | Flask-CORS | Extensão para habilitar Cross-Origin Resource Sharing. |
| **Banco de Dados** | SQLite | Banco de dados leve para persistência de dados (para desenvolvimento). |
| **Containerização** | Docker | Para empacotar e isolar a aplicação e seus serviços. |
| | Docker Compose | Para orquestrar os containers do frontend, backend e banco de dados. |
| **Controle de Versão** | Git | Sistema de controle de versão distribuído. |
| | GitHub | Plataforma para hospedagem de repositórios e colaboração. |
| **CI/CD** | GitHub Actions | Para automação da esteira de integração e entrega contínua. |

## Guia de Instalação

Para configurar e executar o projeto em seu ambiente local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

*   **Git**: Para clonar o repositório.
*   **Docker** e **Docker Compose**: Para construir e executar os containers da aplicação.

### Passos para Configuração e Execução

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
    cd Plataforma-Gerenciamento-Tarefas
    ```
    *Substitua `SEU_USUARIO` e `SEU_REPOSITORIO` pelos dados do seu repositório no GitHub.*

2.  **Estrutura de Diretórios:**
    Certifique-se de que a estrutura de diretórios esteja organizada da seguinte forma:
    ```
    . (raiz do projeto)
    ├── frontend/
    │   ├── index.html
    │   ├── style.css
    │   ├── script.js
    │   ├── to-do-list.html
    │   ├── to-do-list-script.js
    │   └── Dockerfile
    ├── backend/
    │   ├── app.py
    │   ├── requirements.txt
    │   └── Dockerfile
    ├── .github/workflows/
    │   └── main.yml
    ├── docker-compose.yml
    ├── .gitignore
    └── README.md
    ```

3.  **Variáveis de Ambiente (Backend):**
    *   No diretório `backend/`, crie um arquivo `.env` (opcional para SQLite, mas boa prática) se você planeja usar variáveis de ambiente para configurações futuras, como credenciais de banco de dados externos. Para SQLite, o banco de dados `tasks.db` será criado automaticamente no volume.

4.  **Inicie a Aplicação com Docker Compose:**
    ```bash
    docker-compose up --build
    ```
    Este comando irá:
    *   Construir as imagens Docker para o frontend (Nginx) e backend (Flask).
    *   Criar e iniciar os containers para todos os serviços definidos no `docker-compose.yml`, incluindo o banco de dados SQLite.

5.  **Acesse a Aplicação:**
    *   A tela de login estará acessível em `http://localhost:3000`.
    *   Credenciais de teste: **Usuário:** `admin`, **Senha:** `admin123`.
    *   Após o login, você será redirecionado para a `to-do-list.html`.
    *   A API do backend estará disponível em `http://localhost:5000`.

## Colaboradores

Projeto desenvolvido por: 

* [Aquiles de Melo Albuquerque](https://github.com/Aquiles-adm) - 01725424
* [Matheus Heralio Monteiro dos Santos](https://github.com/Matheus-Heraclio) - 01687149
* [Vinícius Barbosa de Figueirêdo](https://github.com/Vini8468958) - 01726804
