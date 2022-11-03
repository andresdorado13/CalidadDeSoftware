function home(req, res){
    
    res.render('../views/home.hbs')
}

function datos(req, res){
    res.render('../views/layouts/datos.hbs');
}

function chat(req, res){
    res.render('../views/layouts/chat.hbs');
}

module.exports = {
    home: home,
    datos: datos,
    chat: chat
}