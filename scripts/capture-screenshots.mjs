import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const outputDir = new URL("../public/screenshots/", import.meta.url);

const metrics = [
  { label: "MFA coverage / Cobertura MFA", value: "96%", delta: "+4 points / +4 puntos", tone: "#c7ff55" },
  { label: "Guest reviews / Revisiones guest", value: "7", delta: "2 waiting / 2 en espera", tone: "#ffb84d" },
  { label: "Break-glass sessions / Sesiones de emergencia", value: "2", delta: "Reviewed / Revisadas", tone: "#ff6f8f" },
  { label: "Audit lag / Retardo de auditoría", value: "2m", delta: "Within target / En objetivo", tone: "#6fe7ff" },
];

const signals = [
  { label: "Identity trust / Confianza", value: "High / Alta", detail: "Device posture and MFA are green." },
  { label: "Contractors / Contratistas", value: "Watch / Vigilar", detail: "Two accounts expire today." },
  { label: "Incident bridge / Puente", value: "Ready / Listo", detail: "Break-glass route pre-approved." },
];

const queue = [
  { user: "Maya Chen / Maya Chen", access: "Vendor VPN / VPN proveedor", status: "Pending / Pendiente" },
  { user: "Diego Alvarez / Diego Alvarez", access: "Finance export / Exportación finanzas", status: "Approved / Aprobado" },
  { user: "Sofia Patel / Sofia Patel", access: "Security console / Consola seguridad", status: "Review / Revisión" },
];

const audit = [
  { title: "Access granted / Acceso aprobado", detail: "Vendor VPN -> Maya Chen", time: "3m / 3 min" },
  { title: "Policy tightened / Política reforzada", detail: "MFA required for exports", time: "18m / 18 min" },
  { title: "Session expired / Sesión expirada", detail: "Temporary cover closed", time: "1h / 1 h" },
];

const rules = [
  "MFA for privileged roles / MFA para roles privilegiados",
  "Temporary access expiry / Expiración temporal",
  "Traceable approvals / Aprobaciones trazables",
];

