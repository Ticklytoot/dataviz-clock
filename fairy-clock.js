// =========================
// FAIRY CLOCK ✧
// adds wings, twinkles, a sparkle trail, and bursts when you click.
// =========================

(function () {
  const card = document.querySelector(".clock-card");
  if (!card) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const colors = ["#f2b84b", "#e879c6", "#9670b5", "#6fa8e8", "#f7d774"];
  const shapes = ["✦", "✧", "✶", "⋆"];

  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];


  // ---- Wings ----

  function wingMarkup(side) {
    return `
      <svg viewBox="0 0 120 176" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="wing-${side}" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#f7c8ee" stop-opacity=".95"/>
            <stop offset=".55" stop-color="#dac9f6" stop-opacity=".85"/>
            <stop offset="1" stop-color="#b8dcf8" stop-opacity=".8"/>
          </linearGradient>
        </defs>
        <path d="M118 84 C100 20 40 0 8 22 C-6 40 30 74 118 88 Z"
              fill="url(#wing-${side})" stroke="#b58fd6" stroke-width="1.2"/>
        <path d="M118 90 C70 92 14 116 22 148 C30 170 96 150 118 96 Z"
              fill="url(#wing-${side})" stroke="#b58fd6" stroke-width="1.2"/>
        <path d="M116 85 C84 58 50 38 20 27 M112 86 C80 76 48 66 14 40 M116 92 C80 104 50 124 30 146"
              fill="none" stroke="#c9a9e6" stroke-width=".8" opacity=".75"/>
      </svg>`;
  }

  // Wrap the card so the wings can sit behind it
  const wrap = document.createElement("div");
  wrap.className = "fairy-wrap";
  card.parentNode.insertBefore(wrap, card);

  ["left", "right"].forEach(function (side) {
    const wing = document.createElement("div");
    wing.className = "fairy-wing fairy-wing-" + side;
    wing.setAttribute("aria-hidden", "true");
    wing.innerHTML = wingMarkup(side);
    wrap.appendChild(wing);
  });

  wrap.appendChild(card);


  // ---- Sparkle layer ----

  const field = document.createElement("div");
  field.className = "sparkle-field";
  field.setAttribute("aria-hidden", "true");
  card.appendChild(field);

  // Twinkling sparkles around the edges of the card and wings
  for (let i = 0; i < 18; i++) {
    let x, y;

    do {
      x = rand(-30, 130);
      y = rand(-14, 114);
    } while (x > 12 && x < 88 && y > 12 && y < 88);

    const s = document.createElement("span");
    s.className = "sparkle sparkle-ambient";
    s.textContent = pick(shapes);
    s.style.left = x + "%";
    s.style.top = y + "%";
    s.style.setProperty("--s", rand(9, 18).toFixed(1) + "px");
    s.style.setProperty("--c", pick(colors));
    s.style.setProperty("--d", rand(2.5, 5).toFixed(2) + "s");
    s.style.setProperty("--delay", rand(0, 4).toFixed(2) + "s");
    field.appendChild(s);
  }

  // One sparkle that drifts off in a direction, then disappears
  function fly(x, y, dx, dy, size, ms) {
    if (field.children.length > 120) return;

    const s = document.createElement("span");
    s.className = "sparkle sparkle-fly";
    s.textContent = pick(shapes);
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.setProperty("--dx", dx + "px");
    s.style.setProperty("--dy", dy + "px");
    s.style.setProperty("--s", size + "px");
    s.style.setProperty("--c", pick(colors));
    s.style.setProperty("--t", ms + "ms");
    s.addEventListener("animationend", function () { s.remove(); });
    field.appendChild(s);
  }

  function burst(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rand(-0.2, 0.2);
      const distance = rand(45, 90);
      fly(x, y, Math.cos(angle) * distance, Math.sin(angle) * distance, rand(10, 20), 1000);
    }
  }

  function localPoint(e) {
    const r = card.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }


  // ---- Interactions ----

  // Sparkle trail that follows the cursor or finger over the card
  let lastTrail = 0;

  card.addEventListener("pointermove", function (e) {
    if (reduceMotion) return;

    const now = performance.now();
    if (now - lastTrail < 60) return;
    lastTrail = now;

    const p = localPoint(e);
    fly(p.x + rand(-6, 6), p.y + rand(-6, 6), rand(-14, 14), rand(18, 40), rand(8, 15), 900);
  });

  // Burst of sparkles when the time, date, or star is clicked
  ["clock-time", "clock-date", "clock-star"].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("click", function (e) {
      if (reduceMotion) return;

      let p;

      if (e.clientX || e.clientY) {
        p = localPoint(e);
      } else {
        // Keyboard click: burst from the middle of the button
        const r = el.getBoundingClientRect();
        const c = card.getBoundingClientRect();
        p = { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 };
      }

      burst(p.x, p.y, 14);
    });
  });

  // A bit of fairy dust floats up from the time every second
  const timeEl = document.getElementById("clock-time");

  setInterval(function () {
    if (reduceMotion || document.hidden || !timeEl) return;

    const r = timeEl.getBoundingClientRect();
    const c = card.getBoundingClientRect();

    fly(
      r.left - c.left + rand(0, r.width),
      r.top - c.top + rand(0, r.height),
      rand(-10, 10),
      rand(-42, -20),
      rand(8, 13),
      1600
    );
  }, 1000);
})();
