const DATA_URL = "./data/threat-actors.json";
const THEME_KEY = "rey-theme-threat-actor-cards";

const groupMeta = {
  all: { label: "All", rarity: "Full deck" },
  "nation-state": { label: "Nation-state", rarity: "Epic" },
  ransomware: { label: "Ransomware", rarity: "High risk" },
  financial: { label: "Financial", rarity: "Targeted" },
  hacktivist: { label: "Hacktivist", rarity: "Disruptive" },
};

const state = {
  actors: [],
  activeGroup: "all",
  query: "",
  flipped: new Set(),
};

document.addEventListener("DOMContentLoaded", async () => {
  setupTheme();
  wireControls();

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to load ${DATA_URL}`);
    }

    const data = await response.json();
    state.actors = (data.threat_actors || []).map((actor) => ({
      ...actor,
      derivedGroups: deriveGroups(actor),
    }));

    render();
  } catch (error) {
    renderError(error);
  }
});

function setupTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(storedTheme || (preferredDark ? "dark" : "light"));

  document.querySelector("#theme-toggle")?.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  const toggle = document.querySelector("#theme-toggle");
  if (toggle) {
    toggle.textContent = theme === "dark" ? "Dark mode" : "Light mode";
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

function wireControls() {
  document.querySelector("#search-input")?.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderCards();
    renderSummary();
  });

  document.querySelector("#group-chips")?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-group]");
    if (!button) {
      return;
    }

    state.activeGroup = button.dataset.group;
    renderGroupChips();
    renderCards();
    renderSummary();
  });

  document.querySelector("#card-grid")?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }

    const card = event.target.closest("article.actor-card[data-id]");
    if (!card) {
      return;
    }

    toggleCard(card.dataset.id);
  });

  document.querySelector("#card-grid")?.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key) || event.target.closest("a")) {
      return;
    }

    const card = event.target.closest("article.actor-card[data-id]");
    if (!card) {
      return;
    }

    event.preventDefault();
    toggleCard(card.dataset.id);
  });
}

function render() {
  renderGroupChips();
  renderCards();
  renderSummary();
}

function renderGroupChips() {
  const container = document.querySelector("#group-chips");
  const counts = getGroupCounts();

  container.innerHTML = Object.entries(groupMeta)
    .map(([groupId, meta]) => {
      const isActive = state.activeGroup === groupId;
      return `
        <button
          class="chip ${isActive ? "is-active" : ""}"
          type="button"
          data-group="${groupId}"
          aria-pressed="${String(isActive)}"
        >
          <span>${meta.label}</span>
          <small>${counts[groupId] ?? state.actors.length}</small>
        </button>
      `;
    })
    .join("");
}

function renderCards() {
  const container = document.querySelector("#card-grid");
  const filteredActors = getFilteredActors();

  if (!filteredActors.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No cards match the current filters</h3>
        <p>Try a broader search term or switch back to the full deck.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredActors.map(renderCard).join("");
}

function renderSummary() {
  const summary = document.querySelector("#result-summary");
  const filteredActors = getFilteredActors();
  const groupLabel = groupMeta[state.activeGroup].label;
  summary.textContent = `${filteredActors.length} card${filteredActors.length === 1 ? "" : "s"} shown · Filter: ${groupLabel}${
    state.query ? ` · Search: “${state.query}”` : ""
  }.`;
}

function renderCard(actor) {
  const groups = actor.derivedGroups;
  const primaryGroup = groups[0];
  const isFlipped = state.flipped.has(actor.id);
  const aliases = actor.aliases.join(" · ");
  const sectorList = actor.primary_targets.sectors.join(", ");
  const regionList = actor.primary_targets.regions.join(", ");
  const techniques = actor.commonly_used_techniques
    .map((technique) => {
      const techniqueId = technique.split(" ")[0];
      return `<li><a href="https://attack.mitre.org/techniques/${techniqueId}/" target="_blank" rel="noreferrer">${technique}</a></li>`;
    })
    .join("");

  return `
    <article
      class="actor-card ${isFlipped ? "is-flipped" : ""}"
      data-id="${actor.id}"
      data-rarity="${primaryGroup}"
      tabindex="0"
      role="button"
      aria-pressed="${String(isFlipped)}"
      aria-label="${actor.primary_codename}. Press Enter or Space to flip the card."
    >
      <div class="card-inner">
        <div class="card-face card-front">
          <span class="rarity-pill">${groupMeta[primaryGroup].rarity} · ${groupMeta[primaryGroup].label}</span>
          <span class="codename-row">
            <span class="codename">${actor.primary_codename}</span>
            <span class="origin">${getOriginBadge(actor.suspected_origin)}</span>
          </span>
          <span class="aliases">${aliases}</span>
          <span class="stat-block">
            <span><strong>Targets</strong>${sectorList}</span>
            <span><strong>Regions</strong>${regionList}</span>
            <span><strong>Origin</strong>${actor.suspected_origin}</span>
          </span>
          <span class="front-note">Flip for campaigns, MITRE techniques, tools, and source citations.</span>
        </div>
        <div class="card-face card-back">
          <span class="back-section">
            <strong>Notable campaigns</strong>
            <ul>${actor.notable_campaigns.map((campaign) => `<li>${campaign}</li>`).join("")}</ul>
          </span>
          <span class="back-section">
            <strong>Common MITRE techniques</strong>
            <ul>${techniques}</ul>
          </span>
          <span class="back-section">
            <strong>Notable malware / tools</strong>
            <ul>${actor.notable_malware_tools.map((tool) => `<li>${tool}</li>`).join("")}</ul>
          </span>
          <span class="source-row">Source: <a href="${actor.source}" target="_blank" rel="noreferrer">${new URL(actor.source).hostname}</a></span>
        </div>
      </div>
    </article>
  `;
}

function toggleCard(actorId) {
  if (state.flipped.has(actorId)) {
    state.flipped.delete(actorId);
  } else {
    state.flipped.add(actorId);
  }

  renderCards();
}

function getFilteredActors() {
  return state.actors.filter((actor) => {
    const haystack = `${actor.primary_codename} ${actor.aliases.join(" ")}`.toLowerCase();
    const matchesQuery = !state.query || haystack.includes(state.query);
    const matchesGroup = state.activeGroup === "all" || actor.derivedGroups.includes(state.activeGroup);
    return matchesQuery && matchesGroup;
  });
}

function getGroupCounts() {
  const counts = { all: state.actors.length, "nation-state": 0, ransomware: 0, financial: 0, hacktivist: 0 };
  state.actors.forEach((actor) => {
    actor.derivedGroups.forEach((group) => {
      counts[group] += 1;
    });
  });
  return counts;
}

function deriveGroups(actor) {
  const groups = new Set();
  const origin = actor.suspected_origin.toLowerCase();
  const sectors = actor.primary_targets.sectors.join(" ").toLowerCase();
  const campaigns = actor.notable_campaigns.join(" ").toLowerCase();
  const tools = actor.notable_malware_tools.join(" ").toLowerCase();
  const names = `${actor.primary_codename} ${actor.aliases.join(" ")}`.toLowerCase();

  if (/gru|svr|north korea|china|state-sponsored|ministry|intelligence|reconnaissance/.test(origin)) {
    groups.add("nation-state");
  }

  if (/ransomware|raas|extortion|encrypted for impact/.test(`${names} ${campaigns} ${tools}`)) {
    groups.add("ransomware");
  }

  if (/finance|retail|hospitality|bank|cryptocurrency/.test(`${sectors} ${campaigns} ${tools}`)) {
    groups.add("financial");
  }

  if (/hacktiv/.test(`${origin} ${campaigns} ${names}`)) {
    groups.add("hacktivist");
  }

  if (!groups.size) {
    groups.add("financial");
  }

  return [...groups];
}

function getOriginBadge(origin) {
  if (/russia/i.test(origin)) {
    return "🇷🇺 Russia";
  }
  if (/china/i.test(origin)) {
    return "🇨🇳 China";
  }
  if (/north korea/i.test(origin)) {
    return "🇰🇵 North Korea";
  }
  if (/unknown/i.test(origin)) {
    return "Unknown origin";
  }
  return origin;
}

function renderError(error) {
  document.querySelector("#card-grid").innerHTML = `
    <div class="empty-state">
      <h3>Unable to load threat actor data</h3>
      <p>${error.message}</p>
    </div>
  `;
}
