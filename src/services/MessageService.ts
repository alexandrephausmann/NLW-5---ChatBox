import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
    text: string,
    admin_id?: string,
    user_id: string
}

class MessageService {
    private messageRepository: Repository<Message>;

    constructor() {
        this.messageRepository = getCustomRepository(MessagesRepository)
    }

    async create({ text, admin_id, user_id }: IMessageCreate) {

        const message = this.messageRepository.create({
            text,
            admin_id,
            user_id
        })

        await this.messageRepository.save(message);
        return message;
    }

    async listByUser(user_id: string) {

        const list = await this.messageRepository.find({
            where: { user_id },
            relations: ["user"]
        })

        return list;
    }
}

export { MessageService }

