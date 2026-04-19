/* =====================================================================
   RESULTS PAGE — Hi-tech Crisis Intelligence UI
   Works alongside App.css (doesn't duplicate base vars)
   ===================================================================== */

/* ---------- WRAPPER ---------- */
.results-wrapper {
  min-height: 100vh;
  padding: 32px 64px 80px;
  background:
    radial-gradient(circle at 20% 0%, rgba(168, 85, 247, 0.15), transparent 45%),
    radial-gradient(circle at 80% 10%, rgba(56, 189, 248, 0.12), transparent 40%),
    radial-gradient(circle at top, #0f172a, #020617);
  color: #e2e8f0;
  font-family: "Poppins", "Segoe UI", sans-serif;
  animation: page-in 0.6s ease-out;
}

@keyframes page-in {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ---------- TOP BAR ---------- */
.results-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.back-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5f5;
  padding: 10px 20px;
  border-radius: 40px;
  font-size: 14px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: 0.25s;
}
.back-btn:hover {
  border-color: #a855f7;
  color: white;
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.5);
  transform: translateX(-3px);
}

.brand-chip {
  padding: 8px 18px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 1.5px;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  box-shadow: 0 0 18px rgba(236, 72, 153, 0.45);
}

/* ---------- HERO ---------- */
.results-hero {
  margin-bottom: 40px;
  padding: 36px 40px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  position: relative;
  overflow: hidden;
}
.results-hero::before {
  content: "";
  position: absolute;
  top: -50%; left: -20%;
  width: 60%; height: 200%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.18), transparent 70%);
  pointer-events: none;
}

.query-label {
  font-size: 12px;
  letter-spacing: 3px;
  color: #64748b;
  text-transform: uppercase;
  margin: 0 0 10px;
}

.query-text {
  font-size: 34px;
  font-weight: 700;
  margin: 0 0 22px;
  background: linear-gradient(90deg, #ffffff 0%, #a855f7 60%, #ec4899 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.25;
}

.meta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.intent-chip {
  padding: 8px 18px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.04);
  border: 1.5px solid;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: 0.25s;
}

.disaster-chip {
  padding: 8px 18px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13px;
  color: #e2e8f0;
}

/* ---------- TOPBAR RIGHT CLUSTER ---------- */
.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ---------- LIVE / DEMO MODE PILL ---------- */
.mode-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: 0.25s;
  cursor: help;
  user-select: none;
}

.mode-pill .mode-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #64748b;
  box-shadow: 0 0 8px currentColor;
}

.mode-pill.live {
  color: #6ee7b7;
  border-color: rgba(16, 185, 129, 0.35);
  background: rgba(16, 185, 129, 0.08);
}
.mode-pill.live .mode-dot {
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
  animation: modePulse 2.2s ease-in-out infinite;
}

.mode-pill.demo {
  color: #c4b5fd;
  border-color: rgba(168, 85, 247, 0.35);
  background: rgba(168, 85, 247, 0.08);
}
.mode-pill.demo .mode-dot {
  background: #a855f7;
  box-shadow: 0 0 8px #a855f7;
}

@keyframes modePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.55; transform: scale(1.2); }
}

/* ---------- CLICKABLE CHIPS + DROPDOWNS ---------- */
.chip-wrap {
  position: relative;
  display: inline-block;
}

.chip-button {
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  outline: none;
}
.chip-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.15);
}
.chip-button:active { transform: translateY(0); }

.chevron {
  font-size: 10px;
  transition: transform 0.25s;
  opacity: 0.8;
}
.chip-wrap .chip-button[class*="intent-chip"]:hover .chevron,
.chip-wrap .chip-button:focus .chevron { transform: translateY(2px); }

/* The dropdown menu */
.dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  min-width: 260px;
  padding: 10px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(20px);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(168, 85, 247, 0.25);
  z-index: 50;
  animation: dropdown-in 0.22s cubic-bezier(.2,.8,.2,1);
}

