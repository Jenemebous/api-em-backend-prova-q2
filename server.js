import app from "./src/app.js";
import connection from "./estrutura/connection.js";

const port = 80;

connection.connect((error) => {
    if(error){
        console.log(error);
    }else{
        console.log('Conectado com sucesso')
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}/`);
        });
    }
});
