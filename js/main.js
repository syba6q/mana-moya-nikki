// 問い合わせフォームのURL（決まったらここだけ書きかえる）
const CONTACT_FORM_URL = "#";

// 問い合わせボタン（data-contact が付いたリンク）にURLを設定
document.querySelectorAll("[data-contact]").forEach((el) => {
  el.href = CONTACT_FORM_URL;
  el.target = "_blank";
  el.rel = "noopener";
});

// SPのメニュー開閉
const menuBtn = document.querySelector(".menu-btn");
const spNav = document.querySelector(".sp-nav");
if (menuBtn && spNav) {
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    spNav.hidden = open;
  });
}

// 日付を 2026.10.01 の形にする
function formatDate(date) {
  return date.replaceAll("-", ".");
}

// 日付の新しい順に並べた記事
function sortedArticles() {
  return [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
}

// 記事カード1枚分のHTML
function articleCard(article) {
  const thumb = article.thumbnail
    ? `<img class="card__thumb" src="${article.thumbnail}" alt="">`
    : `<div class="card__thumb card__thumb--placeholder" aria-hidden="true"></div>`;
  return `
    <li>
      <a class="card" href="article.html?id=${encodeURIComponent(article.id)}">
        ${thumb}
        <div class="card__body">
          <div class="card__meta">
            <span class="badge">${article.category}</span>
            <time class="text-small" datetime="${article.date}">${formatDate(article.date)}</time>
          </div>
          <h3 class="card__title">${article.title}</h3>
          <p class="card__excerpt text-small">${article.excerpt}</p>
        </div>
      </a>
    </li>
  `;
}

// トップ: 新着記事3件
const latestList = document.getElementById("latest-articles");
if (latestList) {
  latestList.innerHTML = sortedArticles().slice(0, 3).map(articleCard).join("");
}
