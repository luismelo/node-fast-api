import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

const teams = [
    {
        id: 1, name: 'Driver A', team: 'Team A'
    },
    {
        id: 2, name: 'Driver B', team: 'Team B'
    }
]

server.get('/teams', async (request, response) => {
    response.type('application/json').code(200);

    return {
        id: 1,
        name: 'Team A'
    };
})

interface DriverParams {
    id: string;
}

server.get<{Params: DriverParams}>('/drivers/:id', async (request, response) => {
    response.type('application/json').code(200);
    const id = parseInt(request.params.id);
    const driver = teams.find(driver => driver.id === id);
    if (!driver) {
        response.code(404);
        return { message: 'Driver not found' };
    }
    return driver;
})

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    server.log.info(`Server listening at ${address}`);
});
