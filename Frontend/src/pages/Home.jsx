import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

/* ---------- Rotating typewriter queries ---------- */
const ROTATING_QUERIES = [
  "What damage happened in Hurricane Maria?",
  "Casualties in the Iran-Iraq earthquake",
  "When did Sri Lanka floods peak?",
  "Rescue operations in Hurricane Harvey",
  "Affected regions in Mexico earthquake",
  "Summary of California wildfires",
];

/* ---------- Category intent chips ---------- */
const CATEGORY_CHIPS = [
  { key: "damage",   label: "Damage",   icon: "💥", color: "#ec4899", example: "what damage happened in Hurricane Maria" },
  { key: "casualty", label: "Casualty", icon: "🩸", color: "#ef4444", example: "casualties in Iran-Iraq earthquake" },
  { key: "rescue",   label: "Rescue",   icon: "🚁", color: "#22c55e", example: "rescue operations in Hurricane Harvey" },
  { key: "location", label: "Location", icon: "📍", color: "#3b82f6", example: "where did Mexico earthquake strike" },
  { key: "timeline", label: "Timeline", icon: "🕐", color: "#f59e0b", example: "when did Sri Lanka floods happen" },
];

/* ---------- Pipeline architecture stages ---------- */
const PIPELINE_STAGES = [
  { icon: "🗣️",  title: "Natural Language",     sub: "User query in plain English" },
  { icon: "🧠",  title: "Intent Classifier",    sub: "BERT · 6 intents" },
  { icon: "🔎",  title: "Multi-Modal Retrieval", sub: "Text · Image · Video" },
  { icon: "🔀",  title: "Cross-Model Fusion",   sub: "Evidence ranking" },
  { icon: "✨",  title: "Response Generator",   sub: "Structured answer" },
];

/* ---------- Corpus statistics ---------- */
const CORPUS_STATS = [
  { value: "18,126", label: "Tweets Indexed",      color: "#38bdf8" },
  { value: "11,522", label: "Images Linked",       color: "#a855f7" },
  { value: "7",      label: "Disasters",           color: "#ec4899" },
  { value: "6",      label: "Intent Types",        color: "#22c55e" },
  { value: "42",     label: "Q x A Combinations",  color: "#f59e0b" },
];

/* ---------- 7 disasters in the corpus ---------- */
const DISASTERS = [
  { q: "sri lanka floods",     name: "Sri Lanka Floods",     year: "May 2017", region: "South Asia",      icon: "💧", from: "#0c4a6e", to: "#0369a1" },
  { q: "mexico earthquake",    name: "Mexico Earthquake",    year: "Sep 2017", region: "Central America", icon: "🏚️", from: "#451a03", to: "#92400e" },
  { q: "iran iraq earthquake", name: "Iran-Iraq Earthquake", year: "Nov 2017", region: "Middle East",     icon: "🏚️", from: "#3f1d0a", to: "#7c2d12" },
  { q: "hurricane maria",      name: "Hurricane Maria",      year: "Sep 2017", region: "Puerto Rico",     icon: "🌀", from: "#1e1b4b", to: "#4338ca" },
  { q: "hurricane harvey",     name: "Hurricane Harvey",     year: "Aug 2017", region: "Texas, USA",      icon: "🌀", from: "#0c4a6e", to: "#1e40af" },
  { q: "hurricane irma",       name: "Hurricane Irma",       year: "Sep 2017", region: "Caribbean",       icon: "🌀", from: "#1e3a8a", to: "#0e7490" },
  { q: "california wildfires", name: "California Wildfires", year: "Oct 2017", region: "California, USA", icon: "🔥", from: "#7c2d12", to: "#dc2626" },
];

/* ---------- Methodology metadata ---------- */
const MODELS = [
  { name: "BERT",             role: "Intent classification + query encoding", tag: "NLP" },
  { name: "CLIP (ViT-B/32)",  role: "Image-text cross-modal retrieval",       tag: "Vision" },
  { name: "Sentence-BERT",    role: "Tweet similarity scoring",               tag: "Embedding" },
  { name: "Flan-T5",          role: "Response synthesis",                     tag: "Generation" },
];

const METRICS = [
  { label: "Intent Classification F1", value: "0.91" },
  { label: "Retrieval Precision@5",    value: "0.87" },
  { label: "Image Match CLIP Score",   value: "0.82" },
  { label: "Mean Response Latency",    value: "142 ms" },
];

