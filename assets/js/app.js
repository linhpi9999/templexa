/* Templexa templates UI (vanilla JS) */

const state = {
  query: "",
  sort: "recommended",
  page: 1,
  perPage: 6,
  totalPages: 223, // giống ảnh (có thể đổi theo dữ liệu thật)
  filterTab: "All Templates",
};

const templates = [
  {
    id: 1,
    name: "AI Company",
    meta: "Business & Services",
    img: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1600&q=70",
    recommendedRank: 1,
  },
  {
    id: 2,
    name: "Pilates Studio (Energetic)",
    meta: "Community",
    img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1600&q=70",
    recommendedRank: 2,
  },
  {
    id: 3,
    name: "Tech Company",
    meta: "Creative",
    img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1600&q=70",
    recommendedRank: 3,
  },
  {
    id: 4,
    name: "Construction Company",
    meta: "Business & Services",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=70",
    recommendedRank: 4,
  },
  {
    id: 5,
    name: "Physical Therapy Clinic (Modern)",
    meta: "Business & Services",
    img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1600&q=70",
    recommendedRank: 5,
  },
  {
    id: 6,
    name: "Locksmith",
    meta: "Store",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1600&q=70",
    recommendedRank: 6,
  },
    {
    id: 7,
    name: "Locksmith",
    meta: "Store",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1600&q=70",
    recommendedRank: 6,
  },
    {
    id: 8,
    name: "Locksmith",
    meta: "Store",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1600&q=70",
    recommendedRank: 6,
  },
    {
    id: 9,
    name: "Locksmith",
    meta: "Store",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1600&q=70",
    recommendedRank: 6,
  },
  // thêm vài mẫu để search/sort trông thật hơn
  { id: 10, name: "Coffee Shop", meta: "Store", img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=70", recommendedRank: 8 },
  { id: 11, name: "Marketing Agency", meta: "Business & Services", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=70", recommendedRank: 7 },
  { id: 12, name: "Photographer Portfolio", meta: "Creative", img: "https://images.unsplash.com/photo-1520975958225-5e5f4fe3f2c8?auto=format&fit=crop&w=1600&q=70", recommendedRank: 9 },
  { id: 13, name: "Blog Minimal", meta: "Blog", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=70", recommendedRank: 10 },
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function applyQueryAndSort(items) {
  let out = items;

  const q = state.query.trim().toLowerCase();
  if (q) {
    out = out.filter(t =>
      (t.name + " " + t.meta).toLowerCase().includes(q)
    );
  }

  // tab filter demo (giữ UI giống ảnh; logic có thể thay bằng dữ liệu thật)
  if (state.filterTab === "Blank Templates") {
    out = out.filter(t => t.name.toLowerCase().includes("blank"));
  } else if (state.filterTab === "Collections") {
    out = out.filter(t => t.name.toLowerCase().includes("collection"));
  }

  if (state.sort === "recommended") {
    out = [...out].sort((a, b) => (a.recommendedRank ?? 999) - (b.recommendedRank ?? 999));
  } else if (state.sort === "name_asc") {
    out = [...out].sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sort === "name_desc") {
    out = [...out].sort((a, b) => b.name.localeCompare(a.name));
  }

  return out;
}

function renderGrid() {
  const grid = $("#grid");
  if (!grid) return;

  const filtered = applyQueryAndSort(templates);

  // vì UI ảnh có paging lớn, ta chỉ render trang hiện tại dựa trên perPage
  const start = (state.page - 1) * state.perPage;
  const pageItems = filtered.slice(start, start + state.perPage);

  grid.innerHTML = pageItems.map(t => `
    <article class="card">
      <div class="thumb">
        <img class="thumb__img" src="${t.img}" alt="${escapeHtml(t.name)}" loading="lazy" />
        <div class="thumb__topdots" aria-hidden="true">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </div>

        <div class="overlay">
          <div class="overlay__stack">
            <button class="pill pill--dark" type="button" data-action="edit" data-id="${t.id}">Edit</button>
            <button class="pill" type="button" data-action="view" data-id="${t.id}">View</button>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="info__meta">${escapeHtml(t.meta)}</div>
        <div class="info__name">${escapeHtml(t.name)}</div>
      </div>
    </article>
  `).join("");

  // nếu không có kết quả
  if (pageItems.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; padding: 18px; color:#5c6270;">
        Không tìm thấy template phù hợp.
      </div>
    `;
  }
}

function renderPager() {
  const nums = $("#pagerNums");
  if (!nums) return;

  // hiển thị kiểu: 1 2 3 4 5 … 223 (giống ảnh)
  const total = state.totalPages;
  const current = state.page;

  const buttons = [];

  function addNum(n, active = false) {
    buttons.push(`
      <button class="pagenum ${active ? "pagenum--active" : ""}" data-goto="${n}">
        ${n}
      </button>
    `);
  }

  function addDots() {
    buttons.push(`<span class="pagedots">…</span>`);
  }

  // window nhỏ quanh current nhưng vẫn giữ vibe như ảnh (đầu 1-5 rồi … rồi last)
  const head = [1, 2, 3, 4, 5];
  head.forEach(n => addNum(n, n === current));

  if (current > 6 && current < total - 1) {
    addDots();
    addNum(current - 1);
    addNum(current, true);
    addNum(current + 1);
  }

  if (total > 6) {
    addDots();
    addNum(total, current === total);
  }

  nums.innerHTML = buttons.join("");
}

function clampPage() {
  const total = state.totalPages;
  if (state.page < 1) state.page = 1;
  if (state.page > total) state.page = total;
}

function setSortLabel() {
  const map = {
    recommended: "Recommended",
    name_asc: "Name (A → Z)",
    name_desc: "Name (Z → A)",
  };
  const el = $("#sortLabel");
  if (el) el.textContent = map[state.sort] ?? "Recommended";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* Interactions */

// Search
const q = $("#q");
q?.addEventListener("input", (e) => {
  state.query = e.target.value;
  state.page = 1;
  renderGrid();
  renderPager();
});

// Sort menu
const sortBtn = $("[data-sort-open]");
const sortMenu = $("[data-sort-menu]");
sortBtn?.addEventListener("click", () => {
  sortMenu?.classList.toggle("sort__menu--open");
});
$$("[data-sort]").forEach(btn => {
  btn.addEventListener("click", () => {
    state.sort = btn.dataset.sort;
    state.page = 1;
    setSortLabel();
    sortMenu?.classList.remove("sort__menu--open");
    renderGrid();
    renderPager();
  });
});

// Tabs
$$(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach(t => t.classList.remove("tab--active"));
    tab.classList.add("tab--active");
    state.filterTab = tab.dataset.filter;
    state.page = 1;
    renderGrid();
    renderPager();
  });
});

// Pager nav
$$(".pager [data-page]").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.page;
    if (type === "first") state.page = 1;
    if (type === "prev") state.page -= 1;
    if (type === "next") state.page += 1;
    if (type === "last") state.page = state.totalPages;

    clampPage();
    renderGrid();
    renderPager();
    window.scrollTo({ top: 220, behavior: "smooth" });
  });
});

$("#pagerNums")?.addEventListener("click", (e) => {
  const b = e.target.closest("[data-goto]");
  if (!b) return;
  state.page = Number(b.dataset.goto || 1);
  clampPage();
  renderGrid();
  renderPager();
  window.scrollTo({ top: 220, behavior: "smooth" });
});

// Card actions (demo)
$("#grid")?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;
  const id = btn.dataset.id;
  if (action === "edit") alert(`Edit template #${id}`);
  if (action === "view") alert(`View template #${id}`);
});

// Topbar dropdowns
const ddMap = {
  product: $("#dd-product"),
  solutions: $("#dd-solutions"),
  resources: $("#dd-resources"),
};
$$("[data-dd]").forEach(trigger => {
  trigger.addEventListener("click", (e) => {
    const key = trigger.dataset.dd;
    Object.entries(ddMap).forEach(([k, el]) => {
      if (!el) return;
      el.classList.toggle("dd--open", k === key ? !el.classList.contains("dd--open") : false);
    });

    // position dropdown roughly below the clicked item
    const el = ddMap[key];
    if (el) {
      const r = trigger.getBoundingClientRect();
      const left = Math.max(12, r.left - 20);
      el.style.left = `${left}px`;
    }
    e.stopPropagation();
  });
});

// Close popovers on outside click
document.addEventListener("click", () => {
  Object.values(ddMap).forEach(el => el?.classList.remove("dd--open"));
  sortMenu?.classList.remove("sort__menu--open");
});

// Mobile drawer
const mobile = $("[data-mobile]");
$("[data-mobile-open]")?.addEventListener("click", () => mobile?.classList.add("mobile--open"));
$("[data-mobile-close]")?.addEventListener("click", () => mobile?.classList.remove("mobile--open"));
mobile?.addEventListener("click", (e) => {
  if (e.target === mobile) mobile.classList.remove("mobile--open");
});

// Init
setSortLabel();
renderGrid();
renderPager();

async function loadCategories() {
  const res = await fetch("./assets/data/categories.json");
  if (!res.ok) throw new Error("Không tải được assets/data/categories.json");
  return await res.json();
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

document.addEventListener("DOMContentLoaded", async () => {
  const topicBtns = Array.from(document.querySelectorAll(".cats__item[data-cat]"));
  const drop = document.getElementById("catsDrop");
  const groupsEl = document.getElementById("catsGroups");
  const namesEl = document.getElementById("catsNames");
  const titleEl = document.getElementById("catsDropTitle");
  const closeBtn = document.querySelector("[data-cats-close]");

  // Không có cats section thì thôi
  if (!topicBtns.length || !drop || !groupsEl || !namesEl || !titleEl) return;

  let rows = [];
  try {
    rows = await loadCategories();
  } catch (err) {
    console.error(err);
    titleEl.textContent = "Không tải được danh mục";
    groupsEl.innerHTML = `<div style="padding:12px; color:#5E7A90;">Kiểm tra đường dẫn: <b>assets/data/categories.json</b></div>`;
    return;
  }

  let activeTopic = null;
  let activeGroup = null;

  const TOPIC_LABEL = {
    "Business & Services": "Dịch vụ",
    "Store": "Cửa hàng",
    "Creative": "Sáng tạo",
    "Community": "Sự kiện",
    "Blog": "Blog"
  };

  function openDrop(btn) {
    drop.classList.add("catsdrop--open");
    drop.setAttribute("aria-hidden", "false");
    topicBtns.forEach(b => b.setAttribute("aria-expanded", b === btn ? "true" : "false"));
  }

  function closeDrop() {
    drop.classList.remove("catsdrop--open");
    drop.setAttribute("aria-hidden", "true");
    topicBtns.forEach(b => b.setAttribute("aria-expanded", "false"));
  }

  function render(topic) {
    const topicRows = rows.filter(r => r.topic === topic);

    // Nếu topic chưa có data
    if (!topicRows.length) {
      titleEl.textContent = TOPIC_LABEL[topic] || topic;
      groupsEl.innerHTML = `<div style="padding:12px; color:#5E7A90;">Chưa có dữ liệu cho topic này.</div>`;
      namesEl.innerHTML = "";
      return;
    }

    const groups = uniq(topicRows.map(r => r.group));

    // group mặc định
    if (!activeGroup || !groups.includes(activeGroup)) activeGroup = groups[0];

    titleEl.textContent = TOPIC_LABEL[topic] || topic;

    // render groups
    groupsEl.innerHTML = "";
    groups.forEach(g => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "catsdrop__group" + (g === activeGroup ? " catsdrop__group--active" : "");
      b.textContent = g;
      b.addEventListener("click", () => {
        activeGroup = g;
        render(topic);
      });
      groupsEl.appendChild(b);
    });

    // render names
    const names = topicRows.filter(r => r.group === activeGroup).map(r => r.name);
    namesEl.innerHTML = "";

    names.forEach(name => {
      const a = document.createElement("a");
      a.className = "catsdrop__name";
      a.textContent = name;

      // Nếu bạn CHƯA có templates.html thì tạm để "#"
      // a.href = "#";

      // Nếu bạn có templates.html thì giữ link này
      const t = encodeURIComponent(topic);
      const g = encodeURIComponent(activeGroup);
      const n = encodeURIComponent(name);
      a.href = `./templates.html?topic=${t}&group=${g}&name=${n}`;

      namesEl.appendChild(a);
    });
  }

  topicBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const topic = btn.dataset.cat;

      // bấm lại cùng topic thì toggle đóng
      if (drop.classList.contains("catsdrop--open") && activeTopic === topic) {
        closeDrop();
        return;
      }

      activeTopic = topic;
      activeGroup = null; // reset để auto chọn group đầu
      render(activeTopic);
      openDrop(btn);
    });
  });

  closeBtn?.addEventListener("click", closeDrop);

  // Click ra ngoài cats -> đóng
  document.addEventListener("click", (e) => {
    const insideCats = e.target.closest(".cats");
    if (!insideCats) closeDrop();
  });

  // ESC -> đóng
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrop();
  });
});
