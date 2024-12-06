import WebSocket, { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString(),
    });

    // * Send to all
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    // * Send to all except self
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });

    // ws.send(JSON.stringify(payload));
  });

  ws.on('close', () => {
    console.log('Client disconected');
  });

  // ws.send('Hola desde el servidor');

  // setInterval(() => {
  //   ws.send('Hola de nuevo');
  // }, 2000);
});

console.log(`http://localhost:3000`);
