document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.querySelector('.chat-input');
  if (!chatForm) return;

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = chatForm.querySelector('input[name="message"]');
    if (!input || !input.value.trim()) return;
    const message = document.createElement('div');
    message.className = 'message sent';
    message.innerHTML = `<p>${input.value.trim()}</p><span>Now</span>`;

    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.appendChild(message);
      input.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
});
