from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) # Habilita CORS para permitir requisições do frontend

# Configuração do banco de dados SQLite
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasks.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Modelo do Banco de Dados para Tarefas
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(10), nullable=True) # Formato YYYY-MM-DD
    priority = db.Column(db.String(10), nullable=False, default="Baixa")
    completed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<Task {self.id}: {self.title}>"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "date": self.date,
            "priority": self.priority,
            "completed": self.completed
        }

# Cria o banco de dados e as tabelas se não existirem
with app.app_context():
    db.create_all()

# Rota de Login (simulada)
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Credenciais de teste (admin/admin123)
    if username == "admin" and password == "admin123":
        return jsonify({"message": "Login bem-sucedido!", "token": "fake-jwt-token"}), 200
    else:
        return jsonify({"message": "Usuário ou senha inválidos."}), 401

# Rotas para Gerenciamento de Tarefas

# Obter todas as tarefas
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks]), 200

# Adicionar uma nova tarefa
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    new_task = Task(
        title=data.get("title"),
        date=data.get("date"),
        priority=data.get("priority", "Baixa")
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

# Atualizar uma tarefa existente
@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
    task.title = data.get("title", task.title)
    task.date = data.get("date", task.date)
    task.priority = data.get("priority", task.priority)
    task.completed = data.get("completed", task.completed)
    db.session.commit()
    return jsonify(task.to_dict()), 200

# Excluir uma tarefa
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Tarefa excluída com sucesso!"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
