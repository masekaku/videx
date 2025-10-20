// /videx/lol.js
export function initVidexUI(root = document.body) {
  // Prevent double initialization
  if (document.querySelector(".sponsor-btn")) return;

  const sponsorHTML = `
    <div class="mt-6 flex flex-wrap gap-3 justify-center">
      <button onclick="window.open('https://workplacecakefaculty.com/wnxneai5xf?key=f234c1281833908a12385bbbc9881cf7', '_blank')" 
        class="sponsor-btn bg-yellow-200 border-4 border-[color:var(--ink2)] rounded-xl px-4 py-2 font-bold transition hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[4px_4px_0_var(--ink2)]">
        JAPAN
      </button>
      <button onclick="window.open('https://workplacecakefaculty.com/uczmxmzewu?key=ffd852fa421f91c5b97b8e043e98844f', '_blank')" 
        class="sponsor-btn bg-yellow-200 border-4 border-[color:var(--ink2)] rounded-xl px-4 py-2 font-bold transition hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[4px_4px_0_var(--ink2)]">
        INDONESIA
      </button>
      <button onclick="window.open('https://workplacecakefaculty.com/ibhnbx77?key=245d5f18a70ac6f3ccf7041441886168', '_blank')" 
        class="sponsor-btn bg-yellow-200 border-4 border-[color:var(--ink2)] rounded-xl px-4 py-2 font-bold transition hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[4px_4px_0_var(--ink2)]">
        STUDENT
      </button>
    </div>

    <div class="mt-6 p-6 border-4 border-dashed border-[color:var(--grayish)] rounded-xl text-[color:var(--grayish)] text-lg text-center relative">
      <!-- Advertisement Script -->
      <div id="frame" style="width: 300px; margin: auto; z-index: 99998; height: auto;">
        <iframe 
          data-aa="24145290" 
          src="//ad.a-ads.com/24145290/?size=300x250&background_color=transparent&title_color=292C30&title_hover_color=979AA0&text_color=DE4C4C&link_color=1C1E22&link_hover_color=2E3238"
          style="border:0; padding:0; width:300px; height:250px; overflow:hidden; display:block; margin:auto;">
        </iframe>
        <div style="width: 300px; margin:auto; position: absolute; left: 0; right: 0;">
          <a target="_blank" 
            style="display:inline-block; font-size:13px; color:#263238; padding:4px 10px; background:#F8F8F9; text-decoration:none; border-radius:0 0 4px 4px;" 
            id="frame-link" 
            href="https://videx.icu/advertise">
            Advertise here
          </a>
        </div>
      </div>
    </div>

    <footer class="mt-6 py-4 text-xs text-[color:var(--grayish)] text-center">
      © 2025 <span class="font-semibold">Videx</span> —
      <a href="https://videx.icu/protocol" class="hover:underline hover:text-[color:var(--ink2)] transition">Protocol</a> |
      <a href="https://videx.icu/terms" class="hover:underline hover:text-[color:var(--ink2)] transition">Terms</a> |
      <a href="https://videx.icu/contact" class="hover:underline hover:text-[color:var(--ink2)] transition">Contact</a>
    </footer>
  `;

  const target = root.querySelector(".app-centered") || root;
  target.insertAdjacentHTML("beforeend", sponsorHTML);

  // ⚙️ Optional improvement: lazy check if ad iframe failed to load
  const iframe = document.querySelector("#frame iframe");
  if (iframe) {
    const timeout = setTimeout(() => {
      if (!iframe.contentWindow || iframe.contentWindow.length === 0) {
        console.warn("⚠️ Ad may have failed to load properly.");
      }
    }, 4000);
    iframe.addEventListener("load", () => clearTimeout(timeout));
  }
}
