import express from "express";
import connection from "../estrutura/connection.js";

const app = express();
app.use(express.json());

// Rota para obter todos os alunos
app.get('/alunos', (req, res) => {
    connection.query('SELECT * FROM tblalunos;', (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno no servidor.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Rota para obter todos os livros
app.get('/livros', (req, res) => {
    connection.query('SELECT * FROM tbllivros;', (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno no servidor.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Rota para adicionar um novo aluno

app.post('/alunos', (req, res) => {
    const { codAluno, nomAluno } = req.body;

    connection.query('INSERT INTO tblalunos (codAluno, nomAluno) VALUES (?, ?)', [codAluno, nomAluno], (error, result, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json({ error: "Erro ao inserir dados na tabela" });
        } else {
            res.status(200).json({ success: true, message: "Dados inseridos com sucesso" });
        }
    });
});

// Rota para adicionar um novo livro

app.post('/livros', (req, res) => {
    const { codLivro, nomLivro } = req.body;

    connection.query('INSERT INTO tbllivros (codLivro, nomLivro) VALUES (?, ?)', [codLivro, nomLivro], (error, result, fields) => {
        if (error) {
            console.error(error);
            res.status(400).json({ error: "Erro ao inserir dados na tabela" });
        } else {
            res.status(200).json({ success: true, message: "Dados inseridos com sucesso" });
        }
    });
});


// Rota para atualizar um aluno pelo ID
app.put('/alunos/:id', (req, res) => {
    const id = req.params.id;
    const { nomAluno } = req.body;

    connection.query('UPDATE tblalunos SET nomAluno = ? WHERE codAluno = ?;', [nomAluno, id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(400).json({ error: 'Erro ao atualizar aluno.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ success: 'Aluno atualizado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Aluno não encontrado.' });
            }
        }
    });
});


// Rota para atualizar um livro pelo ID
app.put('/livros/:id', (req, res) => {
    const id = req.params.id;
    const { nomLivro } = req.body;

    connection.query('UPDATE tbllivros SET nomLivro = ? WHERE codLivro = ?;', [nomLivro, id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(400).json({ error: 'Erro ao atualizar livro.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ success: 'Livro atualizado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Livro não encontrado.' });
            }
        }
    });
});

// Rota para excluir um aluno pelo ID
app.delete('/alunos/:id', (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM tblalunos WHERE codAluno = ?;', id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(400).json({ error: 'Erro ao excluir aluno.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ success: 'Aluno excluído com sucesso.' });
            } else {
                res.status(404).json({ error: 'Aluno não encontrado.' });
            }
        }
    });
});

// Rota para excluir um livro pelo ID
app.delete('/livros/:id', (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM tbllivros WHERE codLivro = ?;', id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(400).json({ error: 'Erro ao excluir livro.' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ success: 'Livro excluído com sucesso.' });
            } else {
                res.status(404).json({ error: 'Livro não encontrado.' });
            }
        }
    });
});

export default app;
