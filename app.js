/*------------------------------------------------------------------------
//CRIANDO SERVIDOR
/*------------------------------------------------------------------------*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlencodeParser = bodyParser.urlencoded({ extended: false });

/*------------------------------------------------------------------------
//CONECTANDO AO BANDO DE DADOS
/*------------------------------------------------------------------------*/
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
});

/*------------------------------------------------------------------------
//TESTANDO A CONEXÃO COM BD
/*------------------------------------------------------------------------*/
sql.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Conexão bem sucedida! \n')
    }
});


//Diretório img ta liberado para usar os arquivos dentro dele
app.use('/img', express.static('img'));

/*------------------------------------------------------------------------
//TEMPLATE ENGINE
/*------------------------------------------------------------------------*/
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main'
})); //main é o template padrão desta aplicaç ão
app.set('view engine', 'handlebars')

//Primeira forma de referenciar os arquivos 
//app.use('/css', express.static('css'))
//app.use('/js', express.static('javascript'))

/*------------------------------------------------------------------------
//ROTAS
/*------------------------------------------------------------------------*/
app.get('/', function (req, res) {
    //res.send("Mensagemjj")
    //res.sendFile(__dirname + '/index.html'); // caminho do arquivo
    //res.render('index')//retorna a página index.handlebars
    res.render('home')//retorna a página index.handlebars
});

app.get('/javascript', function (req, res) {
    res.sendFile(__dirname + "/" + '/js/javascript.js');
})

app.get('/style', function (req, res) {
    res.sendFile(__dirname + '/css/style.css');
})

app.get('/inserir', function (req, res) {
    res.render('inserir');
})

app.get('/home', function (req, res) {
    res.render('home');
})

app.get('/cadUsu', function (req, res) {
    res.render('cadUsu');
})

app.get('/formNome', function (req, res) {
    res.render('formNome');
})

// app.get('/formNome', function (req, res) {
//     res.render('formNome');
// })

app.get('/controllerForm', function (req, res) {
    res.render('controllerForm');
})

/*------------------------------------------------------------------------
// INSERT NA TABELA USUARIO
/*------------------------------------------------------------------------*/
app.post('/controllerForm', urlencodeParser, function (req, res) {
    //Pega o valor nome do formulário e mostra no console
    //console.log(req.body.id, req.body.name, req.body.idade);
    console.log('Dados inseridos com sucesso!');
    sql.query('insert into usuario values (?,?,?)', 
    [req.body.id, 
    req.body.name, 
    req.body.idade]);
    
    console.log('Dados inseridos com sucesso!');
    res.render('controllerForm')
    
})


/*------------------------------------------------------------------------
// INSERT NA TABELA ALUNO
/*------------------------------------------------------------------------*/
app.post('/cadUsu', urlencodeParser, function (req, res) {
    //Pega o valor nome do formulário e mostra no console
    //console.log(req.body.id, req.body.name, req.body.idade);

    sql.query('insert into aluno values (?, ?, ?, ?, ?, ?, ?)', 
    [req.body.id,
    req.body.nome_aluno,
    req.body.cpf_aluno, 
    req.body.sexo, 
    req.body.dt_nasc_aluno.urlencodeParser, 
    req.body.email_aluno, 
    req.body.tel_aluno
    
]);
    console.log('Dados inseridos com sucesso!');

    res.render('cadUsu')
});

/*------------------------------------------------------------------------
//SELECT TABELA DE TESTE
/*------------------------------------------------------------------------*/
app.get('/selectT/:id?', function (req, res) {
    if (!req.params.id) {
        //res.send('Existe'); //teste
        sql.query("SELECT *  FROM usuario order by id desc", 
        function (err, results, fields) {
            //console.log(result);
            res.render('selectT', { data: results });
        });
    }

    else {
        sql.query("SELECT * FROM usuario WHERE id=?", 
        [req.body.nome_aluno], 

        function (err, results, fields) {
            //console.log(result);
            res.render('selectT', { data: results });
            console.log(data)
        });
    }
});

/*------------------------------------------------------------------------
//SELECT ALUNOS
/*------------------------------------------------------------------------*/
app.get('/select/:id?', function (req, res) {
    if (!req.params.id) {
        //res.send('Existe'); //teste
        sql.query("SELECT * FROM aluno order by id desc", 
        function (err, results, fields) {
            //console.log(result);
            res.render('select', { data: results });
        });
    }

    else {
        sql.query("SELECT DATE_FORMAT(dt_nasc_aluno, '%d/%m/%Y') FROM aluno;", 
        // sql.query("SELECT ID, NOME_ALUNO, CPF_ALUNO, (CASE(SEXO) WHEN('M') THEN 'MULHER' ELSE 'HOMEM' END) AS SEXO, EMAIL_ALUNO, TEL_ALUNOUSUARIO, DATE_FORMAT(DT_NASC_ALUNO, '%d/%m/%Y') AS NASCIMENTO FROM ALUNO;", 
        [req.body.id,
        req.body.nome_aluno, 
        req.body.cpf_aluno, 
        req.body.sexo, 
        req.body.dt_nasc_aluno, 
        req.body.tel_aluno, 
        req.body.email_aluno], 

        function (err, results, fields) {
            console.log(results);
            res.render('select', { data: results });
            
        });
    }
});


/*------------------------------------------------------------------------
// DELETAR DO BANCO DE DADOS
/*------------------------------------------------------------------------*/
app.get('/deletar/:id', function(req, res){

    sql.query('delete from usuario where id = ?', [req.params.id])
    res.render('deletar');
});


app.get('/del/:id', function(req, res){

    sql.query('delete from aluno where id = ?', [req.params.id])
    res.render('del');
});


/*------------------------------------------------------------------------
//START SERVER
/*------------------------------------------------------------------------*/
app.listen(3000, function (req, res) {
    console.log('Servidor ligado');
})