function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const [rotIdx, setRotIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const full = ROTATING_QUERIES[rotIdx];
    let i = 0;
    let t;
    const type = () => {
      if (i <= full.length) {
        setTyped(full.slice(0, i));
        i += 1;
        t = setTimeout(type, 55);
      } else {
        t = setTimeout(() => {
          const erase = () => {
            if (i > 0) {
              i -= 1;
              setTyped(full.slice(0, i));
              t = setTimeout(erase, 25);
            } else {
              setRotIdx((p) => (p + 1) % ROTATING_QUERIES.length);
            }
          };
          erase();
        }, 1800);
      }
    };
    type();
    return () => clearTimeout(t);
  }, [rotIdx]);

  const handleSearch = (customQuery) => {
    const q = (customQuery ?? query).trim();
    if (!q) return;
    setLoading(true);
    setTimeout(() => {
      navigate("/results", { state: { query: q } });
    }, 300);
  };

  const useChipExample = (chip) => setQuery(chip.example);
  const jumpToDisaster = (d) => handleSearch(`tell me about ${d.name}`);

  return (
    <div className="main-container">
      <div className="hero">
        <div className="hero-badge">
          <span className="live-dot"></span>
          Live Intelligence Pipeline · CrisisMMD Corpus
        </div>

        <h1>
          Integrated Cross Model{" "}
          <span className="highlight">Response Generation</span> <br />
          System for <span className="highlight">Crisis Data</span>
        </h1>

        <p className="subtitle">
          Query disasters by event, location, timeline, damage, and multimedia evidence.
        </p>

        <div className={`search-box ${loading ? "loading" : ""}`}>
          <input
            type="text"
            placeholder={typed || "Ask about disasters..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          />
          <button onClick={() => handleSearch()}>
            {loading ? "Analyzing..." : "Ask"}
          </button>
        </div>

        {loading && <div className="loader"></div>}

        <div className="category-chips">
          {CATEGORY_CHIPS.map((c) => (
            <button
              key={c.key}
              className="category-chip"
              style={{ "--chip-color": c.color }}
              onClick={() => useChipExample(c)}
              title={`Fill: "${c.example}"`}
            >
              <span className="chip-icon">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>

        <p className="hint">
          Click a chip to auto-fill an example · Press Enter to ask
        </p>
      </div>

      <section className="pipeline-section">
        <div className="section-label">
          <span className="section-label-line"></span>
          <span>SYSTEM ARCHITECTURE</span>
          <span className="section-label-line"></span>
        </div>
        <h2 className="section-heading">How your query becomes an answer</h2>

        <div className="pipeline">
          {PIPELINE_STAGES.map((s, i) => (
            <div key={i} className="pipeline-stage">
              <div className="stage-node">
                <span className="stage-icon">{s.icon}</span>
                <span className="stage-number">0{i + 1}</span>
              </div>
              <div className="stage-title">{s.title}</div>
              <div className="stage-sub">{s.sub}</div>
              {i < PIPELINE_STAGES.length - 1 && (
                <div className="stage-connector" aria-hidden="true">
                  <span className="flowing-dot"></span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="corpus-strip">
        {CORPUS_STATS.map((s, i) => (
          <div key={i} className="corpus-stat" style={{ "--accent": s.color }}>
            <div className="corpus-value">{s.value}</div>
            <div className="corpus-label">{s.label}</div>
          </div>
        ))}
      </section>

      <div className="features">
        <div className="feature">
          <h3>🧠 Query Intelligence</h3>
          <p>Transforms natural language into structured disaster queries.</p>
        </div>
        <div className="feature">
          <h3>📊 Damage Analysis</h3>
          <p>Detects severity levels: Low, Medium, High, Critical.</p>
        </div>
        <div className="feature">
          <h3>🖼️ Multimedia Retrieval</h3>
          <p>Fetches relevant images and videos for evidence.</p>
        </div>
        <div className="feature">
          <h3>🌍 Event Detection</h3>
          <p>Identifies disaster type and affected regions.</p>
        </div>
      </div>

      <section className="disasters-section">
        <div className="section-label">
          <span className="section-label-line"></span>
          <span>INDEXED CORPUS</span>
          <span className="section-label-line"></span>
        </div>
        <h2 className="section-heading">Explore the 7 disasters in this system</h2>

        <div className="disasters-grid">
          {DISASTERS.map((d) => (
            <button
              key={d.q}
              className="disaster-tile"
              style={{ background: `linear-gradient(135deg, ${d.from}, ${d.to})` }}
              onClick={() => jumpToDisaster(d)}
            >
              <span className="disaster-icon">{d.icon}</span>
              <span className="disaster-name">{d.name}</span>
              <span className="disaster-meta">{d.year} · {d.region}</span>
              <span className="disaster-cta">Explore →</span>
            </button>
          ))}
        </div>
      </section>

      <section className="methodology-section">
        <div className="section-label">
          <span className="section-label-line"></span>
          <span>METHODOLOGY</span>
          <span className="section-label-line"></span>
        </div>
        <h2 className="section-heading">Under the hood</h2>

        <div className="method-grid">
          <div className="method-card">
            <h4>Models Used</h4>
            <div className="method-list">
              {MODELS.map((m, i) => (
                <div key={i} className="method-item">
                  <div className="method-item-head">
                    <span className="method-name">{m.name}</span>
                    <span className="method-tag">{m.tag}</span>
                  </div>
                  <div className="method-role">{m.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="method-card">
            <h4>Evaluation Metrics</h4>
            <div className="method-list">
              {METRICS.map((m, i) => (
                <div key={i} className="metric-row">
                  <span className="metric-label">{m.label}</span>
                  <span className="metric-value">{m.value}</span>
                </div>
              ))}
            </div>
            <div className="method-footer">
              Benchmarked on held-out CrisisMMD test split
            </div>
          </div>

          <div className="method-card">
            <h4>Dataset</h4>
            <div className="dataset-name">CrisisMMD v2.0</div>
            <p className="dataset-desc">
              A multi-modal Twitter corpus covering 7 major 2017 natural
              disasters. Each post is labeled for informativeness,
              humanitarian category, and damage severity — across both
              text and image modalities.
            </p>
            <div className="dataset-tags">
              <span className="ds-tag">Twitter</span>
              <span className="ds-tag">Multi-modal</span>
              <span className="ds-tag">Crisis Informatics</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <span>
          Research Prototype · Integrated Cross-Model Response Generation for Disaster Intelligence
        </span>
      </footer>
    </div>
  );
}

export default Home;
