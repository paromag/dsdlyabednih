document.addEventListener("DOMContentLoaded", function() {
    const registerBtn = document.getElementById("register-btn");
    const usernameDisplay = document.getElementById("username-display");
    const serverList = document.querySelector(".server-list ul");
    const textChannelList = document.querySelector(".channel-list ul:nth-of-type(1)");
    const voiceChannelList = document.querySelector(".voice-channel-list");
    const voiceChannelSelect = document.getElementById("voice-channel-select");
    const joinVoiceBtn = document.getElementById("join-voice-btn");
    const leaveVoiceBtn = document.getElementById("leave-voice-btn");
    const volumeControl = document.getElementById("volume-control");
    const messageInput = document.getElementById("message-input");
    const sendBtn = document.getElementById("send-btn");
    const attachBtn = document.getElementById("attach-btn");
    const fileInput = document.getElementById("file-input");
    const chatMessages = document.getElementById("chat-messages");

    let localStream; // Локальный поток пользователя
    let peerConnection; // Объект WebRTC для установления соединения
    let isAudioMuted = false; // Флаг для отслеживания состояния звука (включен/выключен)

    // Остальной код здесь...

    // Обработчик события для кнопки "Join Voice"
    joinVoiceBtn.addEventListener("click", async () => {
        try {
            const selectedChannel = voiceChannelSelect.value;
            const constraints = { audio: true, video: false };
            localStream = await navigator.mediaDevices.getUserMedia(constraints);

            // Отключение кнопки "Join Voice" и включение кнопки "Leave Voice"
            joinVoiceBtn.disabled = true;
            leaveVoiceBtn.disabled = false;

            // Отображение состояния голосового соединения
            console.log(`Joined voice channel: ${selectedChannel}`);

            // TODO: Инициализация WebRTC соединения с выбранным каналом и передача аудио данных
        } catch (error) {
            console.error("Error joining voice channel:", error);
        }
    });

    // Обработчик события для кнопки "Leave Voice"
    leaveVoiceBtn.addEventListener("click", () => {
        // Остановка потока пользователя
        localStream.getTracks().forEach(track => track.stop());

        // Отключение кнопки "Leave Voice" и включение кнопки "Join Voice"
        leaveVoiceBtn.disabled = true;
        joinVoiceBtn.disabled = false;

        // Отображение состояния голосового соединения
        console.log("Left voice channel");

        // TODO: Закрытие WebRTC соединения
    });

    // Обработчик события для изменения громкости
    volumeControl.addEventListener("input", () => {
        const volume = volumeControl.value / 100;
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.volume = volume;
            });
        }
    });

    // Функция для обновления списка голосовых каналов
    function updateVoiceChannels(serverName) {
        voiceChannelSelect.innerHTML = "";
        const serverVoiceChannels = voiceChannels[serverName];
        serverVoiceChannels.forEach(channel => {
            const option = document.createElement("option");
            option.value = channel.id;
            option.textContent = channel.name;
            voiceChannelSelect.appendChild(option);
        });
    }

    // Обновляем список голосовых каналов при выборе сервера
    serverList.addEventListener("click", function(event) {
        const serverName = event.target.textContent;
        updateVoiceChannels(serverName);
    });

    // Остальной код здесь...
});

