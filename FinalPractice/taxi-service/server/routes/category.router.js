const Router = require('@koa/router');
const mongo = require('mongodb');
const {saveDocument} = require("../api/db/mongodb.api");
const readAllDocuments = require('../api/db/mongodb.api').readAllDocuments;
const readDocument = require('../api/db/mongodb.api').readDocument;
const readDocumentWithQuery = require('../api/db/mongodb.api').readDocumentWithQuery;
//user defined
const Vehicle = require('../api/vehicle.api').Vehicle;
const Category = require('../api/categories.api').Category;
//prefix
const router = new Router({prefix:'/category'});

/*
GET method to retrieve all categories
or vehicles for category
 */
router.get('/type/:categoryid', async context=>{
   const categoryid = context.params.categoryid;
   //for all categories, parameter = default, else parameter = category
    console.log("Getting categories for "+categoryid);
    let vehicleInCategory = false;
    if(categoryid==="default"){
    }else{
        vehicleInCategory = true;
    }
    context.response.set('content-type','application/json');
    let dbArray = [];
    try{
        if(vehicleInCategory){
            let categoryObjectId = new mongo.ObjectId(categoryid);
            let dbFindQuery = {categories:categoryObjectId};
            await readDocumentWithQuery(Vehicle.COLLECTION,dbFindQuery).then(
                function (resolved){
                    dbArray = resolved;
                }
            )
            if(dbArray.length>0){
                //have vehicles stored in db
                context.body = dbArray;
            }else context.body = [{name:"No Vehicles Added!"}];
        }else{
            await readAllDocuments(Category.COLLECTION).then(
                function (resolved){
                    context.body = resolved;
                }
            )
        }
    }catch (e){
        console.log(e);
        context.body = [{name:"Error, unable to retrieve!"}];
    }
});
router.get("/vehicle", async context=>{
    context.response.set('content-type','application/json');
    try{
        await readAllDocuments(Vehicle.COLLECTION).then(
            function (resolved){
                context.body = resolved;
            }
        )
    }catch (e){
        console.log(e);
        context.body = "Server Error!";
    }
});
/*
POST method to add new vehicle
 */
router.post('/vehicle',async context=>{
    let vehicle = new Vehicle();
   try{
       const bodyData = context.request.body;
       Object.assign(vehicle,bodyData);
       console.log("new vehicle -> "+JSON.stringify(vehicle));
       context.response.set('content-type','application/json');
       await readDocument(Vehicle.COLLECTION,"code",bodyData.code).then(
           function (resolved){
               if(resolved.length>0){
                   context.body = "Vehicle Already Added!";
               }else{
                   saveDocument(Vehicle.COLLECTION,[vehicle.getSaveToDb()]);
                   context.body = "success";
               }
           }
       )
   }catch (e){
       console.log(e);
       context.body = "Server Error!";
   }
});
/*
POST method to add new category
 */
router.post('/add',async context=>{
    const body = context.request.body;
    let categoryName = body.name;
    console.log("new category -> "+categoryName);
    const category = new Category();
    category.addNew(categoryName);
    //response header type
    context.response.set('content-type','application/json');
    try{
        await readDocument(Category.COLLECTION,"name",categoryName).then(
            function (resolved){
                if(resolved.length>0){
                    context.body = "Category Already Exists!";
                }else{
                    saveDocument(Category.COLLECTION,[category.getSaveToDb()]);
                    context.body = "success";
                }
            }
        )
    }catch (e){
        console.log(e);
        context.body = "Server Error!";
    }
});
exports.Router=router;