const express = require("express");
const {engine} = require('express-handlebars');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser')
const Pool = require('pg').Pool
const connectionString = process.env.DATABASE_URL
const tasksRoutes = require('./routes/tasks.js');


app.set('views', __dirname + '/views')
app.engine('.hbs',engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

let cors = require("cors");
app.use(cors());


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/', tasksRoutes);

const pool = new Pool({
    connectionString,
    ssl:{
      rejectUnauthorized:false
    }
  })

/*
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Octubre',
  password: '123456',
  port: 5432,  
})*/

const getUsuario = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const crearUsuario = (request, response) => {
  //const { nombre,edad,tipo } = request.body
  const nombre = request.body.data.nombre
  const edad = request.body.data.edad
  const tipo = request.body.data.tipo
    
  pool.query('insert into usuarios (nombre,edad,tipo) values ($1, $2, $3)', [nombre,edad,tipo], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({ UsuarioAgregado: 'Ok' })
  })
}

const iniciarSesion = (request, response) => {
  //const email = request.body.data.nombre
  //const password = request.body.data.edad
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }

    console.log(results.rowCount)
    //for(var i=0, i<results.rowCount )
    results.rows.length
    console.log("lOGEADO")
    response.status(200)
    response.render('datos')
    //response.status(200).json(results.rows)
  })



}

const path = require('path')

app.get('/test', function (req, res) {
  res.json({ Resultado: 'Proyecto COVENANT' })
});

app.get('/', function (req, res) {
  res.render('home');
  //res.sendFile(path.resolve(__dirname,'index.html'))
  //res.sendFile(path.resolve(__dirname,'estilos/body.css'))
  //res.json({ Resultado: 'Taller Despliegue con ' })
});

app.get('/usuarios', getUsuario)
app.post('/usuarios', crearUsuario)
app.post('/login', iniciarSesion)


const port = process.env.PORT || 1337;

app.listen(port, () => {
 console.log("El servidor está inicializado en http://localhost:%d", port);
});

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})