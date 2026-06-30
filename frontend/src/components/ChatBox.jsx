import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { askQuestion } from "../services/api";

function ChatBox({ url, onReset }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const data = await askQuestion(question);
      const aiMessage = { role: "ai", text: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between items-center">
        <p className="text-xs text-zinc-500 truncate max-w-[70%]">{url}</p>
        <button
          onClick={onReset}
          className="text-sm text-zinc-400 hover:text-white border border-zinc-700 px-3 py-1 rounded-lg cursor-pointer"
        >
          Scrape New URL
        </button>
      </div>

      <div className="flex flex-col gap-3 max-h-96 overflow-y-auto px-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-blue-600 self-end rounded-br-sm"
                : "bg-zinc-800 self-start rounded-bl-sm prose prose-invert prose-sm"
            }`}
          >
            {msg.role === "ai" ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {loading && (
          <div className="bg-zinc-800 self-start px-4 py-2 rounded-2xl text-sm text-zinc-400">
            Thinking...
          </div>
        )}
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer"
        >
          Ask
        </button>
      </div>
    </div>
  );
}

export default ChatBox;