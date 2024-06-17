const socket = io();

document.getElementById('fightButton').addEventListener('click', () => {
    const pet = document.getElementById('pet').value;
    const type = document.getElementById('type').value;

    socket.emit('fight', { pet, type });
});

socket.on('fightResult', (data) => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Your ${data.pet} (${data.type}) fought a ${data.mob} and you ${data.result}!`;
});
