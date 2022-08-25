import containerMongoose from "../containers/containerMongoose.js";
import { faker } from "@faker-js/faker";
import { normalize, schema } from "normalizr";
import util from "util";
import {
    productsCollection,
    messagesCollection,
} from "../connections/mongoose.js";

const productos = new containerMongoose(productsCollection);
const mensajes = new containerMongoose(messagesCollection);

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

const generateObject = () => {
    return {
        title: faker.vehicle.vehicle(),
        thumbnail: faker.image.transport(640, 480, true),
        price: faker.random.numeric(7),
    };
};

const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });
const schemaMessages = new schema.Entity(
    "messages",
    {
        author: schemaAuthor,
    },
    { idAttribute: "_id" }
);

const normalizeMessages = (messages) => {
    const messagesNormalized = normalize(messages, [schemaMessages]);
    return messagesNormalized;
};

async function socketController(socket, io) {
    socket.emit("connectionToServer", {
        array_productos: await productos.getAll(),
        array_mensajes: normalizeMessages(await mensajes.getAll()),
    });
    socket.emit("connectionToTest", {
        productsTest: productos.populate(generateObject),
    });
    socket.on("agregarProducto", async (data) => {
        await productos.save(data);
        io.sockets.emit("actualizarTabla", {
            array_productos: await productos.getAll(),
        });
    });
    socket.on("enviarMensaje", async (data) => {
        await mensajes.save(data);
        io.sockets.emit("actualizarMensajes", {
            array_mensajes: normalizeMessages(await mensajes.getAll()),
        });
    });
    socket.on("eliminarProductos", async () => {
        await productos.deleteAll();
        io.sockets.emit("actualizarTabla", {
            array_productos: await productos.getAll(),
        });
    });
    socket.on("eliminarMensajes", async () => {
        await mensajes.deleteAll();
        io.sockets.emit("actualizarMensajes", {
            array_mensajes: normalizeMessages(await mensajes.getAll()),
        });
    });
    socket.on("eliminarProducto", async (id) => {
        await productos.deleteById(id);
        io.sockets.emit("actualizarTabla", {
            array_productos: await productos.getAll(),
        });
    });
    socket.on("editarProducto", async (id, producto) => {
        await productos.updateById(id, producto);
        io.sockets.emit("actualizarTabla", {
            array_productos: await productos.getAll(),
        });
    });
}

export default socketController;
