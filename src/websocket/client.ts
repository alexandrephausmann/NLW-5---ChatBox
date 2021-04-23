import { io } from "../htpp";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";


io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();

    socket.on("client_first_acess", async (params) => {
        const socket_id = socket.id
        const { text, email } = params;

        const userExists = await usersService.findByEmail(email);

        if (!userExists) {

            const user = await usersService.create(email);

            await connectionsService.create({
                socket_id,
                user_id: user.id
            })

        } else {
            const connection = await connectionsService.findByUserId(userExists.id);
            console.log("conn ", connection)
            if (!connection) {
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                })
            } else {
                connection.socket_id = socket_id;
                console.log("teste ")
                await connectionsService.create(connection);
            }


        }

        // salvar conexão

    })
});

