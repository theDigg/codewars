let ioclient = require('socket.io-client');

const socket = ioclient.connect('http://localhost:3000', { port: 3000 });
console.log(socket);
// subscribe to a Socket
// pass in callback that gets run when recieving messages
export const subscribeToSocket = (name, cb) => {
  // subscribe to messages
  socket.on('message', (message) => cb(message));
  // now tell server we want to subscribe
  socket.on('connect', (data) => {
    socket.emit('subscribeToMessage', name);
  })

};

export const sendMessage = (message) => {
  console.log('sending message', message)
  socket.emit('message', message);
};

//timer 
const timerSocket = ioclient('http://localhost:3000/timer', { port: 3000 });

export const subscribeToTimerSocket = (cb) => {
  timerSocket.on('date', (date) => {
    cb(date);
  })
}

export const getDateTimerSocket = () => {
  timerSocket.emit('getDate');
}

const gameSocket = ioclient('http://localhost:3000/game', { port: 3000 });

export const subscribeToGameSocket = (onGameStart, onScoreboardChange) => {

  gameSocket.on('connect', () => console.log('successfully subscribed'));

  gameSocket.on('scoreboardChange', (data) => {
    console.log('scoreboard changed', data);
    onScoreboardChange(data);
  });

  gameSocket.on('gameStart', onGameStart);
};

export const gameComplete = () => {
  console.log('emiting game complete')
  gameSocket.emit('gameComplete');
};

export const joinWaitingRoom = (userInfo) => gameSocket.emit('joinWaitingRoom', userInfo);

export const exitWaitingRoom = (userInfo) => gameSocket.emit('exitWaitingRoom', userInfo)