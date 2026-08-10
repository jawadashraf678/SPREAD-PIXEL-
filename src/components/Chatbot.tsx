'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'name' | 'email' | 'chat'>('name');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [inputValue, setInputValue] = useState('');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Salam! Welcome to SpreadPixels Marketing Agency. Need a high-converting website for your business?',
      timestamp: new Date(),
    },
    {
      id: '2',
      sender: 'bot',
      text: 'May I please know your Name to get started?',
      timestamp: new Date(),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle Step 1: Name Submission
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const name = inputValue.trim();
    setUserName(name);
    setInputValue('');

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: name,
        timestamp: new Date(),
      },
      {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Nice to meet you, ${name}! Please enter your Email Address so we can send you custom proposals & details.`,
        timestamp: new Date(),
      }
    ]);
    setStep('email');
  };

  // Handle Step 2: Email Submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const email = inputValue.trim();
    setUserEmail(email);
    setInputValue('');

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: email,
        timestamp: new Date(),
      },
      {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Thank you ${userName}! Your details have been saved. How can I assist you with your website project today? Ask me about our packages, timelines, or services!`,
        timestamp: new Date(),
      }
    ]);
    // Trigger LeadConnector Webhook
    try {
      fetch("https://services.leadconnectorhq.com/hooks/y9oH1m3G7bRgqjei9FD2/webhook-trigger/083bd9cf-7b0b-4aee-aef9-94f39c950aed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "AI Chatbot Widget" })
      });
    } catch (err) {
      console.error("Chatbot Webhook Error:", err);
    }
    setStep('chat');
  };

  // Handle Step 3: AI Gemini Chat Query
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setInputValue('');

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);

    // Typing placeholder
    const typingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: typingId,
        sender: 'bot',
        text: '...',
        timestamp: new Date(),
      }
    ]);

    try {
      const history = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          userName: userName,
          userEmail: userEmail,
          history: history
        })
      });

      const data = await res.json();
      
      setMessages((prev) => 
        prev.map(m => m.id === typingId ? { ...m, text: data.reply || `Thank you ${userName}! I received your query. Connect with us on WhatsApp at 0331 6049421.` } : m)
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) => 
        prev.map(m => m.id === typingId ? { ...m, text: `Thank you ${userName}! Connect with us directly on WhatsApp (0331 6049421) for an instant response.` } : m)
      );
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="floating-widget"
          style={{
            backgroundColor: 'var(--accent-orange)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(255, 98, 0, 0.4)',
            transition: 'transform 0.3s ease',
          }}
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            width: 'min(360px, calc(100vw - 32px))',
            height: 'min(520px, calc(100vh - 100px))',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-primary)',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                }}
              />
              <span style={{ fontWeight: 600, fontFamily: 'var(--font-headings)' }}>SpreadPixels AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                }}
              >
                {msg.sender === 'bot' && (
                  <div
                    style={{
                      background: 'var(--border-color)',
                      padding: '6px',
                      borderRadius: '50%',
                      color: 'var(--accent-orange)',
                    }}
                  >
                    <Bot size={16} />
                  </div>
                )}
                <div
                  style={{
                    backgroundColor: msg.sender === 'user' ? 'var(--accent-orange)' : 'var(--bg-primary)',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '0 12px 12px 12px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form Area based on Step */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
            }}
          >
            <form
              onSubmit={
                step === 'name'
                  ? handleNameSubmit
                  : step === 'email'
                  ? handleEmailSubmit
                  : handleSendMessage
              }
              style={{ display: 'flex', gap: '8px' }}
            >
              <input
                type={step === 'email' ? 'email' : 'text'}
                placeholder={
                  step === 'name'
                    ? 'Enter your name...'
                    : step === 'email'
                    ? 'Enter your email address...'
                    : 'Ask about packages, timing...'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--accent-orange)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Send size={18} />
              </button>
            </form>

            <a
              href="https://wa.me/923316049421?text=Salam,%20I%20want%20to%20inquire%20about%20your%20website%20packages."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '8px',
                marginTop: '8px',
                backgroundColor: '#25D366',
                color: 'white',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Connect Directly on WhatsApp (0331 6049421)
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
