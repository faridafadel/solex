import { useState } from "react";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi, I am Solex assistant. Need help with your order?" },
  ]);

  const getBotReply = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("order") || lower.includes("track")) {
      return "You can track your order from your Account page under Past Orders.";
    }
    if (lower.includes("return") || lower.includes("refund")) {
      return "Returns are available within 30 days for unworn products in original packaging.";
    }
    if (lower.includes("shipping") || lower.includes("delivery")) {
      return "Standard shipping is 2-5 business days. Express options appear at checkout.";
    }
    if (lower.includes("size") || lower.includes("fit")) {
      return "Check each product page for available sizes. I can help you compare options.";
    }
    if (lower.includes("payment") || lower.includes("cash")) {
      return "We currently support cash on delivery and secure card checkout on eligible orders.";
    }
    return "Thanks for your message. Tell me if you need help with orders, delivery, returns, sizing, or payment.";
  };

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setMessage("");

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text: getBotReply(trimmed),
        },
      ]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="bg-coral-blue px-4 py-3 text-white">
            <p className="font-montserrat text-sm font-semibold">Solex Chat Support</p>
          </div>
          <div className="h-64 space-y-3 overflow-y-auto p-4">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm font-montserrat ${
                  item.role === "user"
                    ? "ml-auto bg-coral-blue text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {item.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-slate-200 p-3">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-coral-blue"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="rounded-full bg-coral-blue px-4 text-sm font-montserrat text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="rounded-full bg-coral-blue px-5 py-3 font-montserrat text-sm font-semibold text-white shadow-lg"
      >
        {isOpen ? "Close Chat" : "Chat with us"}
      </button>
    </div>
  );
};

export default ChatbotWidget;
