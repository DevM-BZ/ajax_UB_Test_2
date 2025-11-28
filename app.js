// Default values
const defaultImage = "834-800x400.jpg";
const defaultQuote = "The only way to do great work is to love what you do.";

const statusEl = document.getElementById("status");
const posterImage = document.getElementById("posterImage");
const posterQuote = document.getElementById("posterQuote");
const defaultStatus = "Ready to generate image and quote.";
let statusResetTimeout;

statusEl.textContent = defaultStatus;

document.getElementById("generateBtn").addEventListener("click", () => {
  // TODO:
  // 1. Update status to "Loading poster..."
  // 2. Fetch image from https://picsum.photos/800/400
  // 3. Fetch quote from https://dummyjson.com/quotes/random
  // 4. Update DOM with image + quote
  // 5. Handle failures with defaults
  clearTimeout(statusResetTimeout);
  statusEl.textContent = "Loading poster...";
  statusEl.classList.remove("success");
  statusEl.classList.add("loading");

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
    statusEl.classList.remove("loading");
    statusEl.classList.add("success");
    statusResetTimeout = setTimeout(() => {
      statusEl.textContent = defaultStatus;
      statusEl.classList.remove("success", "loading");
    }, 3000);
  });
});
