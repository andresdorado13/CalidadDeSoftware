function home(req, res){
    
    res.render('../views/home.hbs')
}

function propuestas(req, res){
    res.render('../views/layouts/propuestas.hbs');
}

function chat(req, res){
    res.render('../views/layouts/chat.hbs');
}

function registro(req, res){
    res.render('../views/layouts/registro.hbs');
}

function crearPropuesta(req, res){
    res.render('../views/layouts/crearPropuesta.hbs')
}

module.exports = {
    home: home,
    propuestas: propuestas,
    chat: chat,
    registro:registro,
    crearPropuesta:crearPropuesta

}
