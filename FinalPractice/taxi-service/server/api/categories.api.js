exports.Category = class Category{
    static COLLECTION = "categories";
    constructor() {
        this.id = '';
        this.name = '';
    }
    addNew(name){
        this.name = name;
    }
    loadFromDB(obj){
        this.id = obj._id.toString();
        this.name = obj.name.toString();
    }
    getSaveToDb(){
        return {"name":this.name};
    }
}