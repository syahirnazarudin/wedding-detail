(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={coupleNames:`Syahir & Zubairah`,eventLabel:`Wedding Operations`,title:`Event Day Details`,description:`A reference for family members and the person in charge during the wedding day.`,documentTitle:`Tentative and full details`,googleDocUrl:`https://docs.google.com/document/d/e/2PACX-1vSSoXPRoIvt3gL9lT1Dzr12SaepzTBjqlEdyNkf3d0laqWd7FgNIcrsjw1MI7nSvhZOMJHlrpjU7ktH/pub`,eventInfo:[{label:`Date`,value:`8 August 2026`},{label:`Venue`,value:`Alam Maya Kajang`},{label:`Time`,value:`8.00 AM - 4.00 PM`}],contacts:[{name:`En Afeeq`,role:`Floor Manager`,phone:`011-10171667`},{name:`Yok Cendol`,role:`Vendor Bihun Sup`,phone:`012-6220382`}],notes:[`Update the Google Doc whenever the tentative changes.`,`Use table headings clearly so everyone can scan the schedule quickly.`,`Keep phone numbers and vendor names near the top of the document.`]},t=`PASTE_YOUR_PUBLISHED_GOOGLE_DOC_URL_HERE`,n=document.querySelector(`#app`),r=!!(e.googleDocUrl&&e.googleDocUrl.trim()&&e.googleDocUrl!==t);function i(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function a(e){let t=new URL(e);if(t.hostname.includes(`docs.google.com`)){if(t.pathname.includes(`/pub`))return t.searchParams.set(`embedded`,`true`),t.toString();if(t.pathname.includes(`/edit`))return t.pathname=t.pathname.replace(`/edit`,`/preview`),t.search=``,t.hash=``,t.toString()}return t.toString()}function o(e){return e.map(e=>`
        <div class="info-row">
          <span>${i(e.label)}</span>
          <strong>${i(e.value)}</strong>
        </div>
      `).join(``)}function s(e){return e.map(e=>`
        <article class="contact">
          <div>
            <h3>${i(e.name)}</h3>
            <p>${i(e.role)}</p>
          </div>
          <a href="tel:${i(e.phone.replaceAll(` `,``))}">${i(e.phone)}</a>
        </article>
      `).join(``)}function c(){return r?`
    <iframe
      class="doc-frame"
      src="${i(a(e.googleDocUrl))}"
      title="Wedding operation document"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  `:`
      <div class="empty-state">
        <p class="eyebrow">Google Docs belum disambungkan</p>
        <h2>Paste your published Google Docs link in <code>src/wedding-config.js</code>.</h2>
        <ol>
          <li>Open your Google Docs file.</li>
          <li>Go to <strong>File</strong> then <strong>Share</strong> then <strong>Publish to web</strong>.</li>
          <li>Choose <strong>Embed</strong> or <strong>Link</strong>, publish it, and copy the URL.</li>
          <li>Replace <code>${t}</code> with that URL.</li>
        </ol>
      </div>
    `}n.innerHTML=`
  <main class="shell">
    <header class="topbar">
      <a class="brand" href="/">
        <span class="monogram">S&Z</span>
        <span>
          <strong>${i(e.coupleNames)}</strong>
          <small>Wedding Details</small>
        </span>
      </a>

      <nav aria-label="Page actions">
        ${r?`<a class="action secondary" href="${i(e.googleDocUrl)}" target="_blank" rel="noreferrer">Open Google Doc</a>`:``}
        <button class="action" type="button" id="print-page">Print</button>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${i(e.eventLabel)}</p>
        <h1>${i(e.title)}</h1>
        <p>${i(e.description)}</p>
      </div>
      <div class="event-card" aria-label="Event summary">
        ${o(e.eventInfo)}
      </div>
    </section>

    <section class="workspace">
      <aside class="sidebar" aria-label="Wedding coordination information">
        <section>
          <p class="section-label">Contacts</p>
          <div class="contact-list">${s(e.contacts)}</div>
        </section>

        <section>
          <p class="section-label">Notes</p>
          <ul class="notes">
            ${e.notes.map(e=>`<li>${i(e)}</li>`).join(``)}
          </ul>
        </section>
      </aside>

      <section class="document-panel" aria-label="Wedding details document">
        <div class="panel-header">
          <div>
            <p class="section-label">Live Document</p>
            <h2>${i(e.documentTitle)}</h2>
          </div>
          <span class="status">${r?`Synced from Google Docs`:`Setup needed`}</span>
        </div>
        ${c()}
      </section>
    </section>
  </main>
`,document.querySelector(`#print-page`).addEventListener(`click`,()=>window.print());