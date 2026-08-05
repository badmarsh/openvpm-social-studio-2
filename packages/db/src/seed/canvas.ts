import { db } from "../index";
import { canvasDocuments, canvasTemplates } from "../schema/canvas";
import { practices, users } from "../schema/core";
import { eq } from "drizzle-orm";

export async function seedCanvasDocuments() {
  console.log("Seeding Canvas Documents...");

  const practice = await db.query.practices.findFirst();
  const user = await db.query.users.findFirst();

  if (!practice || !user) {
    console.warn("No practice or user found to associate canvas documents with. Skipping seed.");
    return;
  }

  const documents = [
    {
      title: "Master Strategický Plán v8.0",
      docType: "STRATEGY",
      content: `<h1>Stratégia rozvoja a operačná modernizácia kliniky v8.0</h1>
<h2>1. Exekutívne Zhrnutie</h2>
<p>Tento dokument predstavuje komplexný, dátami podložený strategický plán pre digitálnu transformáciu súkromnej veterinárnej kliniky v Rimavskej Sobote. MVDr. Martin Sýkora prevzal existujúcu ambulanciu, a budovanie nového brandingu je kľúčové.</p>
<h2>2. Piliere rastu</h2>
<ul>
  <li>Lokálna digitálna dominancia a branding</li>
  <li>Sociálne siete a osobná značka lekára</li>
  <li>Wellness Plány (Subscription model)</li>
  <li>Fear-Free prístup a certifikácia</li>
</ul>
<h2>3. Transformačná Mapa</h2>
<ul>
  <li><strong>Gate 1 (Mesiac 1):</strong> GBP & Web Ready</li>
  <li><strong>Gate 2 (Mesiac 3):</strong> AI Scribe Proven</li>
  <li><strong>Gate 3 (Mesiac 6):</strong> Wellness Adoption > 3%</li>
  <li><strong>Gate 4 (Mesiac 12):</strong> Full OpenVPM Migration</li>
</ul>
<h2>4. Client Acquisition to Retention Flow</h2>
<pre class="mermaid">
graph TD
    A[Sociálne Siete / Lokálne SEO] --> B[Zavolanie / Rezervácia]
    B --> C[Fear-Free Návšteva]
    C --> D[Discharge Ask - Recenzia]
    D --> E[Ponuka Wellness Plánu]
    E --> F[Lojálny Klient]
</pre>`,
    },
    {
      title: "Klinický SOP: Senzorický Fear-Free Protokol",
      docType: "SOP",
      content: `<h1>Klinický SOP: Senzorický Fear-Free Protokol</h1>
<p>Základné pravidlá pre znižovanie stresu pacienta v prostredí kliniky.</p>
<h2>Ranné povinnosti na recepcii</h2>
<ul class="contains-task-list">
  <li class="task-list-item">[ ] Zapnutie difuzérov (Adaptil/Feliway).</li>
  <li class="task-list-item">[ ] Nastavenie upokojujúcej hudby v čakárni (žiadne komerčné rádio).</li>
  <li class="task-list-item">[ ] Príprava vyvýšených odkladacích plôch pre mačacie prepravky (oddelené zóny pre mačky a psov).</li>
  <li class="task-list-item">[ ] Pripravenie protišmykových podložiek na vyšetrovacie stoly.</li>
</ul>
<h2>Low-Stress manipulácia (Základné princípy)</h2>
<ul>
  <li>Zamedzenie očného kontaktu mačiek so psami v čakárni (použitie vizuálnych bariér).</li>
  <li>Používanie lízacích podložiek (LickiMat) s arašidovým maslom / pastou počas odberov a vakcinácií.</li>
  <li>Teplé osvetlenie v ambulancii a kľudný prístup personálu. Pomalé pohyby, odmeňovanie zvieraťa.</li>
</ul>`,
    },
    {
      title: "Komunikačný a Krízový Manuál: Google Recenzie",
      docType: "MANUAL",
      content: `<h1>Komunikačný a Krízový Manuál: Google Recenzie</h1>
<p>Zásady odpovedania na online spätnú väzbu a riešenie krízových situácií. Tento dokument slúži ako RAG kontext pre AI asistentov.</p>
<h2>Matica odpovedí</h2>
<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr>
      <th style="padding: 8px;">Typ Recenzie</th>
      <th style="padding: 8px;">Tón Odpovede</th>
      <th style="padding: 8px;">Príklad Odpovede (Slovak)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px;">Sťažnosť na vysokú cenu (1-2★)</td>
      <td style="padding: 8px;">Hranice a profesionalita, transparentnosť</td>
      <td style="padding: 8px;">"Dobrý deň, mrzí nás Vaša nespokojnosť. Veterinárna medicína, ak sa má robiť bezpečne, vyžaduje špičkové prístroje a lieky. Detaily Vášho účtu s Vami kedykoľvek prejdeme, no znižovať kvalitu práce a ohrozovať pacienta len preto, aby bol účet nižší, na našej klinike nikdy nebudeme."</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Úmrtie pacienta (aj napriek záchrane 5★)</td>
      <td style="padding: 8px;">Extrémna empatia, súcit</td>
      <td style="padding: 8px;">"Vážená rodina, strata zasiahla aj nás. Boli ste skvelí majitelia, ktorí urobili pre svojho miláčika maximum do úplného konca. Bolo nám cťou sa o neho starať v jeho najťažších chvíľach. Sme s Vami."</td>
    </tr>
    <tr>
      <td style="padding: 8px;">5-hviezdičková pochvala</td>
      <td style="padding: 8px;">Vďačnosť, komunita</td>
      <td style="padding: 8px;">"Ďakujeme veľmi pekne za Vašu dôveru a krásne slová! Rony bol na stole naozaj statočný pacient a spolupráca s Vami je radosť. Tešíme sa na Vašu ďalšiu preventívnu návštevu."</td>
    </tr>
  </tbody>
</table>`,
    },
    {
      title: "SOP: Obsluha a Export pre Edukačnú TV",
      docType: "SOP",
      content: `<h1>SOP: Obsluha a Export pre Edukačnú TV v čakárni</h1>
<h2>Technický Setup</h2>
<ul>
  <li><strong>Hardvér:</strong> Televízor s voľným HDMI vstupom + Android TV Stick (napr. Chromecast s Google TV, Raspberry Pi alebo Xiaomi Mi TV Stick 4K).</li>
  <li><strong>Softvér:</strong> Canva (na tvorbu a úpravu prezentácií) + aplikácia na loopovanie obsahu na TV (odporúčané: Yodeck, Screenly, alebo jednoduchý video prehrávač v loope).</li>
</ul>
<h2>Proces Exportu z Marketingového Plánovača (OpenVPM)</h2>
<ol>
  <li>Otvorte modul <strong>Marketing & Rast</strong> v OpenVPM.</li>
  <li>Prejdite na sekciu šablón a vyfiltrujte <em>"TV Slides (16:9)"</em>.</li>
  <li>Upravte aktuálny sezónny slide. <strong>Pravidlo:</strong> maximálne 15 slov na jeden slide, text musí byť čitateľný z 3 metrov.</li>
  <li>Exportujte dizajn ako video slučka (MP4, 1080p).</li>
  <li>Nahrajte MP4 súbor do zdieľanej zložky Google Drive / priamo do Yodeck administrácie, z ktorej čerpá TV v čakárni.</li>
</ol>
<h2>Aktualizácia Obsahu</h2>
<p>Obsah sa musí meniť pravidelne, ideálne na začiatku každého mesiaca podľa aktuálnej sezónnosti. Príklady: jarná ochrana proti kliešťom (marec-máj), nebezpečenstvo prehriatia v aute (jún-august), pet dental health (február), stres a pyrotechnika (december).</p>`,
    },
    {
      title: "Klientske Persony (Slovak & Hungarian demographics)",
      docType: "STRATEGY",
      content: `<h1>Klientske Persony (Región Juh - Rimavská Sobota a okolie)</h1>
<p>Detailný rozbor cieľových skupín pre presné cielenie komunikačného tónu AI a marketingových kampaní.</p>
<h2>Persona 1: Lokálny Senior (János / Mária)</h2>
<ul>
  <li><strong>Demografia:</strong> 60+ rokov, prevažne maďarsky hovoriaci obyvatelia regiónu.</li>
  <li><strong>Správanie:</strong> Extrémne cenovo senzitívny segment, no nesmierne lojálny po získaní dôvery. Vyžaduje vysokú mieru osobnej dôvery a priamu autoritu lekára. Nejde primárne po technologických novinkách.</li>
  <li><strong>Komunikácia:</strong> Preferuje osobný kontakt, telefonáty a papierové letáky v čakárni. <strong>Kľúčové:</strong> Nutná bilingválna (SK/HU) komunikácia na recepcii a základných letákoch. Reaguje na konzervatívny, vysoko rešpektujúci a trpezlivý tón.</li>
</ul>
<h2>Persona 2: Mladá Rodina / Mileniál (Tomáš a Lucia)</h2>
<ul>
  <li><strong>Demografia:</strong> 25-40 rokov, slovensky hovoriaci alebo bilingválni.</li>
  <li><strong>Správanie:</strong> Vnímajú psa alebo mačku ako plnohodnotného "chlpatého" člena rodiny. Ochotní investovať nadštandardné prostriedky do prevencie, diagnostiky a prémiových služieb. Oceňujú digitálny prístup a transparentnosť.</li>
  <li><strong>Komunikácia:</strong> Digital-first prístup. Vyžadujú online rezervácie termínov, automatické SMS pripomienky, aktívny a atraktívny Instagram (Reels), edukatívny obsah. Sú hlavnou cieľovou skupinou pre predaj <em>Wellness plánov</em> a silne reagujú na <em>Fear-Free</em> princípy a welfare zvieraťa.</li>
</ul>`,
    }
  ];

  for (const doc of documents) {
    await db.insert(canvasDocuments).values({
      practiceId: practice.id,
      authorId: user.id,
      title: doc.title,
      docType: doc.docType,
      content: doc.content,
    });
  }

  console.log("Canvas documents seeded successfully.");
}
