const express = require("express");
const {engine} = require('express-handlebars');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser')
const Pool = require('pg').Pool
const connectionString = process.env.DATABASE_URL
const tasksRoutes = require('./routes/tasks.js');
const flash=require('connect-flash');
const session = require('express-session');
const toastr = require('express-toastr');
const jsdom = require("jsdom");
const {execSync} = require('child_process');
const { JSDOM } = jsdom;

app.use(session({
  secret: 'restaurat-session',
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());
app.use(toastr());

global.document = new JSDOM('home').window.document;


app.set('views', __dirname + '/views')
app.engine('.hbs',engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
  res.locals.toastr = req.toastr.render()
  next();
})

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

const getUsuario = (request, response) => {
  pool.query('SELECT * FROM usuario ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/**REGISTRO */
const crearUsuario = (request, response) => {
  const { nombre,cedula,correo,contra,dpto,sector } = request.body
  console.log(request.body)
  const rol=1  
  pool.query('insert into usuario (nombre,cedula,correo,contraseña,tiposectorid,tiporolid,tipodepartamentoid) values ($1, $2, $3, $4, $5, $6, $7)', [nombre,cedula,correo,contra,sector,rol,dpto], (error, results) => {
    if (error) {
      throw error
    }
    request.toastr.success('La propuesta a sido registrado exitosamente');
    console.log("UsuarioAgregado: 'Ok' ")
    response.render('home')
  })
}
var actual=0;
const iniciarSesion = (request, response) => {
  const { correo,contra } = request.body
  pool.query('SELECT id, correo, contraseña FROM usuario where correo = $1 and contraseña = $2', [correo, contra], (error, results) => {
    if (error) {
      throw error//error
    }
    if(results.rowCount==1){
      console.log("Ingresa: "+results.rows[0].id)
      actual=results.rows[0].id;
      request.toastr.success('Sesión Iniciada');
      response.redirect('/datos');          
    }else{ 
      request.toastr.error('Campos Incorrectos', '¡ERROR!');
      response.redirect('home');//campos incorrectos
    }
  })
}

app.get('/test', function (req, res) {
  res.json({ Resultado: 'Proyecto COVENANT' })
});

























app.get('/', function (req, res) {
  res.render('home');
});


app.get('/usuarios', getUsuario)
app.post('/registro', crearUsuario)
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