const UserModel = require('../db_models/users');

class Users {
    get model() {
        return UserModel;
    }

    async getOne(query, options) {
        try {
            const user = await this.model.findOne(query);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async addOne(data) {
        try {
            const user = await new UserModel(data).save();
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Users();