@keyframes dropdown-in {
  from { opacity: 0; transform: translateY(-10px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.dropdown-title {
  font-size: 10px;
  letter-spacing: 2.5px;
  color: #64748b;
  text-transform: uppercase;
  padding: 8px 12px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 6px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 14px;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: #e2e8f0;
  font-size: 14px;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: 0.15s;
}
.dropdown-item:hover {
  background: rgba(168, 85, 247, 0.15);
  color: white;
  transform: translateX(3px);
}
.dropdown-item.active {
  background: rgba(168, 85, 247, 0.2);
  color: #e9d5ff;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 8px currentColor;
}

/* ---------- SUMMARY / SEVERITY ---------- */
.summary-section {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  margin-bottom: 40px;
}

.severity-card {
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
  transition: 0.3s;
}
.severity-card:hover { transform: translateY(-4px); }

.severity-label {
  font-size: 12px;
  letter-spacing: 3px;
  color: #94a3b8;
  text-transform: uppercase;
}

.severity-value {
  font-size: 44px;
  font-weight: 800;
  margin: 8px 0 20px;
  letter-spacing: 2px;
}

.severity-bar {
  height: 10px;
  width: 100%;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.severity-fill {
  height: 100%;
  border-radius: 40px;
  animation: fill-in 1.1s cubic-bezier(.2,.8,.2,1);
}
@keyframes fill-in {
  from { width: 0; }
}

/* Severity variants */
.severity-critical .severity-value { color: #ef4444; text-shadow: 0 0 18px rgba(239, 68, 68, 0.55); }
.severity-critical .severity-fill-critical { width: 100%; background: linear-gradient(90deg, #ef4444, #f97316); }
.severity-critical { border-color: rgba(239, 68, 68, 0.4); box-shadow: 0 0 40px rgba(239, 68, 68, 0.15); }

.severity-high .severity-value { color: #f97316; text-shadow: 0 0 18px rgba(249, 115, 22, 0.55); }
.severity-high .severity-fill-high { width: 78%; background: linear-gradient(90deg, #f97316, #f59e0b); }
.severity-high { border-color: rgba(249, 115, 22, 0.35); }

.severity-medium .severity-value { color: #eab308; text-shadow: 0 0 18px rgba(234, 179, 8, 0.5); }
.severity-medium .severity-fill-medium { width: 55%; background: linear-gradient(90deg, #eab308, #facc15); }
.severity-medium { border-color: rgba(234, 179, 8, 0.35); }

.severity-low .severity-value { color: #22c55e; text-shadow: 0 0 18px rgba(34, 197, 94, 0.45); }
.severity-low .severity-fill-low { width: 28%; background: linear-gradient(90deg, #22c55e, #10b981); }
.severity-low { border-color: rgba(34, 197, 94, 0.35); }

/* AI summary */
.ai-summary-card {
  padding: 28px 32px;
  border-radius: 20px;
  background:
    linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(236, 72, 153, 0.05));
  border: 1px solid rgba(168, 85, 247, 0.25);
  backdrop-filter: blur(12px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.card-header h3 {
  margin: 0;
  font-size: 18px;
  color: #e2e8f0;
}
.sparkle {
  color: #a855f7;
  font-size: 20px;
  animation: twinkle 2.4s ease-in-out infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.5; transform: scale(1.25); }
}

.summary-text {
  font-size: 16px;
  line-height: 1.7;
  color: #cbd5f5;
  margin: 0;
}

/* ---------- STATS STRIP ---------- */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 44px;
}

.stat-block {
  padding: 22px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid var(--accent, #a855f7);
  backdrop-filter: blur(10px);
  transition: 0.25s;
}
.stat-block:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 0 18px var(--accent);
  border-left-width: 5px;
}
.stat-label {
  font-size: 11px;
  letter-spacing: 2.5px;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: white;
}

/* ---------- MEDIA GRID (posts / images / video) ---------- */
.media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.panel {
  padding: 26px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  transition: 0.3s;
}
.panel:hover {
  border-color: rgba(168, 85, 247, 0.35);
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.15);
}
.full-span { grid-column: span 2; }

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.panel-header h3 {
  margin: 0;
  font-size: 18px;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.panel-icon { font-size: 20px; }
.panel-count {
  padding: 4px 12px;
  border-radius: 40px;
  background: rgba(168, 85, 247, 0.15);
  color: #c4b5fd;
  font-size: 12px;
  font-weight: 600;
}

/* ---------- POSTS ---------- */
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.post-card {
  display: flex;
  gap: 14px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: 0.25s;
}
.post-card:hover {
  background: rgba(168, 85, 247, 0.08);
  border-color: rgba(168, 85, 247, 0.3);
  transform: translateX(4px);
}
.post-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}
.post-body { flex: 1; min-width: 0; }
.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.post-author { color: #c4b5fd; font-weight: 600; }
.post-text { margin: 0; color: #e2e8f0; line-height: 1.55; font-size: 14px; }

/* ---------- IMAGES ---------- */
.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.image-tile {
  margin: 0;
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4 / 3;
  background: rgba(255,255,255,0.04);
}
.image-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.image-tile:hover img { transform: scale(1.08); }
.image-tile figcaption {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 10px 14px;
  font-size: 12px;
  color: white;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  opacity: 0;
  transition: 0.25s;
}
.image-tile:hover figcaption { opacity: 1; }

/* ---------- VIDEO CARD (clickable thumbnail) ---------- */
.video-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 14px;
  overflow: hidden;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.08);
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.video-card:hover {
  transform: translateY(-3px);
  border-color: rgba(236, 72, 153, 0.45);
  box-shadow: 0 18px 40px -18px rgba(236, 72, 153, 0.55), 0 0 0 1px rgba(168, 85, 247, 0.25);
}

.video-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0f172a;
}
.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s, filter 0.3s;
  filter: brightness(0.85);
}
.video-card:hover .video-thumb img {
  transform: scale(1.04);
  filter: brightness(1);
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%);
  pointer-events: none;
}

.play-button {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.95);
  color: white;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6px;
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.55), 0 0 0 8px rgba(255,255,255,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}
.video-card:hover .play-button {
  transform: scale(1.12);
  box-shadow: 0 14px 36px rgba(220, 38, 38, 0.75), 0 0 0 10px rgba(255,255,255,0.12);
}

.youtube-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 30px;
  background: rgba(220, 38, 38, 0.95);
  color: white;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
}

.video-caption {
  padding: 14px 18px;
  font-size: 13px;
  color: #cbd5f5;
  background: rgba(255,255,255,0.03);
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.video-caption-text {
  flex: 1;
  min-width: 0;
  font-weight: 500;
}
.video-watch-link {
  color: #c4b5fd;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.4px;
  padding: 5px 12px;
  border-radius: 30px;
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.35);
  transition: 0.25s;
  white-space: nowrap;
}
.video-card:hover .video-watch-link {
  color: #fff;
  background: rgba(168, 85, 247, 0.28);
  border-color: #a855f7;
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.5);
}

/* ---------- EMPTY STATE ---------- */
.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: #64748b;
}
.empty-icon {
  display: block;
  font-size: 36px;
  margin-bottom: 10px;
  opacity: 0.4;
}

/* ---------- LOADING ---------- */
.loading-hero {
  text-align: center;
  padding: 100px 0 40px;
  position: relative;
}
.loading-text {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px;
}
.gradient-text {
  background: linear-gradient(90deg, #38bdf8, #a855f7, #f43f5e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.loading-sub { color: #64748b; font-size: 14px; margin: 0; }

.dots span {
  display: inline-block;
  animation: bob 1.2s infinite;
}
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bob {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50%      { transform: translateY(-6px); opacity: 0.5; }
}

.pulse-ring {
  width: 90px; height: 90px;
  margin: 0 auto 30px;
  border-radius: 50%;
  border: 3px solid #a855f7;
  position: relative;
  animation: pulse 1.6s ease-out infinite;
}
.pulse-ring::after {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 3px solid #ec4899;
  animation: pulse 1.6s ease-out infinite;
  animation-delay: 0.4s;
}
@keyframes pulse {
  0%   { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
}

.skeleton-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 40px;
}
.skeleton {
  border-radius: 20px;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.1), rgba(255,255,255,0.04));
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
}
.skeleton-lg { height: 220px; }
.skeleton-md { height: 140px; }
@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* ---------- FOOTER ---------- */
.results-footer {
  margin-top: 60px;
  text-align: center;
  font-size: 12px;
  color: #475569;
  letter-spacing: 0.5px;
}

/* ===========================================================
   INTENT-SPECIFIC LAYOUTS (Casualties / Rescue / Location / Timeline)
   =========================================================== */

.intent-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  animation: page-in 0.5s ease-out;
}

/* ---------- CASUALTIES : Extracted Mentions ---------- */
.mentions-panel .mentions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.mention-card {
  position: relative;
  padding: 22px 20px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: 0.25s;
}
.mention-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: #ef4444;
  border-radius: 4px 0 0 4px;
}
.mention-card.tone-critical::before { background: #ef4444; box-shadow: 0 0 18px #ef4444aa; }
.mention-card.tone-warning::before  { background: #f59e0b; box-shadow: 0 0 18px #f59e0baa; }
.mention-card.tone-moderate::before { background: #fbbf24; box-shadow: 0 0 14px #fbbf2499; }
.mention-card.tone-info::before     { background: #38bdf8; box-shadow: 0 0 14px #38bdf899; }
.mention-card:hover {
  transform: translateY(-3px);
  border-color: rgba(239, 68, 68, 0.4);
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.15);
}
.mention-label {
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 10px;
}
.mention-value {
  font-size: 34px;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #fca5a5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}
.mention-context {
  margin-top: 10px;
  font-size: 13px;
  color: #cbd5e1;
  opacity: 0.85;
}

/* ---------- RESCUE : Status banner + Operations grid ---------- */
.rescue-status-panel {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(16, 185, 129, 0.05));
  border: 1px solid rgba(34, 197, 94, 0.25);
  padding: 28px;
}
.rescue-status-header {
  display: flex;
  align-items: baseline;
  gap: 20px;
  flex-wrap: wrap;
}
.rescue-status-label {
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #86efac;
}
.rescue-status-value {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
  text-shadow: 0 0 14px rgba(34, 197, 94, 0.45);
}
.rescue-status-value.tone-critical { text-shadow: 0 0 18px rgba(239, 68, 68, 0.7); }
.rescue-status-value.tone-high     { text-shadow: 0 0 18px rgba(249, 115, 22, 0.7); }
.rescue-status-value.tone-moderate { text-shadow: 0 0 18px rgba(251, 191, 36, 0.7); }
.rescue-status-desc {
  margin-top: 14px;
  font-size: 14px;
  color: #d1fae5;
  opacity: 0.85;
}
.rescue-status-desc strong { color: #fff; }

.operations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 12px;
}
.operation-card {
  padding: 20px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: 0.25s;
}
.operation-card:hover {
  border-color: rgba(34, 197, 94, 0.35);
  box-shadow: 0 0 22px rgba(34, 197, 94, 0.18);
  transform: translateY(-2px);
}
.operation-value {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #86efac);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}
.operation-label {
  margin-top: 6px;
  font-size: 13px;
  color: #cbd5e1;
  font-weight: 500;
}
.operation-org {
  margin-top: 6px;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #64748b;
}

/* ---------- LOCATION : Regions + Map ---------- */
.regions-panel .regions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}
.region-row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition: 0.25s;
}
.region-row:hover {
  border-color: rgba(59, 130, 246, 0.35);
  box-shadow: 0 0 18px rgba(59, 130, 246, 0.15);
}
.region-rank {
  font-size: 22px;
  font-weight: 700;
  color: #475569;
  font-family: "JetBrains Mono", monospace;
  min-width: 32px;
}
.region-body {
  flex: 1;
  min-width: 0;
}
.region-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 4px;
}
.region-name {
  font-weight: 600;
  color: #f1f5f9;
  font-size: 15px;
}
.region-severity {
  font-size: 10px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 999px;
  font-weight: 600;
}
.region-severity.severity-critical { background: rgba(239, 68, 68, 0.18); color: #fca5a5; }
.region-severity.severity-high     { background: rgba(249, 115, 22, 0.18); color: #fdba74; }
.region-severity.severity-moderate { background: rgba(251, 191, 36, 0.18); color: #fde68a; }
.region-detail {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.region-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
}
.region-bar-fill {
  height: 100%;
  border-radius: 4px;
  animation: fill-in 0.8s ease-out;
}

/* Map visualization */
.map-visualization {
  margin-top: 14px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px;
}
.map-svg {
  width: 100%;
  height: 240px;
  display: block;
}
.map-legend {
  display: flex;
  gap: 18px;
  margin-top: 12px;
  font-size: 11px;
  color: #94a3b8;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  flex-wrap: wrap;
}
.map-legend > span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.map-legend .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.map-placeholder {
  padding: 40px 20px;
  text-align: center;
  color: #64748b;
}
.map-placeholder-icon {
  font-size: 42px;
  margin-bottom: 10px;
}

/* ---------- TIMELINE : Start/Peak + Event chart ---------- */
.time-marker-panel {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(234, 88, 12, 0.05));
  border: 1px solid rgba(245, 158, 11, 0.25);
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}
.time-marker-panel.peak {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(234, 88, 12, 0.05));
  border-color: rgba(239, 68, 68, 0.25);
}
.time-marker-label {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fcd34d;
}
.time-marker-panel.peak .time-marker-label { color: #fca5a5; }
.time-marker-value {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
}

.timeline-chart-panel {
  background: rgba(15, 23, 42, 0.5);
}
.timeline-chart {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(120px, 1fr);
  gap: 14px;
  margin-top: 18px;
  padding: 16px 8px 4px;
  overflow-x: auto;
  scrollbar-width: thin;
}
.timeline-chart::-webkit-scrollbar { height: 6px; }
.timeline-chart::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.25); border-radius: 4px; }
.timeline-event {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  min-width: 120px;
}
.timeline-bar-wrap {
  position: relative;
  height: 140px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-bottom: 1px solid rgba(245, 158, 11, 0.25);
}
.timeline-bar {
  width: 70%;
  border-radius: 6px 6px 0 0;
  min-height: 10px;
  transition: filter 0.25s;
  animation: bar-rise 0.6s ease-out;
}
.timeline-bar:hover { filter: brightness(1.25); }
@keyframes bar-rise {
  from { transform: scaleY(0); transform-origin: bottom; }
  to   { transform: scaleY(1); transform-origin: bottom; }
}
.timeline-meta {
  text-align: center;
}
.timeline-date {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #fcd34d;
}
.timeline-label {
  margin-top: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #f1f5f9;
}
.timeline-desc {
  margin-top: 4px;
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.4;
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 960px) {
  .results-wrapper { padding: 24px; }
  .query-text { font-size: 26px; }
  .summary-section { grid-template-columns: 1fr; }
  .stats-strip { grid-template-columns: 1fr 1fr; }
  .media-grid,
  .intent-grid { grid-template-columns: 1fr; }
  .full-span { grid-column: span 1; }
  .image-grid { grid-template-columns: 1fr 1fr; }
  .rescue-status-value,
  .time-marker-value { font-size: 22px; }
  .mention-value,
  .operation-value { font-size: 26px; }
}

@media (max-width: 520px) {
  .stats-strip { grid-template-columns: 1fr; }
  .query-text { font-size: 22px; }
  .severity-value { font-size: 36px; }
  .mentions-grid,
  .operations-grid { grid-template-columns: 1fr; }
}
