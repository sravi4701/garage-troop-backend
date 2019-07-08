const UserOTPModel = require('../db_models/users-otp');

class Users {
    get model() {
        return UserOTPModel;
    }

    async getOne(query, options) {
        try {
            const data = await this.model.findOne(query);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async addOne(data) {
        try {
            const userOtp = await new UserOTPModel(data).save();
            return userOtp;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(query, update, setOnInsert = {}, options = {}) {
        try {
            if (options.upsert) {
                update.$setOnInsert = setOnInsert;
                const updates = await this.model.update(query, update, { upsert: true });
                return updates;
            }
            const updates = await this.model.update(query, update);
            return updates;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Users();
