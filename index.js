const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const pets = ['pig', 'dragon', 'chicken', 'frog', 'eagle'];
const types = ['fire', 'amethyst', 'crystal', 'air', 'water'];
const mobs = ['beetle', 'cockroach', 'mantis', 'cat', 'dog', 'ant'];

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('fight', (data) => {
        const pet = data.pet;
        const type = data.type;
        const mob = mobs[Math.floor(Math.random() * mobs.length)];
        const result = Math.random() > 0.5 ? 'win' : 'lose';

        socket.emit('fightResult', { pet, type, mob, result });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
