const { askAI } = require('./ai');

async function handleMessage(sock, m) {
  const from = m.key.remoteJid;

  const text =
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    '';

  if (!text) return;

  const ctx = m.message?.extendedTextMessage?.contextInfo;
  const isReply = ctx?.quotedMessage;
  const isMention = ctx?.mentionedJid?.length > 0;

  if (!isReply && !isMention) return;

  const reply = await askAI(text);

  await sock.sendMessage(from, { text: reply });
}

module.exports = { handleMessage };
