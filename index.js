const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

const porta = 3333;

connection.authenticate().then(() => {
  console.log('Conexão feita com o banco de dados!');
}).catch((msgErro) => {
  console.log(msgErro);
})

// dizendo ao express usar o ejs como view (html)
app.set('view engine', 'ejs');
// para carregar arquivos estáticos: css, imagens, etc. (na pasta public)
app.use(express.static('public'))

// para decodificar os dados enviados pelo formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Pergunta.findAll({raw: true, order: [
    ['id', 'DESC'] //ASC = crescente / DESC = decrescente
  ]}).then(perguntas => {
    res.render('index', {
      perguntas: perguntas
    })
  })
  // o render(), vai desenhar alugm arquivo html que está na pasta views
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
})

app.post('/salvarpergunta', (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  // equivale ao INSERT
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect('/');
  })
})

app.get('/pergunta/:id', (req, res) => {
  const id = req.params.id;
  Pergunta.findOne({
    where: {
      id: id
    }
  }).then(pergunta => {
    if(pergunta != undefined) {

      Resposta.findAll({
        where: {
          perguntaId: pergunta.id
        },
        order: [
          ['id', 'DESC']
        ]
      }).then(respostas => {
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas
        });
      })
    }else {
      res.redirect('/');
    }
  })
});

app.post('/responder', (req, res) => {
  const corpo = req.body.corpo;
  const perguntaId = req.body.pergunta;
  Resposta.create({
    corpo:corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`)
  })
})

app.listen(porta, () => {
  console.log(`Api rodando na porta ${porta}`);
})

