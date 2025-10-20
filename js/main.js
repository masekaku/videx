// /js/main.js
import { initGate } from "./gate-control.js";
import { renderMain } from "./dynamic-player.js";
import { initAutoPlaylist } from "./auto-playlist.js";
import { initVidexUI } from "../videx/lol.js";
import { injectHeadAd } from "../videx/ahmad.js";

injectHeadAd(); // run immediately before initializing gate or rendering anything

const root = document.getElementById("app-root");

// Check if we are on the index.html or home page
const path = window.location.pathname;
const isIndexPage = path === "/" || path.endsWith("/index.html");

async function initializeMainContent() {
  renderMain(root);

  // Wait until the DOM is ready (so the video player can appear)
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Start automatic playlist
  initAutoPlaylist("#video-player", { usePlyr: true });

  // Initialize extra UI features
  initVidexUI();

  // 💡 Display advertisement after gate is completed
  injectVideoAd();
}

if (isIndexPage) {
  // ✅ Home page (index.html) — display gate first
  initGate(root, initializeMainContent);
} else {
  // ❌ Other pages — render directly
  initializeMainContent();
}

// ⚙️ Optional: Preload optimization for better UX
window.addEventListener("load", () => {
  const preloadVideo = document.querySelector("#video-player source");
  if (preloadVideo && preloadVideo.getAttribute("src")) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = preloadVideo.getAttribute("src");
    document.head.appendChild(link);
  }
});
