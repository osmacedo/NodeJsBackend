import UserModel from '../models/userModel.js';

class UserController{

    static async getAllUsers(req, res, next){
        try {
            const selectedUsers = await UserModel.selectUsers()
            res.status(200).json(selectedUsers)
            console.log(selectedUsers)
        } catch (error) {
            next(error);
        }

    }
    
    static async createUser(req, res, next){

        const userData = req.body
        const {name} = userData
        if (!name) {
            return res.status(400).json({"error":"faltan datos"})
        }

        try {
            const createdUser = await UserModel.insertUser(userData)
            res.status(201).json(createdUser)
        } catch (error) {
            next(error);
        }

    }
    
    static async updateUser(req, res, next){
        // Llaves cuando req.params tiene varios valores, para llamar un parametro de la funcion
        const {id} = req.params
        const userData = req.body
        const {name} = userData
        if (!name) {
            return res.status(400).json({"error":"faltan datos"})
        }

        try {
            const updatedUser = await UserModel.updateUser(id, userData)
            res.status(201).json(updatedUser)
        } catch (error) {
            next(error);
        }

    }

    static async getUserById(req, res) {
        const { id } = req.params;
    
        if(isNaN(id)) {
          return res.status(400).json({ error: "Invalid ID" });
        }
        try {
          const user = await UserModel.getUserById(id);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          return res.status(200).json(user);
        } catch (error) {
          console.error("Error fetching user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }
    
      
    static async getUserByUsername(req, res) {
        const { id } = req.params;
        const { username } = req.body;
    
        try {
            const user = await UserModel.getUserById(id);
            const username = await UserModel.getUserByUsername(username);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          return res.status(200).json(user);
        } catch (error) {
          console.error("Error fetching user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }

      static async deleteUser(req, res) {
        const { id } = req.params;
    
        if (isNaN(id)) {
          return res.status(400).json({ error: "Invalid ID" });
        }
        try {
          const deletedUser = await UserModel.deleteUser(id);
          if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
          }
          return res.status(200).json({ message: "User deleted", deletedUser });
        } catch (error) {
          console.error("Error deleting user:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }
}

export default UserController;
