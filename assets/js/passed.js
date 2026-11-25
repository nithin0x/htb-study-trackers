/* "I passed" card: dialog + canvas renderer for CWES. */
(function(){
  const CERTS = {
    cwes: { code: "CWES", name: "Certified Web Exploitation Specialist", acc: "#ed635e", txt: "#eef0f5", muted: "#a3a9b8", on: "#07080d" }
  };
  const SITE = "https://nithin0x.github.io/htb-study-trackers/", VER = "-v2";
  const ROOT = document.currentScript && document.currentScript.src ? new URL("../../", document.currentScript.src).href : SITE;
  const FONTS_CSS = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap";
  const W = 1200, H = 630, X = 64;

  let css;
  function fontsReady(){
    css = css || new Promise(ok => {
      const l = document.createElement("link"); l.rel = "stylesheet"; l.href = FONTS_CSS;
      l.onload = l.onerror = ok; document.head.appendChild(l);
    });
    return css.then(() => Promise.all(["500 112px 'IBM Plex Sans'", "500 20px 'IBM Plex Mono'", "400 19px 'IBM Plex Mono'", "400 25px 'IBM Plex Sans'"]
      .map(f => document.fonts.load(f).catch(() => {}))));
  }
  function fmtDate(iso){
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ""); if (!m) return "";
    return new Date(+m[1], m[2] - 1, +m[3]).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"});
  }
  function fit(ctx, text, font, size, min, max){
    for (; size > min; size--) { ctx.font = font.replace("@", size + "px"); if (ctx.measureText(text).width <= max) break; }
    ctx.font = font.replace("@", size + "px"); return size;
  }
  function spaced(ctx, px){ if ("letterSpacing" in ctx) ctx.letterSpacing = px + "px"; }

  function draw(cv, c, d, bg){
    const k = CERTS[c], ctx = cv.getContext("2d");
    cv.width = W; cv.height = H;
    ctx.drawImage(bg, 0, 0, W, H);
    const meta = [d.name && d.name.trim(), fmtDate(d.date), d.days > 0 && d.days + (d.days == 1 ? " day" : " days") + " of study"].filter(Boolean);
    const h = meta.length ? 268 : 234, T = Math.round((534 - h) / 2) - 32;
    ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";
    spaced(ctx, -2); ctx.font = "500 108px 'IBM Plex Sans'"; ctx.fillStyle = "#eef0f5";
    ctx.fillText("I passed", X, T + 112);
    ctx.fillStyle = k.acc;
    ctx.fillText(k.code, X, T + 215);
    const full = "HTB " + k.name;
    spaced(ctx, 0); ctx.fillStyle = k.txt; fit(ctx, full, "400 @ 'IBM Plex Sans'", 25, 18, 600);
    ctx.fillText(full, X, T + 264);
    if (meta.length) {
      ctx.fillStyle = k.muted; let line = meta.join(" · ");
      fit(ctx, line, "400 @ 'IBM Plex Mono'", 19, 14, 560);
      while (ctx.measureText(line).width > 560 && meta[0].length > 4) { meta[0] = meta[0].slice(0, -2) + "…"; line = meta.join(" · "); }
      ctx.fillText(line, X, T + 299);
    }
    ctx.font = "400 18px 'IBM Plex Mono'"; ctx.fillStyle = k.muted;
    ctx.fillText(SITE.replace(/^https?:\/\//, "") + c + "/", X, H - 50);
  }

  const CSS = `
.hp{margin:auto;width:min(620px,calc(100vw - 32px));max-height:calc(100vh - 48px);overflow:auto;background:#11141c;color:#eef0f5;border:1px solid rgba(238,240,245,.08);border-radius:16px;padding:0;font:400 14px/20px "IBM Plex Sans",system-ui,sans-serif}
.hp::backdrop{background:rgba(7,8,13,.75)}
.hp *{box-sizing:border-box}
.hp .hh{padding:20px 24px 16px;border-bottom:1px solid rgba(238,240,245,.08)}
.hp h3{margin:0;font:500 18px/24px "IBM Plex Sans",system-ui,sans-serif;color:#eef0f5}.hp h3:focus{outline:none}
.hp .hh p{margin:4px 0 0;font-size:13px;line-height:20px;color:#a3a9b8}
.hp .hb{display:grid;gap:12px;padding:16px 24px}
.hp canvas{display:block;width:100%;max-width:min(100%,92vh);margin:0 auto;height:auto;aspect-ratio:1200/630;border-radius:8px;border:1px solid rgba(238,240,245,.08);background:#07080d}
.hp .row{display:grid;grid-template-columns:1.4fr 1.1fr .8fr;gap:12px}
.hp label{display:grid;gap:4px;font:400 12px/16px "IBM Plex Mono",ui-monospace,monospace;color:#a3a9b8}
.hp input,.hp textarea{width:100%;background:#1a1e28;color:#eef0f5;border:1px solid rgba(238,240,245,.08);border-radius:8px;padding:8px 12px;font:400 14px/20px "IBM Plex Sans",system-ui,sans-serif;color-scheme:dark;transition:border-color 150ms cubic-bezier(.22,1,.36,1)}
.hp textarea{resize:vertical;min-height:76px}
.hp input:focus-visible,.hp textarea:focus-visible,.hp .b:focus-visible{outline:2px solid var(--hp-acc);outline-offset:2px}
.hp .b{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 16px;border-radius:8px;border:1px solid rgba(238,240,245,.08);background:#1a1e28;color:#eef0f5;font:500 13px/1 "IBM Plex Sans",system-ui,sans-serif;text-decoration:none;cursor:pointer;transition:background-color 150ms cubic-bezier(.22,1,.36,1),border-color 150ms cubic-bezier(.22,1,.36,1),transform 120ms cubic-bezier(.22,1,.36,1)}
.hp .b:hover{border-color:rgba(238,240,245,.18);background:#222734}
.hp .b:active{transform:scale(.98)}
.hp .b.p{background:#eef0f5;border-color:#eef0f5;color:#07080d;height:40px}.hp .b.p:hover{background:#fff;border-color:#fff}
.hp .plats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.hp .note{margin:0;font-size:12px;line-height:16px;color:#848c9f}.hp .note.ok{color:#4cc38a}
.hp .hf{display:flex;justify-content:flex-end;padding:12px 24px 16px;border-top:1px solid rgba(238,240,245,.08)}
@media(max-width:560px){.hp .row{grid-template-columns:1fr 1fr}.hp .row label:first-child{grid-column:1/-1}.hp .plats{grid-template-columns:1fr 1fr}}`;

  let dlg, cur, bgImg, prefill = "", dirty = false, link = "", busy = Promise.resolve();
  const $ = s => dlg.querySelector(s), enc = encodeURIComponent;
  function build(){
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    dlg = document.createElement("dialog"); dlg.className = "hp"; dlg.setAttribute("aria-labelledby", "hpTitle");
    dlg.innerHTML = `<form method="dialog">
  <div class="hh"><h3 id="hpTitle" tabindex="-1" autofocus>Share your CWES pass</h3><p>Add any details you want on the card. All fields are optional</p></div>
  <div class="hb">
    <canvas id="hpCv" width="1200" height="630" role="img" aria-label="Your I passed card"></canvas>
    <div class="row">
      <label for="hpName">Name or handle<input id="hpName" maxlength="28" autocomplete="nickname" placeholder="Optional"></label>
      <label for="hpDate">Pass date<input id="hpDate" type="date"></label>
      <label for="hpDays">Days of study<input id="hpDays" type="number" min="1" max="999" inputmode="numeric"></label>
    </div>
    <button type="button" class="b p" id="hpDl">Download image</button>
    <label for="hpTxt">Post text<textarea id="hpTxt" rows="3"></textarea></label>
    <div class="plats">
      <a class="b" id="hpX" target="_blank" rel="noopener">X</a>
      <a class="b" id="hpReddit" target="_blank" rel="noopener">Reddit</a>
      <a class="b" id="hpLinkedIn" target="_blank" rel="noopener">LinkedIn</a>
      <button type="button" class="b" id="hpCopy">Copy</button>
    </div>
    <p class="note" id="hpNote" role="status"></p>
  </div>
  <div class="hf"><button class="b" value="cancel">Close</button></div>
</form>`;
    document.body.appendChild(dlg);
    let down = false;
    dlg.addEventListener("pointerdown", e => { down = e.target === dlg; });
    dlg.addEventListener("click", e => { if (e.target === dlg && down) dlg.close(); });
    ["#hpName", "#hpDate", "#hpDays"].forEach(s => $(s).addEventListener("input", update));
    $("#hpTxt").addEventListener("input", () => { dirty = true; hrefs(); });
    $("#hpDl").onclick = download;
    $("#hpLinkedIn").onclick = () => copy(body(), "Text copied. Paste it into your LinkedIn post, then attach your image.") || note(FAIL);
    $("#hpCopy").onclick = () => copy(body() + "\n" + link, "Copied the text and link.") || note(FAIL);
  }
  const FAIL = "Couldn't copy. Select the text above and copy it.";
  const NOTE = "Shared links show the card without your details. To post with your name, download the image and attach it.";
  function note(msg, ok){ $("#hpNote").textContent = msg; $("#hpNote").classList.toggle("ok", !!ok); }
  function copy(text, ok){
    const ta = document.createElement("textarea"); ta.value = text; dlg.appendChild(ta); ta.select();
    let done = false; try{ done = document.execCommand("copy"); }catch(_){}
    ta.remove();
    if (done) note(ok, true);
    else if (navigator.clipboard) { navigator.clipboard.writeText(text).then(() => note(ok, true), () => note(FAIL)); return true; }
    return done;
  }
  const body = () => $("#hpTxt").value.trim();
  function details(){ return {name: $("#hpName").value, date: $("#hpDate").value, days: parseInt($("#hpDays").value, 10) || 0}; }
  function defText(){
    const k = CERTS[cur], d = details();
    return (d.days > 0 ? `I passed the HTB ${k.code}. ${d.days} ${d.days == 1 ? "day" : "days"} of study paid off.`
                       : `I passed the HTB ${k.code} (${k.name}).`) + ` #HackTheBox #${k.code}`;
  }
  function hrefs(){
    const t = body();
    $("#hpX").href = "https://x.com/intent/post?text=" + enc(t) + "&url=" + enc(link);
    $("#hpReddit").href = "https://www.reddit.com/submit?type=LINK&url=" + enc(link) + "&title=" + enc(t.replace(/\s*#\S+/g, "").slice(0, 300));
    $("#hpLinkedIn").href = "https://www.linkedin.com/sharing/share-offsite/?url=" + enc(link);
  }
  function update(){
    if (!dirty) $("#hpTxt").value = defText();
    hrefs();
    busy = busy.then(() => bgImg && draw($("#hpCv"), cur, details(), bgImg));
  }
  function download(){
    $("#hpCv").toBlob(b => {
      if (!b) return note("Couldn't make the image. Try again.");
      const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `htb-${cur}-passed.png`;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      note("Image saved. Attach it to your post.", true);
    }, "image/png");
  }
  function loadBg(c){
    return new Promise((ok, bad) => { const i = new Image(); i.onload = () => ok(i); i.onerror = bad;
      i.src = ROOT + "assets/share/passed/" + c + "-bg" + VER + ".jpg"; });
  }
  function open(c, opts){
    if (!CERTS[c]) return;
    if (!dlg) build();
    const k = CERTS[c];
    if (c !== cur) { cur = c; bgImg = null; dirty = false; $("#hpName").value = ""; $("#hpDays").value = prefill = "";
      const t = new Date(); $("#hpDate").value = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`; }
    if (opts && opts.days > 0 && $("#hpDays").value === prefill) $("#hpDays").value = prefill = String(opts.days);
    dlg.style.setProperty("--hp-acc", k.acc); dlg.style.setProperty("--hp-on", k.on);
    link = SITE + c + "/passed/";
    note(NOTE); update(); dlg.showModal();
    busy = busy.then(() => Promise.all([fontsReady(), bgImg || loadBg(c)]))
      .then(([, i]) => { bgImg = i; draw($("#hpCv"), cur, details(), bgImg); })
      .catch(() => note("Couldn't load the card. Check your connection and try again."));
  }
  window.HTBPassed = {open, draw, fontsReady};
})();
