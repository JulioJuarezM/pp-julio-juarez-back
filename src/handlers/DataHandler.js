const {MongoClient} = require('mongodb'),
    encriptor = require('./SecurityHandler');


async function findAllData() {
    const uri = "mongodb+srv://jcjuarezm:jcjuarezm16@cluster0.piwn5.mongodb.net/<personas>?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    result = await client.db("Personas").collection("Clientes").find({ }).toArray();   
    console.log(result);
    return result;
}

async function findAByNameAndHobbyData(req) {

    const uri = "mongodb+srv://jcjuarezm:jcjuarezm16@cluster0.piwn5.mongodb.net/<personas>?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    
    var query = { Nombre: req.body.Nombre, Pasatiempo: req.body.Pasatiempo};
    result = await client.db("Personas").collection("Clientes").find(query).toArray();   
    return result;
}

async function insertData(document){
    try{
        const uri = "mongodb+srv://jcjuarezm:jcjuarezm16@cluster0.piwn5.mongodb.net/<personas>?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();
    
        var jsonDocument = document.body;
    
        result = client.db("Personas").collection("Clientes").insertOne(jsonDocument, function(err, res) {
            if (err) throw err;
            return res;
          });
        console.log(result);
        return {mensaje : "Full inserted!!!"};
    }
    catch(error){
        return {mensaje : "Error on insert!!!"}
    }
}

async function findClientSpecified(req) {

    const uri = "mongodb+srv://jcjuarezm:jcjuarezm16@cluster0.piwn5.mongodb.net/<personas>?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    let fecha1 = new Date('2016/08/12');
    let fecha2 = new Date();
    let resta = fecha2.getTime() - fecha1.getTime()
    var query = { Edad: { $gt: 18 },  Genero:"M"};
    result = await client.db("Personas").collection("Clientes").find(query,{ projection: { Nombre: 1, Telefono: 1, Pasatiempo: 1}}).toArray();   
    return result;
}

module.exports.findAllData =findAllData;
module.exports.insertData =insertData;
module.exports.findAByNameAndHobbyData =findAByNameAndHobbyData;
module.exports.findClientSpecified =findClientSpecified;