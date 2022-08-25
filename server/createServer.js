export default function createServer(httpServer, port) {
    httpServer.listen(port, () => {
        console.log(
            `Escuchando en el puerto ${port} - PID WORKER ${process.pid}`
        );
    });
}
