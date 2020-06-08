const express = require('express');
const Cors    = require("cors");
var bodyParser = require('body-parser');
const url = require('url');  

const app = express();
var object ;
var PORT = 3200;
 
/*Politica do cors*/
app.use((request, response ,next) =>{
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 
app.use(Cors());


app.use(bodyParser.urlencoded({extended: false}))//Para post
app.use(bodyParser.json())//Exibir arquivos JSON

/*Index*/
app.get("/", (request,response) =>{
   response.sendfile("noticia.html");
});


 /*Index Listar todos os cadastro*/
app.get("/index/listar", (request,response) =>{
   require("./DB/db").findCadastro(function(docs){
      response.json({docs});
    });
 });
 

 
/*(Metodo get) Mostra utimo dados cadastrado ( Usa o metodo find para pegar diretamente dados do Banco mongo)  */
 app.get("/cliente/:id", (request,response) =>{
   var id_one = request.params.id;
   require("./DB/db").findCadastro_id(id_one,function(docs){
      response.json({docs});
    });
   
 });

 /*(find All) find por nome( Usa o metodo find para pegar diretamente dados do Banco mongo)  */
 app.get("/user/:nome", (request,response) =>{
   var user_name = request.params.nome;
   require("./DB/db").findCadastroAllNome(user_name,function(docs){
      response.json({docs});
    });
   
 });
 
 
/*(Metodo get) find por nome( Usa o metodo find para pegar diretamente dados do Banco mongo)  */
app.get("/userOne/:nome", (request,response) =>{
   var user_name = request.params.nome;
   require("./DB/db").findCadastroOneNome(user_name,function(docs){
      response.json({docs});
    });
   
 });
 



/* Metodo post */
/*Inserindo dados do  cadastro do servidoe NT */
app.post("/cliente", (request,response) =>{

          object = {
          id:request.body.id,
          nome:request.body.nome,
          data:request.body.data,
          email:request.body.email,
          telResi:request.body.teleRes,
          telCelu:request.body.telCelu,
          insta:request.body.instagram,
          facebk:request.body.facebook
        }

       require("./DB/db").saveCadastro(object,function (){
         
       });
     
     
 });
 
  

/*Ouvindo o servidor na porta (PORT)*/
app.listen(PORT, () =>{
    console.log("Listening at: 3200...");
});