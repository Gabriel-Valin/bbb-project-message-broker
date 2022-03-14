require('dotenv').config()
const amqp = require('amqplib')
const mongoose = require('mongoose');
const url = process.env.MONGODB_ATLAS_URI

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const Vote = mongoose.model('Vote', {
    emparedadoID: Number, 
    paredaoID: Number, 
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
});

const createVoto = async (emparedadoID, paredaoID) => {
    const voto = new Vote({ emparedadoID, paredaoID })
    const votoAwait = voto.save()
    return votoAwait
}

const insertMessage = async (message) => {
    parseMessage = JSON.parse(message.content.toString())
    console.log(parseMessage)
    const insertVoto = await createVoto(parseMessage.idEmparedadoRecebido, parseMessage.numeroParedaoRecebido)
    return insertVoto
}

async function connect() {
 try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue('create_votes_queue', { durable: true })
    queueConsume = await channel.consume('create_votes_queue', insertMessage, { noAck: true });
} catch (error) {
   console.error(error);
 }
}

mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ')
        connect();
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
