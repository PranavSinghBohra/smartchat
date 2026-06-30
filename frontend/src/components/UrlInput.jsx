import { useState } from "react";
import { scrapeUrl } from "../services/api";

function UrlInput({ onScraped }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    try {
      await scrapeUrl(url);
      onScraped(url);
    } catch (err) {
      setError("Failed to scrape this URL. Please check the link and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Enter website URL"
        className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer"
      >
        {loading ? "Scraping..." : "Scrape Website"}
      </button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

export default UrlInput;