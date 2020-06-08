var mongoClient = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID; 

var  BANCO = "jnnoticia";
var  PORTA = "27017";
var  SERVE =  "localhost";

/*-------Tabelas-------------*/
var tb_usuario = "usuario";  
/*String de conexao */
var  url = "mongodb://" +SERVE+ ":"+ PORTA +"/"+ BANCO;
console.log("\n Banco de dados Mongo-DB conectado em"+ url);



/* Função Insert no banco de dados */
function saveCadastro(objeto,callback){
 
    mongoClient.connect(url,function(err,db){
        if(err) 
          return console.log(err)  

        db.db(BANCO).collection(tb_usuario).insert(objeto,function(err,result){
          if(err) 
           return console.log(err);

          console.log(result);
          
          db.close();
          callback();

       });
     });
    
  }


/* Função select All no banco de dados */
function findCadastro(callback){
 mongoClient.connect(url, function(err, db) {
    if (err) 
       throw err;  
    db.db(BANCO).collection(tb_usuario).find({}).toArray(function(err, docs) {
    if (err)
      throw err;

     console.log(docs);

    db.close();
    callback(docs);

   });
   
 });

}



/* Função select ID no banco de dados */
function findCadastro_id(id_one,callback){
  mongoClient.connect(url, function(err, db) {
     if (err) 
        throw err;  
     db.db(BANCO).collection(tb_usuario).find({_id: ObjectID(id_one)}).toArray(function(err, docs) {
     if (err)
       throw err;
       
      console.log(docs);
 
     db.close();
     callback(docs);
 
    });
    
  });
 
 }
 
/* Função select nome (find All)*/
function findCadastroAllNome(nome_user,callback){
  mongoClient.connect(url, function(err, db) {
     if (err) 
        throw err;  
     db.db(BANCO).collection(tb_usuario).find({nome:nome_user}).toArray(function(err, docs) {
     if (err)
       throw err;
       
      console.log(docs);
 
     db.close();
     callback(docs);
 
    });
    
  });
 
 }


 /* Função select nome (find One)*/
function findCadastroOneNome(nome_user,callback){
  mongoClient.connect(url, function(err, db) {
     if (err) 
        throw err;  
     db.db(BANCO).collection(tb_usuario).findOne({nome:nome_user},function(err, docs) {
      if (err)
      throw err;
      
     console.log(docs);

    db.close();
    callback(docs);
 
    })
    
  });
 
 }
 

module.exports = {findCadastro,findCadastro_id,findCadastroAllNome,findCadastroOneNome,saveCadastro}

