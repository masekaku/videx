// /js/auto-playlist.js
// Options: { usePlyr: boolean } - if true, initializes Plyr for better video controls
export async function initAutoPlaylist(playerSelector = "#video-player", options = { usePlyr: false }) {
  const playerEl = document.querySelector(playerSelector);
  if (!playerEl) {
    console.warn("Player element not found:", playerSelector);
    return;
  }

  // Optionally initialize Plyr if requested and if the library is available
  let plyrInstance = null;
  if (options.usePlyr) {
    // Dynamically load Plyr script if not already present
    if (typeof Plyr === "undefined") {
      await loadScript("https://cdn.plyr.io/3.7.8/plyr.polyfilled.js");
    }
    try {
      plyrInstance = new Plyr(playerEl, {
        controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
        ratio: "16:9",
      });
    } catch (e) {
      console.warn("Plyr initialization failed:", e);
      plyrInstance = null;
    }
  }

  try {
    const res = await fetch("/data/videos.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status + " while fetching videos.json");

    const videos = await res.json();
    if (!Array.isArray(videos) || videos.length === 0) {
      throw new Error("videos.json is empty or invalid format");
    }

    let idx = 0;

    const loadIndex = (i) => {
      idx = i % videos.length;
      const currentVideo = videos[idx];
      if (!currentVideo?.url) return console.warn("Invalid video object:", currentVideo);

      // Set source for player
      if (plyrInstance) {
        plyrInstance.source = {
          type: "video",
          sources: [{ src: currentVideo.url, type: "video/mp4" }],
        };
        // Attempt autoplay after user gesture
        plyrInstance.play().catch(() => {});
      } else {
        playerEl.src = currentVideo.url;
        playerEl.play().catch(() => {});
      }

      // Update video title (invisible)
      updateVideoTitle(currentVideo.title || `Video ${idx + 1}`);
    };

    loadIndex(idx);

    const handleVideoEnd = () => {
      idx = (idx + 1) % videos.length;
      loadIndex(idx);
    };

    if (plyrInstance) {
      plyrInstance.on("ended", handleVideoEnd);
    } else {
      playerEl.addEventListener("ended", handleVideoEnd);
    }
  } catch (err) {
    console.error("Auto playlist error:", err);
    const container = document.querySelector(".container") || document.body;
    const msg = document.createElement("div");
    msg.style.color = "var(--redish)";
    msg.style.marginTop = "18px";
    msg.style.fontWeight = "700";
    msg.textContent =
      "⚠️ Failed to load playlist. Please check /data/videos.json or contact support at https://videx.icu/help";
    container.appendChild(msg);
  }
}

// Helper function to dynamically load an external script
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

// Optional: Update video title dynamically (but keep it invisible)
function updateVideoTitle(title) {
  let titleEl = document.getElementById("video-title");
  if (!titleEl) {
    titleEl = document.createElement("div");
    titleEl.id = "video-title";
    titleEl.style.display = "none"; // ✅ Hidden visually and non-intrusive
    const container = document.querySelector(".container") || document.body;
    container.insertBefore(titleEl, container.firstChild);
  }
  titleEl.textContent = title;
}