document.addEventListener("DOMContentLoaded", function() {
    const registerBtn = document.getElementById("register-btn");
    const usernameDisplay = document.getElementById("username-display");
    const serverList = document.querySelector(".server-list ul");
    const textChannelList = document.querySelector(".channel-list ul:nth-of-type(1)");
    const voiceChannelList = document.querySelector(".voice-channel-list");
    const messageInput = document.getElementById("message-input");
    const sendBtn = document.getElementById("send-btn");
    const attachBtn = document.getElementById("attach-btn");
    const fileInput = document.getElementById("file-input");
    const chatMessages = document.getElementById("chat-messages");

    // Данные о серверах и каналах (замените на ваши данные)
    const servers = [
        { id: 1, name: "Server 1" },
        { id: 2, name: "Server 2" },
        { id: 3, name: "Server 3" }
    ];

    const textChannels = {
        "Server 1": [
            { id: 1, name: "Channel 1-1" },
            { id: 2, name: "Channel 1-2" },
            { id: 3, name: "Channel 1-3" }
        ],
        "Server 2": [
            { id: 4, name: "Channel 2-1" },
            { id: 5, name: "Channel 2-2" },
            { id: 6, name: "Channel 2-3" }
        ],
        "Server 3": [
            { id: 7, name: "Channel 3-1" },
            { id: 8, name: "Channel 3-2" },
            { id: 9, name: "Channel 3-3" }
        ]
    };

    const voiceChannels = {
        "Server 1": [
            { id: 10, name: "Voice Channel 1-1" },
            { id: 11, name: "Voice Channel 1-2" },
            { id: 12, name: "Voice Channel 1-3" }
        ],
        "Server 2": [
            { id: 13, name: "Voice Channel 2-1" },
            { id: 14, name: "Voice Channel 2-2" },
            { id: 15, name: "Voice Channel 2-3" }
        ],
        "Server 3": [
            { id: 16, name: "Voice Channel 3-1" },
            { id: 17, name: "Voice Channel 3-2" },
            { id: 18, name: "Voice Channel 3-3" }
        ]
    };

    // Функция для заполнения списка голосовых каналов
    function fillVoiceChannels(serverName) {
        voiceChannelList.innerHTML = "";
        const serverVoiceChannels = voiceChannels[serverName];
        serverVoiceChannels.forEach(channel => {
            const channelItem = document.createElement("li");
            channelItem.textContent = channel.name;
            channelItem.dataset.id = channel.id;
            voiceChannelList.appendChild(channelItem);
        });
    }

    // Заполнение списка серверов
    servers.forEach(server => {
        const serverItem = document.createElement("li");
        serverItem.textContent = server.name;
        serverItem.dataset.id = server.id;
        serverList.appendChild(serverItem);

        // Обработчик события для выбора сервера
        serverItem.addEventListener("click", function() {
            // Очистить списки каналов
            textChannelList.innerHTML = "";
            fillVoiceChannels(serverItem.textContent); // Заполнить список голосовых каналов

            // Получить список каналов для выбранного сервера
            const serverName = serverItem.textContent;
            const serverTextChannels = textChannels[serverName];

            // Заполнить список текстовых каналов для выбранного сервера
            serverTextChannels.forEach(channel => {
                const channelItem = document.createElement("li");
                channelItem.textContent = channel.name;
                channelItem.dataset.id = channel.id;
                textChannelList.appendChild(channelItem);
            });
        });
    });

    registerBtn.addEventListener("click", function() {
        const username = prompt("Enter your username:");
        if (username) {
            // Отобразить имя пользователя и скрыть кнопку регистрации
            usernameDisplay.textContent = username;
            usernameDisplay.style.display = "inline";
            registerBtn.style.display = "none";
        }
    });

    messageInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Предотвращаем перевод строки
            sendMessage();
        }
    });

    attachBtn.addEventListener("click", function() {
        fileInput.click(); // Кликаем на скрытый инпут файла
    });

    fileInput.addEventListener("change", function() {
        const file = fileInput.files[0];
        if (file) {
            // Обработка прикрепленного файла
            console.log("Attached file:", file.name);
        }
    });

    sendBtn.addEventListener("click", function() {
        sendMessage();
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        const file = fileInput.files[0];

        if (message !== "" || file) {
            const formData = new FormData();
            formData.append("message", message);
            if (file) {
                formData.append("file", file);
            }

            // Отправляем данные формы на сервер или добавляем их в чат (здесь это просто выводится в чат)
            addMessageToChat(usernameDisplay.textContent, message, file);

            // Очищаем поля ввода
            messageInput.value = "";
            fileInput.value = "";
        }
    }

    function addMessageToChat(sender, message, file) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message");

        const senderElement = document.createElement("span");
        senderElement.textContent = sender + ": ";
        senderElement.style.color = "#2ea44f"; // Зеленый цвет для имени отправителя
        messageContainer.appendChild(senderElement);

        if (file && file.type.startsWith('image/')) {
            // Если файл является изображением, добавляем его в сообщение
            const fileImage = document.createElement('img');
            fileImage.src = URL.createObjectURL(file);
            fileImage.style.maxWidth = '200px'; // Устанавливаем максимальную ширину для изображения
            messageContainer.appendChild(fileImage);

            if (message) {
                messageContainer.appendChild(document.createElement('br')); // Добавляем перенос строки
            }
        }

        if (message) {
            // Добавляем текстовое сообщение
            const messageText = document.createElement("span");
            messageText.textContent = message;
            messageContainer.appendChild(messageText);
        }

        if (file && !file.type.startsWith('image/')) {
            // Если файл не является изображением, добавляем его название
            const fileElement = document.createElement("span");
            fileElement.textContent = " (" + file.name + ")";
            messageContainer.appendChild(fileElement);
        }

        chatMessages.appendChild(messageContainer);
    }
});
// Инициализация PeerJS
const peer = new Peer();

