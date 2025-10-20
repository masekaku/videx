// /videx/ahmad.js
export function injectHeadAd() {
  // Prevent duplication
  if (document.getElementById("videx-head-ad-script")) return;

  const adScript = document.createElement("script");
  adScript.id = "videx-head-ad-script";
  adScript.type = "text/javascript";
  adScript.src = "//workplacecakefaculty.com.js";
  adScript.async = true;

  // Insert before </head> safely
  const head = document.head || document.getElementsByTagName("head")[0];
  if (head.lastChild) {
    head.insertBefore(adScript, head.lastChild);
  } else {
    head.appendChild(adScript);
  }

  // Add basic load/error tracking for debugging
  adScript.onload = () => console.info("✅ [Videx] Head advertisement script loaded successfully.");
  adScript.onerror = () => console.warn("⚠️ [Videx] Failed to load head advertisement script.");

  // Optional fallback message if ad network fails to load after 5 seconds
  setTimeout(() => {
    if (!adScript.dataset.loaded) {
      console.log("ℹ️ [Videx] The ad script might be blocked or taking too long to load.");
    }
  }, 5000);
}
