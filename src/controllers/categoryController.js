import CategoryModel from '../models/categoryModel.js';

class CategoryController {
    static async getAllCategories (req,res,next) {
        try {
            const selectedCategories = await CategoryModel.selectCategories()
            res.status(200).json(selectedCategories)
        } catch (error) {
            next(error);
        }
    }

    static async createCategory (req,res,next) {
        
        const categoryData = req.body
        const {name} = categoryData
        if (!name) {
            return res.status(400).json({"error":"faltan datos"})
        }

        try {
            const createdCategory = await CategoryModel.insertCategory(categoryData)
            res.status(201).json(createdCategory)
        } catch (error) {
            next(error);
        }
    }

    static async updateCategory (req,res,next) {
        
        const {id} = req.params;
        const {name, description} = req.body
        if (!name) {
            return res.status(400).json({"error":"faltan datos"})
        }

        if (isNaN(id)) {
            return res.status(400).json({"error":"id invalido"});    
        }

        try {
            const updatedCategory = await CategoryModel.updateCategory(id, name);

            if (!updatedCategory) {
                return res.status(404).json({"error":"Categoria no encontrada"})
            }

            res.status(200).json(updatedCategory)
        } catch (error) {
            next(error);
        }
    }

    static async getCategoryById (req,res,next) {
        try {
            const {id} = req.params;

            if (isNaN(id)) {
                return res.status(400).json({"error":"id invalido"});    
            }

            const selectedCategory = await CategoryModel.selectCategory(id)   

            if (!selectedCategory) {
                return res.status(404).json({"error":"Categoria no encontrada"});    
            }
            res.status(200).json(selectedCategory)
        } catch (error) {
            next(error);
        }
    }

    static async removeCategory (req,res) {

        try {    
            const {id} = req.params;

            if (isNaN(id)) {
                return res.status(400).json({"error":"id invalido"});    
            }
        
            const deletedCategory = await CategoryModel.deleteCategory(id);
        
            if (!deletedCategory) {
                return res.status(404).json({"error":"Categoria no encontrada"});    
            }
            res.status(200).json({message:"Categoria eliminada ", deletedCategory});
            
        } catch (error) {
            console.error("error al actualizar categorias", error);
            res.status(500).json({error:error});
        }
    }
}

export default CategoryController;