const roles = [
  { label: "Owner / Propietario", accent: "#ffb84d" },
  { label: "Admin / Administrador", accent: "#c7ff55" },
  { label: "Analyst / Analista", accent: "#6fe7ff" },
  { label: "Viewer / Lector", accent: "#ff6f8f" },
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrap(text, size) {
  return text.length > size ? `${text.slice(0, size - 1)}…` : text;
}

function desktopSvg() {
  const metricCards = metrics
    .map(
      (m, i) => `
        <g transform="translate(${36 + i * 336}, 360)">
          <rect width="314" height="114" rx="18" fill="rgba(15,18,17,0.95)" stroke="rgba(255,255,255,0.08)" />
          <text x="16" y="30" fill="#9ca79f" font-size="10" letter-spacing="2.2">${esc(m.label)}</text>
          <text x="16" y="72" fill="#f3f5ef" font-size="34" font-weight="700">${esc(m.value)}</text>
          <rect x="188" y="48" width="110" height="24" rx="12" fill="rgba(255,255,255,0.04)" />
          <text x="243" y="65" text-anchor="middle" fill="${m.tone}" font-size="10" font-weight="700">${esc(m.delta)}</text>
        </g>`,
    )
    .join("");

  const signalTiles = signals
    .map(
      (s, i) => `
        <g transform="translate(0, ${18 + i * 102})">
          <rect width="356" height="90" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" />
          <text x="16" y="24" fill="#9ca79f" font-size="10" letter-spacing="2">${esc(s.label)}</text>
          <text x="16" y="50" fill="#f3f5ef" font-size="19" font-weight="700">${esc(s.value)}</text>
          <text x="16" y="74" fill="#9ca79f" font-size="11">${esc(s.detail)}</text>
        </g>`,
    )
    .join("");

  const queueRows = queue
    .map(
      (q, i) => `
        <g transform="translate(0, ${106 + i * 96})">
          <rect width="706" height="84" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" />
          <text x="16" y="26" fill="#f3f5ef" font-size="15" font-weight="700">${esc(wrap(q.user, 34))}</text>
          <text x="16" y="48" fill="#9ca79f" font-size="11">${esc(wrap(q.access, 40))}</text>
          <rect x="562" y="20" width="126" height="24" rx="12" fill="rgba(255,255,255,0.04)" />
          <text x="625" y="37" text-anchor="middle" fill="#6fe7ff" font-size="10" font-weight="700">${esc(q.status)}</text>
        </g>`,
    )
    .join("");

  const auditItems = audit
    .map(
      (a, i) => `
        <g transform="translate(0, ${104 + i * 92})">
          <circle cx="6" cy="8" r="5" fill="#c7ff55" />
          <text x="20" y="12" fill="#f3f5ef" font-size="13" font-weight="700">${esc(a.title)}</text>
          <text x="20" y="32" fill="#9ca79f" font-size="11">${esc(a.detail)}</text>
          <text x="20" y="52" fill="#9ca79f" font-size="10">${esc(a.time)}</text>
        </g>`,
    )
    .join("");

  const rulesItems = rules
    .map(
      (r, i) => `
        <g transform="translate(0, ${94 + i * 52})">
          <rect width="382" height="40" rx="12" fill="rgba(255,255,255,0.03)" />
          <text x="14" y="25" fill="#9ca79f" font-size="11">${esc(r)}</text>
        </g>`,
    )
    .join("");

  const roleItems = roles
    .map(
      (r, i) => `
        <g transform="translate(${i < 2 ? 0 : 196}, ${i % 2 === 0 ? 0 : 84})">
          <rect width="178" height="68" rx="16" fill="rgba(255,255,255,0.03)" />
          <rect x="14" y="14" width="8" height="40" rx="4" fill="${r.accent}" />
          <text x="32" y="31" fill="#f3f5ef" font-size="12" font-weight="700">${esc(r.label)}</text>
        </g>`,
    )
    .join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1660" viewBox="0 0 1440 1660">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#050607" />
          <stop offset="100%" stop-color="#0b0e0d" />
        </linearGradient>
        <pattern id="grid" width="88" height="88" patternUnits="userSpaceOnUse">
          <path d="M88 0 L0 0 0 88" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1" />
        </pattern>
      </defs>

      <rect width="1440" height="1660" fill="url(#bg)" />
      <rect width="1440" height="1660" fill="url(#grid)" opacity="0.75" />
      <circle cx="120" cy="120" r="250" fill="rgba(199,255,85,0.12)" />
      <circle cx="1220" cy="170" r="210" fill="rgba(255,184,77,0.11)" />
      <circle cx="1140" cy="1180" r="190" fill="rgba(255,111,143,0.08)" />

      <g transform="translate(34,28)">
        <rect width="1372" height="76" rx="18" fill="rgba(13,16,15,0.82)" stroke="rgba(255,255,255,0.08)" />
        <text x="18" y="32" fill="#f3f5ef" font-size="15" font-weight="700" letter-spacing="2">AEGIS / ACCESS</text>
        <text x="18" y="54" fill="#9ca79f" font-size="12">Security console / Consola de seguridad</text>
        <rect x="1120" y="20" width="220" height="24" rx="12" fill="rgba(255,255,255,0.04)" />
        <text x="1230" y="37" text-anchor="middle" fill="#c7ff55" font-size="10" font-weight="700">Zero trust / Confianza cero</text>
      </g>

      <g transform="translate(34,126)">
        <rect width="770" height="214" rx="28" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="24" y="34" fill="#9ca79f" font-size="11" letter-spacing="2.2">ACCESS DECISIONS / DECISIONES DE ACCESO</text>
        <text x="24" y="88" fill="#f3f5ef" font-size="60" font-weight="700" letter-spacing="-2.5">Access approvals.</text>
        <text x="24" y="126" fill="#9ca79f" font-size="18">English: Access requests, policy checks, and audit evidence in one view.</text>
        <text x="24" y="154" fill="#9ca79f" font-size="18">Español: Solicitudes, políticas y auditoría en una sola vista.</text>
        <rect x="24" y="172" width="174" height="38" rx="19" fill="#c7ff55" />
        <text x="111" y="196" text-anchor="middle" fill="#0a0b08" font-size="13" font-weight="800">Review queue / Revisar</text>
      </g>

      <g transform="translate(842,126)">
        <rect width="564" height="214" rx="28" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="24" y="34" fill="#9ca79f" font-size="11" letter-spacing="2.2">LIVE SIGNALS / SEÑALES EN VIVO</text>
        ${signalTiles}
      </g>

      ${metricCards}

      <g transform="translate(34, 514)">
        <rect width="770" height="944" rx="28" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="24" y="34" fill="#9ca79f" font-size="11" letter-spacing="2.2">QUEUE / COLA</text>
        <text x="24" y="64" fill="#f3f5ef" font-size="28" font-weight="700">Pending access reviews</text>
        ${queueRows}
      </g>

      <g transform="translate(842, 514)">
        <rect width="564" height="456" rx="28" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="24" y="34" fill="#9ca79f" font-size="11" letter-spacing="2.2">AUDIT / AUDITORÍA</text>
        <text x="24" y="64" fill="#f3f5ef" font-size="28" font-weight="700">Immutable activity</text>
        ${auditItems}
      </g>

      <g transform="translate(842, 988)">
        <rect width="564" height="254" rx="28" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="24" y="34" fill="#9ca79f" font-size="11" letter-spacing="2.2">POLICY / POLÍTICA</text>
        <text x="24" y="64" fill="#f3f5ef" font-size="28" font-weight="700">Enforcement rules</text>
        ${rulesItems}
      </g>

      <g transform="translate(34, 1494)">
        <rect width="1372" height="118" rx="28" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="24" y="34" fill="#9ca79f" font-size="11" letter-spacing="2.2">ROLE LATTICE / MATRIZ DE ROLES</text>
        <text x="24" y="64" fill="#f3f5ef" font-size="26" font-weight="700">Who can do what / Quién puede hacer qué</text>
        <g transform="translate(920, 18)">${roleItems}</g>
      </g>
    </svg>`;
}

function mobileSvg() {
  const signalTiles = signals
    .map(
      (s, i) => `
        <g transform="translate(18, ${40 + i * 92})">
          <rect width="354" height="80" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" />
          <text x="12" y="20" fill="#9ca79f" font-size="8" letter-spacing="1.8">${esc(wrap(s.label, 26))}</text>
          <text x="12" y="44" fill="#f3f5ef" font-size="15" font-weight="700">${esc(wrap(s.value, 18))}</text>
          <text x="12" y="64" fill="#9ca79f" font-size="9">${esc(wrap(s.detail, 34))}</text>
        </g>`,
    )
    .join("");

  const metricCards = metrics
    .map(
      (m, i) => {
        const x = i % 2 === 0 ? 18 : 196;
        const y = 690 + Math.floor(i / 2) * 110;
        return `
        <g transform="translate(${x}, ${y})">
          <rect width="176" height="94" rx="16" fill="rgba(15,18,17,0.95)" stroke="rgba(255,255,255,0.08)" />
          <text x="12" y="22" fill="#9ca79f" font-size="8" letter-spacing="1.6">${esc(wrap(m.label, 18))}</text>
          <text x="12" y="58" fill="#f3f5ef" font-size="26" font-weight="700">${esc(m.value)}</text>
          <rect x="12" y="68" width="150" height="16" rx="8" fill="rgba(255,255,255,0.04)" />
          <text x="87" y="79" text-anchor="middle" fill="${m.tone}" font-size="7.5" font-weight="700">${esc(wrap(m.delta, 20))}</text>
        </g>`;
      },
    )
    .join("");

  const queueRows = queue
    .map(
      (q, i) => `
        <g transform="translate(18, ${96 + i * 86})">
          <rect width="354" height="76" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" />
          <text x="12" y="22" fill="#f3f5ef" font-size="12" font-weight="700">${esc(wrap(q.user, 24))}</text>
          <text x="12" y="40" fill="#9ca79f" font-size="9">${esc(wrap(q.access, 28))}</text>
          <rect x="220" y="16" width="116" height="20" rx="10" fill="rgba(255,255,255,0.04)" />
          <text x="278" y="29" text-anchor="middle" fill="#6fe7ff" font-size="8.5" font-weight="700">${esc(wrap(q.status, 18))}</text>
        </g>`,
    )
    .join("");

  const auditItems = audit
    .map(
      (a, i) => `
        <g transform="translate(18, ${88 + i * 72})">
          <circle cx="6" cy="8" r="5" fill="#c7ff55" />
          <text x="20" y="12" fill="#f3f5ef" font-size="11" font-weight="700">${esc(wrap(a.title, 24))}</text>
          <text x="20" y="30" fill="#9ca79f" font-size="9">${esc(wrap(a.detail, 30))}</text>
          <text x="20" y="46" fill="#9ca79f" font-size="9">${esc(a.time)}</text>
        </g>`,
    )
    .join("");

  const rulesItems = rules
    .map(
      (r, i) => `
        <g transform="translate(18, ${88 + i * 40})">
          <rect width="354" height="34" rx="11" fill="rgba(255,255,255,0.03)" />
          <text x="12" y="22" fill="#9ca79f" font-size="9">${esc(wrap(r, 40))}</text>
        </g>`,
    )
    .join("");

  const roleItems = roles
    .map(
      (r, i) => `
        <g transform="translate(${18 + (i % 2) * 182}, ${90 + Math.floor(i / 2) * 64})">
          <rect width="172" height="56" rx="14" fill="rgba(255,255,255,0.03)" />
          <rect x="12" y="10" width="7" height="34" rx="3.5" fill="${r.accent}" />
          <text x="28" y="28" fill="#f3f5ef" font-size="10.5" font-weight="700">${esc(wrap(r.label, 16))}</text>
        </g>`,
    )
    .join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="390" height="2060" viewBox="0 0 390 2060">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#050607" />
          <stop offset="100%" stop-color="#0b0e0d" />
        </linearGradient>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0 L0 0 0 80" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1" />
        </pattern>
      </defs>

      <rect width="390" height="2060" fill="url(#bg)" />
      <rect width="390" height="2060" fill="url(#grid)" opacity="0.75" />
      <circle cx="48" cy="96" r="140" fill="rgba(199,255,85,0.12)" />
      <circle cx="340" cy="160" r="110" fill="rgba(255,184,77,0.11)" />
      <circle cx="318" cy="1840" r="120" fill="rgba(255,111,143,0.08)" />

      <g transform="translate(18,18)">
        <rect width="354" height="70" rx="16" fill="rgba(13,16,15,0.82)" stroke="rgba(255,255,255,0.08)" />
        <text x="14" y="30" fill="#f3f5ef" font-size="14" font-weight="700" letter-spacing="2">AEGIS / ACCESS</text>
        <text x="14" y="50" fill="#9ca79f" font-size="10">Security console / Consola de seguridad</text>
      </g>

      <g transform="translate(18,106)">
        <rect width="354" height="230" rx="24" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="14" y="24" fill="#9ca79f" font-size="9" letter-spacing="2">ACCESS DECISIONS / DECISIONES</text>
        <text x="14" y="70" fill="#f3f5ef" font-size="30" font-weight="700" letter-spacing="-1.5">Access approvals.</text>
        <text x="14" y="102" fill="#9ca79f" font-size="11">English: Access requests, policy checks, and audit evidence.</text>
        <text x="14" y="122" fill="#9ca79f" font-size="11">Español: Solicitudes, políticas y auditoría en una sola vista.</text>
        <rect x="14" y="156" width="138" height="36" rx="18" fill="#c7ff55" />
        <text x="83" y="179" text-anchor="middle" fill="#0a0b08" font-size="12" font-weight="800">Review / Revisar</text>
        <rect x="162" y="156" width="110" height="36" rx="18" fill="rgba(255,255,255,0.04)" />
        <text x="217" y="179" text-anchor="middle" fill="#f3f5ef" font-size="12" font-weight="700">Export / Exportar</text>
      </g>

      <g transform="translate(18,348)">
        <rect width="354" height="316" rx="24" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="14" y="28" fill="#9ca79f" font-size="9" letter-spacing="2">LIVE SIGNALS / SEÑALES</text>
        ${signalTiles}
      </g>

      ${metricCards}

      <g transform="translate(18,936)">
        <rect width="354" height="320" rx="24" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="14" y="28" fill="#9ca79f" font-size="9" letter-spacing="2">QUEUE / COLA</text>
        <text x="14" y="52" fill="#f3f5ef" font-size="24" font-weight="700">Pending access reviews</text>
        ${queueRows}
      </g>

      <g transform="translate(18,1276)">
        <rect width="354" height="300" rx="24" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="14" y="28" fill="#9ca79f" font-size="9" letter-spacing="2">AUDIT / AUDITORÍA</text>
        <text x="14" y="52" fill="#f3f5ef" font-size="24" font-weight="700">Immutable activity</text>
        ${auditItems}
      </g>

      <g transform="translate(18,1596)">
        <rect width="354" height="188" rx="24" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="14" y="28" fill="#9ca79f" font-size="9" letter-spacing="2">POLICY / POLÍTICA</text>
        <text x="14" y="52" fill="#f3f5ef" font-size="24" font-weight="700">Enforcement rules</text>
        ${rulesItems}
      </g>

      <g transform="translate(18,1828)">
        <rect width="354" height="220" rx="24" fill="rgba(15,18,17,0.96)" stroke="rgba(255,255,255,0.08)" />
        <text x="14" y="28" fill="#9ca79f" font-size="9" letter-spacing="2">ROLE LATTICE / ROLES</text>
        <text x="14" y="52" fill="#f3f5ef" font-size="24" font-weight="700">Who can do what</text>
        ${roleItems}
      </g>
    </svg>`;
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await sharp(Buffer.from(desktopSvg())).png().toFile(
    fileURLToPath(new URL("./aegis-access-portal-home-desktop.png", outputDir)),
  );
  await sharp(Buffer.from(mobileSvg())).png().toFile(
    fileURLToPath(new URL("./aegis-access-portal-home-mobile.png", outputDir)),
  );
}

await main();
