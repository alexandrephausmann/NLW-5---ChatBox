import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnection {
    socket_id: string,
    admin_id?: string,
    user_id: string,
    id?: string
}

class ConnectionsService {
    private connectionRepository: Repository<Connection>;

    constructor() {
        this.connectionRepository = getCustomRepository(ConnectionsRepository)
    }

    async create({ socket_id, admin_id, user_id, id }: IConnection) {

        const connection = this.connectionRepository.create({
            socket_id,
            admin_id,
            user_id,
            id
        })

        await this.connectionRepository.save(connection);
        return connection;
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionRepository.findOne({
            user_id
        });
        return connection;
    }
    async findAllWithoutAdmin() {
        const connections = await this.connectionRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        });
        return connections;
    }
    async findBySocketId(socket_id: string) {
        const connection = await this.connectionRepository.findOne({ socket_id })
        return connection;
    }

}

export { ConnectionsService }

