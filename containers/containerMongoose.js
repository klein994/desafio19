import { logger } from "./index.js";
class containerMongoose {
    constructor(collection) {
        this.collection = collection;
    }
    async save(elem){
        try{
            const added = new this.collection(elem);
            await added.save();
            return added;
        } catch(err){
            logger.error(`Error al Insertar: ${err.message}`);
            throw new Error(`Error al Insertar: ${err.message}`)
        }
    }
    async getById(id){
        try{
            const element = await this.collection.findById(id).select({ __v: 0 }).lean();
            return element;
        }catch(err) {
            logger.error(`Error al Leer: ${err.message}`);
            throw new Error(`Error al Leer: ${err.message}`)
        }
    }
    async getAll(){
        try{
            const elements = await this.collection.find().select({ __v: 0 }).lean();
            return elements;
        } catch(err) {
            logger.error(`Error al Leer: ${err.message}`);
            throw new Error(`Error al Leer: ${err.message}`)
        }
        
    }
    async updateById(id, elem){
        try{
            const updated = await this.collection.findByIdAndUpdate(id, elem, { new: true });
            return updated;
        }
        catch(err) {
            logger.error(`Error al Actualizar: ${err.message}`);
            throw new Error(`Error al Actualizar: ${err.message}`)
        }
    }
    async deleteById(id){
        try{
            const deleted = await this.collection.findByIdAndDelete(id);
            if(!deleted){ throw new Error(`Error al Borrar: Elemento no encontrado`) }
            return deleted;
        }
        catch(err) {
            logger.error(`Error al Borrar: ${err.message}`);
            throw new Error(`Error al Borrar: ${err.message}`)
        }
    }
    async deleteAll(){
        try{
            await this.collection.deleteMany({});
        } catch(err) {
            logger.error(`Error al Borrar: ${err.message}`);
            throw new Error(`Error al Borrar: ${err.message}`)
        }
    }
    populate(generateObject, cant = 100){
        const array = [];
        for (let i = 0; i < cant; i++) {
            array.push(generateObject());
        }
        return array;
    }
}

export default containerMongoose;