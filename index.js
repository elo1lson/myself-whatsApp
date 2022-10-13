import whatsapp from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import loadCommand from './src/utils/loadCommand.js';

const client = new whatsapp.Client({
  authStrategy: new whatsapp.LocalAuth({ clientId: 'bot' })
});

loadCommand(client)
console.log(client.commands);
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
});

client.on('authenticated', (session) => {
  console.log('Autenticado');
});


client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message_create', msg => {
  if(msg.id.fromMe) return
  client.commands.get(msg.body).run(msg,client)

});

client.initialize();