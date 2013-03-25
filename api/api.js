var express = require("express")
    , url = require("url")
    , swagger = require("swagger-node-express")
    , models = require("./models");

var app = express();
app.use(express.bodyParser());

swagger.setAppHandler(app);

swagger.addModels(models);

var findById = {
    'spec': {
        "description" : "Operations about pets",
        "path" : "/pet.{format}/{petId}",
        "notes" : "Returns a pet based on ID",
        "summary" : "Find pet by ID",
        "method": "GET",
        "params" : [swagger.pathParam("petId", "ID of pet that needs to be fetched", "string")],
        "responseClass" : "Pet",
        "errorResponses" : [swagger.errors.invalid('id'), swagger.errors.notFound('pet')],
        "nickname" : "getPetById"
    },
    'action': function (req,res) {
        if (!req.params.petId) {
            throw swagger.errors.invalid('id'); }
        var id = parseInt(req.params.petId);
        var pet = petData.getPetById(id);

        if(pet) res.send(JSON.stringify(pet));
        else throw swagger.errors.notFound('pet');
    }
};

swagger.addGet(findById);

swagger.configure("http://localhost", "0.1");

app.listen(8002);