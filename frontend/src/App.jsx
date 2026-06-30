import { useState } from "react";
import UrlInput from "./components/UrlInput";
import ChatBox from "./components/ChatBox";

function App() {
  const [scrapedUrl, setScrapedUrl] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-xl p-6 border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-center">SmartChat</h1>
        {!scrapedUrl ? (
          <UrlInput onScraped={(url) => setScrapedUrl(url)} />
        ) : (
          <ChatBox url={scrapedUrl} onReset={() => setScrapedUrl(null)} />
        )}
      </div>
    </div>
  );
}

export default App;