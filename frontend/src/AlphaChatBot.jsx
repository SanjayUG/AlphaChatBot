import React, { useState } from 'react';
import axios from 'axios';
import "./AlphaChatBot.css";

const AlphaChatBot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/messages', { message });
      setMessages([...messages, { sender: 'user', text: message }, { sender: 'bot', text: res.data.botMessage }]);
      setMessage('');
    } catch (err) {
      setError('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <h1>Alpha ChatBot</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}: </strong>{msg.text}
          </p>
        ))}
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="input-container">
        <label>Enter an Alphabet [a - z]: </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          maxLength="1"
        />
      </div>
      <button onClick={sendMessage} disabled={loading} className="send-button">Send</button>
      <button onClick={clearChat} className="clear-button">Clear Chat</button>
    </div>
  );
};

export default AlphaChatBot;
