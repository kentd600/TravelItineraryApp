import mongoose from "mongoose";
const userSchema = {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    username: { type: String, required: true, unique: true },
    hashedPass: { type: String, required: true }
};
export class UserModel {
    schema;
    model;
    constructor() {
        this.schema = new mongoose.Schema(userSchema);
        this.model = mongoose.model('wanderer_users', this.schema);
    }
    async findUser(username) {
        const result = await this.model.findOne({ username });
        return result;
    }
    async findUserSafe(username) {
        const result = await this.model.findOne({ username }, { hashedPass: 0 });
        return result;
    }
    async findUserById(id) {
        const result = await this.model.findById(id);
        return result;
    }
    async addUser(input) {
        const result = await this.model.insertOne(input);
        return result;
    }
}
//# sourceMappingURL=UserModel.js.map