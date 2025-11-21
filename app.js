// Default values
const defaultImage = "https://picsum.photos/800/400";
const defaultQuote = "The only way to do great work is to love what you do.";

const statusEl = document.getElementById("status");
const posterImage = document.getElementById("posterImage");
const posterQuote = document.getElementById("posterQuote");

document.getElementById("generateBtn").addEventListener("click", () => {
  // TODO:
  // 1. Update status to "Loading poster..."
  // 2. Fetch image from https://picsum.photos/800/400
  // 3. Fetch quote from https://dummyjson.com/quotes/random
  // 4. Update DOM with image + quote
  // 5. Handle failures with defaults
  statusEl.textContent = "Loading poster...";

  Promise.all([
    fetch("https://picsum.photos/800/400")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Image fetch failed");
        }
        return res.url;
      })
      .catch(() => defaultImage),
    fetch("https://dummyjson.com/quotes/random")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Quote fetch failed");
        }
        return res.json();
      })
      .then((data) => data.quote)
      .catch(() => defaultQuote),
  ]).then(([imageUrl, quote]) => {
    posterImage.src = imageUrl;
    posterQuote.textContent = quote;
    statusEl.textContent = "Poster generated!";
  });
});
