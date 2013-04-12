var sw = require("swagger-node-express/Common/node/swagger");
var param = require("swagger-node-express/Common/node/paramTypes");
var url = require("url");
var swe = sw.errors;

var wrapper = require("ft-node-modules/wrapper"),
    wrapperModel = require("./sampleData");

//function writeResponse (res, data) {
//    sw.setHeaders(res);
//    res.send(JSON.stringify(data));
//}

exports.models = require("./models.js");

exports.findById = {
    'spec': {
        "description": "Wrapper operations",
        "path": "/wrapper/{wrapper}",
        "notes": "Returns a wrapper based on name",
        "summary": "Find wrapper",
        "method": "GET",
        "params": [
            param.path("wrapper", "Wrapper to be fetched e.g. 'ftalphaville'", "string")
            //param.query("refresh", "Refresh the wrapper from source", "boolean", false, false)
        ],
        "responseClass": "Wrapper",
        "errorResponses": [swe.invalid('wrapper'), swe.notFound('wrapper')],
        "nickname": "getWrapperById",
        "consumes": ["application/json"],
        "produces": ["text/html"]
    },
    'action': function (req, res) {
        if (!req.params.wrapper) {
            throw swe.invalid('wrapper');
        }

        var id = req.params.wrapper;

        wrapper.fetch(id, function (err, html) {
            console.info("Fetched " + id);
            //result = wrapper.process(html, wrapperModel.populate());

            //response.send(result);
            if (html) {
                res.header("Content-Type", "text/html; charset=utf-8");
                res.send(html);
            } else {
                throw swe.notFound('wrapper');
            }
        });


        //var pet = data.getPetById(id);


    }
};

exports.processModelIntoWrapper = {
    'spec': {
        "description": "Wrapper operations",
        "path": "/wrapper/{wrapper}",
        "notes": "Process a model into a wrapper",
        "summary": "Process a model into a wrapper",
        "method": "POST",
        "params": [
            param.path("wrapper", "The wrapper to populate","string"),
            param.post("string", "JSON model of the content to populate",JSON.stringify(wrapperModel.populate()))
        ],
        "responseClass": "Wrapper",
        "errorResponses": [swe.invalid('input')],
        "nickname": "processModelIntoWrapper",
        "consumes": ["application/json"],
        "produces": ["text/html"]
    },
    'action': function (req, res) {
        var wrapperId = req.params.wrapper,
            model = req.body;

        //console.log(req.body);

        if (!wrapperId) {
            throw swe.invalid('wrapper');
        }

        wrapper.fetch(wrapperId, function (err, html) {
            console.info("Fetched " + wrapperId);
            result = wrapper.process(html, model);

            //response.send(result);
            if (result) {
                res.header("Content-Type", "text/html; charset=utf-8");
                res.send(result);
            } else {
                throw swe.notFound('wrapper');
            }
        });


        //console.log(req.body);
//        var body = req.body;
//
//        console.log(body);
//
//        if (!body || !body.id) {
//            throw swe.invalid('id');
//        }
//        else {
//            var id = body.id,
//                model = body.model;
//
//            wrapper.fetch(id, function (err, html) {
//                console.info("Fetched " + id);
//                result = wrapper.process(html, wrapperModel.populate());
//
//                //response.send(result);
//                if (result) {
//                    res.header("Content-Type", "text/html; charset=utf-8");
//                    res.send(result);
//                } else {
//                    throw swe.notFound('wrapper');
//                }
//            });
//
//           // data.addPet(body);
//            //res.send(200);
//        }
    }
};

//exports.findByStatus = {
//    'spec': {
//        "description" : "Operations about pets",
//        "path" : "/pet.{format}/findByStatus",
//        "notes" : "Multiple status values can be provided with comma-separated strings",
//        "summary" : "Find pets by status",
//        "method": "GET",
//        "params" : [
//            param.query("status", "Status in the store", "string", true, true, "LIST[available,pending,sold]", "available")
//        ],
//        "responseClass" : "List[Pet]",
//        "errorResponses" : [swe.invalid('status')],
//        "nickname" : "findPetsByStatus"
//    },
//    'action': function (req,res) {
//        var statusString = url.parse(req.url,true).query["status"];
//        if (!statusString) {
//            throw swe.invalid('status'); }
//
//        var output = data.findPetByStatus(statusString);
//        res.send(JSON.stringify(output));
//    }
//};
//
//exports.findByTags = {
//    'spec': {
//        "path" : "/pet.{format}/findByTags",
//        "notes" : "Multiple tags can be provided with comma-separated strings. Use tag1, tag2, tag3 for testing.",
//        "summary" : "Find pets by tags",
//        "method": "GET",
//        "params" : [param.query("tags", "Tags to filter by", "string", true, true)],
//        "responseClass" : "List[Pet]",
//        "errorResponses" : [swe.invalid('tag')],
//        "nickname" : "findPetsByTags"
//    },
//    'action': function (req,res) {
//        var tagsString = url.parse(req.url,true).query["tags"];
//        if (!tagsString) {
//            throw swe.invalid('tag'); }
//        var output = data.findPetByTags(tagsString);
//        writeResponse(res, output);
//    }
//};
//
//exports.addPet = {
//    'spec': {
//        "path" : "/pet",
//        "notes" : "adds a pet to the store",
//        "summary" : "Add a new pet to the store",
//        "method": "POST",
//        "params" : [param.post("Pet", "Pet object that needs to be added to the store")],
//        "errorResponses" : [swe.invalid('input')],
//        "nickname" : "addPet"
//    },
//    'action': function(req, res) {
//
//        var body = req.body;
//        console.log(body)
//        if(!body || !body.id){
//            throw swe.invalid('pet');
//        }
//        else{
//            data.addPet(body);
//            res.send(200);
//        }
//    }
//};
//
//exports.updatePet = {
//    'spec': {
//        "path" : "/pet.{format}",
//        "notes" : "updates a pet in the store",
//        "method": "PUT",
//        "summary" : "Update an existing pet",
//        "params" : [param.post("Pet", "Pet object that needs to be updated in the store", "{\n  \"id\": 3,\n  \"category\": {\n    \"id\": 2,\n    \"name\": \"Cats\"\n  },\n  \"name\": \"Cat 3\",\n  \"urls\": [\n    \"url1\",\n    \"url2\"\n  ],\n  \"tags\": [\n    {\n      \"id\": 3,\n      \"name\": \"tag3\"\n    },\n    {\n      \"id\": 4,\n      \"name\": \"tag4\"\n    }\n  ],\n  \"status\": \"available\"\n}")],
//        "errorResponses" : [swe.invalid('id'), swe.notFound('pet'), swe.invalid('input')],
//        "nickname" : "addPet"
//    },
//    'action': function(req, res) {
//        var body = req.body;
//        if(!body || !body.id){
//            throw swe.invalid('pet');
//        }
//        else {
//            data.addPet(body);
//            res.send(200);
//        }
//    }
//};
//
//exports.deletePet = {
//    'spec': {
//        "path" : "/pet.{format}/{id}",
//        "notes" : "removes a pet from the store",
//        "method": "DELETE",
//        "summary" : "Remove an existing pet",
//        "params" : [param.path("id", "ID of pet that needs to be removed", "string")],
//        "errorResponses" : [swe.invalid('id'), swe.notFound('pet')],
//        "nickname" : "deletePet"
//    },
//    'action': function(req, res) {
//        var id = parseInt(req.params.id);
//        data.deletePet(id)
//        res.send(200);
//    }
//};