// Обработчик события открытия соединения PeerJS
peer.on('open', (userId) => {
    console.log('PeerJS connection opened. User ID:', userId);
});

// Обработчик события приема звонка
peer.on('call', (call) => {
    // Ответ на звонок, отправка локального потока
    call.answer(localStream);
  
    // Обработчик события приема удаленного потока
    call.on('stream', (remoteStream) => {
        // Показать удаленный поток в аудио элементе
        const audio = document.createElement('audio');
        audio.srcObject = remoteStream;
        audio.play();
        // Добавьте аудио элемент в DOM, если нужно
    });
});

// Обработчик события для кнопки "Join Voice"
joinVoiceBtn.addEventListener("click", async () => {
    try {
        const selectedChannel = voiceChannelSelect.value;
        const constraints = { audio: true, video: false };
        localStream = await navigator.mediaDevices.getUserMedia(constraints);

        // Отключение кнопки "Join Voice" и включение кнопки "Leave Voice"
        joinVoiceBtn.disabled = true;
        leaveVoiceBtn.disabled = false;

        // Присоединение к комнате с помощью PeerJS
        const room = peer.joinRoom(selectedChannel, {
            stream: localStream,
        });

        // Обработчик события приема удаленного потока в комнате
        room.on('stream', (remoteStream) => {
            // Показать удаленный поток в аудио элементе
            const audio = document.createElement('audio');
            audio.srcObject = remoteStream;
            audio.play();
            // Добавьте аудио элемент в DOM, если нужно
        });

        // Отображение состояния голосового соединения
        console.log(`Joined voice channel: ${selectedChannel}`);
    } catch (error) {
        console.error("Error joining voice channel:", error);
    }
});
// Обработчик события для кнопки "Leave Voice"
leaveVoiceBtn.addEventListener("click", () => {
    // Закрытие локального потока
    localStream.getTracks().forEach(track => track.stop());

    // Отключение кнопки "Leave Voice" и включение кнопки "Join Voice"
    leaveVoiceBtn.disabled = true;
    joinVoiceBtn.disabled = false;

    // Отключение соединения PeerJS
    peer.disconnect();

    // Отображение состояния голосового соединения
    console.log("Left voice channel");
});
document.addEventListener("DOMContentLoaded", function() {
    // Остальной код здесь...

    const recordAudioBtn = document.getElementById("record-audio-btn");
    let mediaRecorder;
    let audioChunks = [];

    // Обработчик события для кнопки "Record Audio"
    recordAudioBtn.addEventListener("click", async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            // Обработчик события при получении нового аудио чанка
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            // Обработчик события для остановки записи
            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                sendAudioMessage(audioBlob); // Отправка аудио сообщения
                audioChunks = [];
            });

            // Начать запись аудио
            mediaRecorder.start();
            console.log("Recording audio...");
        } catch (error) {
            console.error("Error recording audio:", error);
        }
    });

    // Функция для отправки аудио сообщения в голосовой канал
    function sendAudioMessage(audioBlob) {
        const selectedChannel = voiceChannelSelect.value;
        const room = peer.joinRoom(selectedChannel);
        room.send(audioBlob); // Отправка аудио сообщения в комнату
    }
});
