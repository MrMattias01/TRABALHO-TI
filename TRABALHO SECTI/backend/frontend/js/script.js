// script.js

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.querySelector('.login');
    const chatSection = document.querySelector('.chat');
    const loginForm = document.querySelector('.login__form');
    const chatForm = document.querySelector('.chat__form');
    const chatMessages = document.querySelector('.chat__messages');
    const chatInput = document.querySelector('.chat__input');

    let thankYouMessageDisplayed = false; // Flag para verificar se a mensagem já foi exibida

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        loginSection.style.display = 'none';
        chatSection.style.display = 'flex';
    });

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageText = chatInput.value.trim();

        if (messageText) {
            // Adiciona a mensagem do usuário ao chat
            const userMessage = document.createElement('div');
            userMessage.className = 'message';
            userMessage.innerHTML = `
                <div class="message__user">Você</div>
                <div class="message__bubble message__bubble--user">
                    <div class="message__text">${messageText}</div>
                </div>
            `;
            chatMessages.appendChild(userMessage);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Adiciona a resposta automática do suporte somente se a mensagem ainda não foi exibida
            if (!thankYouMessageDisplayed) {
                setTimeout(() => {
                    const supportMessage = document.createElement('div');
                    supportMessage.className = 'message';
                    supportMessage.innerHTML = `
                        <div class="message__user">Suporte</div>
                        <div class="message__bubble message__bubble--support">
                            <div class="message__text">Obrigado pela mensagem! Em breve você receberá uma resposta.</div>
                        </div>
                    `;
                    chatMessages.appendChild(supportMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    thankYouMessageDisplayed = true; // Atualiza a flag para evitar mais mensagens
                }, 500); // Ajuste o tempo do delay conforme necessário
            }
        }
    });
});
