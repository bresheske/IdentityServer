
import { IdentityModel } from "./identityModel";

export class IdentityDB {
    private model:any;
    private mongoose: any = require('mongoose');
    private connection: any = require('../config.json').connectionString;

    constructor() {
        this.mongoose.Promise = Promise;
        this.mongoose.connect(this.connection, {useMongoClient: true});
        this.model = this.mongoose.model('identity', this.getSchema());
    }

    getSchema(): object {
        return new this.mongoose.Schema({
            username: {
                type: String,
                unique: true
            },
            password: String,
            claims: [ { key: String, value: String } ]
        });
    }

    create(identity:IdentityModel) {
        return new this.model(identity);
    }

    close() {
        this.mongoose.connection.close();
    }

    async login(username: string, password: string) {
        return this.model
            .findOne({username: username, password: password})
            .exec();
    }

    async findByUsername(username: string) {
        return this.model
            .findOne({username: username})
            .exec();
    }

    async getAll() {
        return this.model
            .find()
            .exec();
    }
}