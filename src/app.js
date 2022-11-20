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
//////////////////////////////////////////////////////////////////////////////////////

const getUsuario = (request, response) => {
  pool.query('SELECT * FROM usuario ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
//////////////////////////////////////////////////////////////////////////////////////
/**REGISTRO */
const crearUsuario = (request, response) => {
  const { nombre,cedula,correo,contra,dpto,sector } = request.body
  console.log(request.body)
  const rol=1  
  //CAMBIARLO PARA LA TABLA usuario
  pool.query('insert into usuario (nombre,cedula,correo,contraseña,tiposectorid,tiporolid,tipodepartamentoid) values ($1, $2, $3, $4, $5, $6, $7)', [nombre,cedula,correo,contra,sector,rol,dpto], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({ UsuarioAgregado: 'Ok' })
  })
}
//////////////////////////////////////////////////////////////////////////////////
const iniciarSesion = (request, response) => {
  const email = request.body.data.email
  const password = request.body.data.password
      
  pool.query('SELECT correo, contraseña FROM usuario where correo = $1 and contraseña = $2', [email, password], (error, results) => {
    if (error) {
      throw error//error
    }
    if(results.rowCount==1){
      //response.render('datos')
      //response.status(200).json(results.rows)//login exitoso
      response.render('home');
    }else{
      response.status(200).json(results.rows)//campos incorrectos
    }
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