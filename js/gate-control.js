// /js/gate-control.js
export function initGate(root, onAccepted) {
  // 🚫 Do not use localStorage — gate will always appear on every visit
  const accepted = false;

  // Render gate + advertisement
  root.innerHTML = `
    <div id="gate-screen" class="app-centered">
      <div class="gate-inner card retro-outline" style="max-width:760px; padding:32px; animation: fadeIn 0.4s ease;">
        <div style="text-align:center;">
          <h2 style="font-size:28px; margin:0 0 10px 0; font-weight:800;">Continue to Video?</h2>
          <p style="color:var(--grayish); margin:0 0 20px 0;">Your video is ready. Click below to start watching.</p>
          
          <!-- Button -->
          <button id="start-watch" style="background:var(--yellowish); border:3px solid var(--dark); padding:12px 18px; border-radius:12px; font-weight:700; box-shadow:4px 6px 0 var(--dark); cursor:pointer;">
            ▶ Start Watching
          </button>

          <!-- Advertisement -->
          <div id="gate-ad" style="margin-top:30px; padding:20px; border:3px dashed var(--grayish); border-radius:16px; color:var(--grayish); font-size:16px; position:relative;">
            <span id="ad-loading" style="font-size:14px; opacity:0.8;">Loading advertisement...</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Load advertisement script (can be replaced with an external source)
  loadGateAd();

  // Button click handler
  const btn = document.getElementById("start-watch");
  btn.addEventListener("click", () => {
    // Save acceptance state
    localStorage.setItem("videx_gate_ok", "1");

    const gateScreen = document.getElementById("gate-screen");
    if (gateScreen) {
      gateScreen.style.transition = "opacity .35s ease, transform .35s ease";
      gateScreen.style.opacity = "0";
      gateScreen.style.transform = "translateY(8px) scale(.98)";
      setTimeout(() => {
        onAccepted();
      }, 320);
    } else {
      onAccepted();
    }
  });
}

// Function to load advertisement
function loadGateAd() {
  const adContainer = document.getElementById("gate-ad");
  if (!adContainer) return;

  // Replace ad loading text once ad is ready
  setTimeout(() => {
    const loadingText = document.getElementById("ad-loading");
    if (loadingText) loadingText.remove();
  }, 600);

  // Example advertisement content — you can replace with an external script
  adContainer.innerHTML = `
    <div class="mt-6 p-6 border-4 border-dashed border-[color:var(--grayish)] rounded-xl text-[color:var(--grayish)] text-lg text-center">
      <!-- Advertisement Script -->
      <div id="frame" style="width:300px; margin:auto; z-index:99998; height:auto;">
        <iframe 
          data-aa='24142590' 
          src='//ad.a-ads.com/24145290/?size=300x250&background_color=transparent&title_color=292C30&title_hover_color=979AA0&text_color=DE4C4C&link_color=1C1E22&link_hover_color=2E3238'
          style='border:0; padding:0; width:300px; height:250px; overflow:hidden; display:block; margin:auto;'>
        </iframe>
        <div style="width:300px; margin:auto; position:absolute; left:0; right:0;">
          <a target="_blank" 
             style="display:inline-block; font-size:13px; color:#263238; padding:4px 10px; background:#F8F8F9; text-decoration:none; border-radius:0 0 4px 4px;" 
             id="frame-link" 
             href="https://videx.icu/advertise">
             Advertise here
          </a>
        </div>
      </div>
    </div>
  `;
}

// ✨ Additional CSS Animation (appended dynamically)
const style = document.createElement("style");
style.textContent = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);