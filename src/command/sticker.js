import Base from '../utils/commandBase.js'

export default class Sticker extends Base {
  constructor() {
    super('sticker')
  }
  async run(msg,client) {
    const { id } = msg
    const types = ['video', 'image']

    if (!msg.hasQuotedMsg) {
      return msg.reply('🤖 Você precisa responder a mensagem com a imagem.')
    }

    const quotedMessage = await msg.getQuotedMessage()

    if (!types.includes(quotedMessage.type)) {
      return msg.reply('🤖 Não encontrei nenhum vídeo/gif/foto');
    }

    client.sendMessage(id._serialized, '🤖 Carregando');
    const media = await quotedMessage.downloadMedia();
    return msg.reply(`Ta ai a figurinha`, id._serialized, {
      media,
      sendMediaAsSticker: true,
    });
  }

}