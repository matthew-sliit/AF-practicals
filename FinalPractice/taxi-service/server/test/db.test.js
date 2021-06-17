const saveDocument = require('../api/db/mongodb.api').saveDocument;
const readDocument = require('../api/db/mongodb.api').readDocument;
const updateDocument = require('../api/db/mongodb.api').updateDocument;
const deleteDocument = require('../api/db/mongodb.api').deleteDocument;
//api classes
const Category = require('../api/categories.api').Category;
const Vehicle = require('../api/vehicle.api').Vehicle;

let category = new Category();
const categoryName = "Test";
category.addNew(categoryName);
//save new document
test('save new category as a document in database', ()=>{
    expect(()=>saveDocument(Category.COLLECTION,[category.getSaveToDb()])).not.toThrow();
})
//read the category document
let savedCategory = null;
test('read the category Document from db',()=>{
    return readDocument(Category.COLLECTION,"name",categoryName).then(dbArray => {
        savedCategory = new Category();
        savedCategory.loadFromDB(dbArray[0]);
        expect(savedCategory.name).toBe(categoryName);
    });
});
//save new vehicle
let vehicleCode = "TEST-0000";
test('save new vehicle Document in db',()=>{
    let vehicle = new Vehicle();
    vehicle.addNew(vehicleCode,"testModel","testType","testName",[savedCategory]);
    expect(()=>saveDocument(Vehicle.COLLECTION,[vehicle.getSaveToDb()])).not.toThrow();
});
//read the vehicle document
test('read the category Document from db',()=>{
    return readDocument(Vehicle.COLLECTION,"code",vehicleCode).then(dbArray => {
        let savedVehicle = new Vehicle();
        savedVehicle.loadFromDB(dbArray[0]);
        expect(savedVehicle.code).toBe(vehicleCode);
    });
});
//delete the vehicle document
test('delete the vehicle Document from db',()=>{
    return deleteDocument(Vehicle.COLLECTION,"code",vehicleCode).then(result =>{
        expect(result.deletedCount).toBe(1);
    });
});
//delete the category document
test('delete the category Document from db',()=>{
    return deleteDocument(Category.COLLECTION,"name",categoryName).then(result =>{
        expect(result.deletedCount).toBe(1);
    });
});
let y, x;
test('y=2x (x=2,y=4)',()=>{
    x = 2;
    y = 2*x;
    expect(y).toBe(4);
});
