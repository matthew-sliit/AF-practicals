exports.Vehicle = class Vehicle{
    static COLLECTION = "vehicles";
    constructor() {
        this.id = '';
        this.code = '';
        this.model = '';
        this.type = '';
        this.name = '';
        this.categories = [];
    }
    addNew(code, model, type, name, categories){
        this.code = code;
        this.model = model;
        this.type = type;
        this.name = name;
        this.categories =categories;
    }
    loadFromDB(obj){
        Object.assign(this,obj);
        this.id = obj._id.toString();
    }
    getSaveToDb(){
        return {"code":this.code,"model":this.model,"type":this.type,"name":this.name,"categories":this.categories};
    }
}