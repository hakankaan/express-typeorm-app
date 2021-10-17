import { Repository } from "typeorm";

export abstract class AbstractService {
    constructor(private readonly repository: Repository<any>) { }

    async find(options) {
        return await this.repository.find(options)
    }

    async findOne(options) {
        return await this.repository.findOne(options)
    }

    async save(options) {
        return await this.repository.save(options)
    }

    async update(id, options) {
        return await this.repository.update(id, options)
    }

    async delete(id: number) {
        return await this.repository.delete(id)
    }
}