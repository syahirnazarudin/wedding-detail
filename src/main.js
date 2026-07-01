import "./style.css";
import { weddingConfig } from "./wedding-config.js";

const placeholderDocUrl = "PASTE_YOUR_PUBLISHED_GOOGLE_DOC_URL_HERE";
const app = document.querySelector("#app");

const hasDocument = Boolean(
  weddingConfig.googleDocUrl &&
  weddingConfig.googleDocUrl.trim() &&
  weddingConfig.googleDocUrl !== placeholderDocUrl,
);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toGoogleDocEmbedUrl(url) {
  const docUrl = new URL(url);

  if (docUrl.hostname.includes("docs.google.com")) {
    if (docUrl.pathname.includes("/pub")) {
      docUrl.searchParams.set("embedded", "true");
      return docUrl.toString();
    }

    if (docUrl.pathname.includes("/edit")) {
      docUrl.pathname = docUrl.pathname.replace("/edit", "/preview");
      docUrl.search = "";
      docUrl.hash = "";
      return docUrl.toString();
    }
  }

  return docUrl.toString();
}

function renderInfoList(items) {
  return items
    .map(
      (item) => `
        <div class="info-row">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
        </div>
      `,
    )
    .join("");
}

function renderContacts(contacts) {
  return contacts
    .map(
      (contact) => `
        <article class="contact">
          <div>
            <h3>${escapeHtml(contact.name)}</h3>
            <p>${escapeHtml(contact.role)}</p>
          </div>
          <a href="tel:${escapeHtml(contact.phone.replaceAll(" ", ""))}">${escapeHtml(contact.phone)}</a>
        </article>
      `,
    )
    .join("");
}

function renderDocument() {
  if (!hasDocument) {
    return `
      <div class="empty-state">
        <p class="eyebrow">Google Docs belum disambungkan</p>
        <h2>Paste your published Google Docs link in <code>src/wedding-config.js</code>.</h2>
        <ol>
          <li>Open your Google Docs file.</li>
          <li>Go to <strong>File</strong> then <strong>Share</strong> then <strong>Publish to web</strong>.</li>
          <li>Choose <strong>Embed</strong> or <strong>Link</strong>, publish it, and copy the URL.</li>
          <li>Replace <code>${placeholderDocUrl}</code> with that URL.</li>
        </ol>
      </div>
    `;
  }

  const embedUrl = toGoogleDocEmbedUrl(weddingConfig.googleDocUrl);
  return `
    <iframe
      class="doc-frame"
      src="${escapeHtml(embedUrl)}"
      title="Wedding operation document"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  `;
}

app.innerHTML = `
  <main class="shell">
    <header class="topbar">
      <a class="brand" href="/">
        <span class="monogram">S&Z</span>
        <span>
          <strong>${escapeHtml(weddingConfig.coupleNames)}</strong>
          <small>Wedding Details</small>
        </span>
      </a>

      <nav aria-label="Page actions">
        ${
          hasDocument
            ? `<a class="action secondary" href="${escapeHtml(weddingConfig.googleDocUrl)}" target="_blank" rel="noreferrer">Open Google Doc</a>`
            : ""
        }
        <button class="action" type="button" id="print-page">Print</button>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${escapeHtml(weddingConfig.eventLabel)}</p>
        <h1>${escapeHtml(weddingConfig.title)}</h1>
        <p>${escapeHtml(weddingConfig.description)}</p>
      </div>
      <div class="event-card" aria-label="Event summary">
        ${renderInfoList(weddingConfig.eventInfo)}
      </div>
    </section>

    <section class="workspace">
      <aside class="sidebar" aria-label="Wedding coordination information">
        <section>
          <p class="section-label">Contacts</p>
          <div class="contact-list">${renderContacts(weddingConfig.contacts)}</div>
        </section>

        <section>
          <p class="section-label">Notes</p>
          <ul class="notes">
            ${weddingConfig.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
          </ul>
        </section>
      </aside>

      <section class="document-panel" aria-label="Wedding details document">
        <div class="panel-header">
          <div>
            <p class="section-label">Live Document</p>
            <h2>${escapeHtml(weddingConfig.documentTitle)}</h2>
          </div>
          <span class="status">${hasDocument ? "Synced from Google Docs" : "Setup needed"}</span>
        </div>
        ${renderDocument()}
      </section>
    </section>
  </main>
`;

document
  .querySelector("#print-page")
  .addEventListener("click", () => window.print());
