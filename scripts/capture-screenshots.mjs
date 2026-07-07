import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const outputDir = new URL("../public/screenshots/", import.meta.url);

const stats = [
  { label: "Open requests / Solicitudes abiertas", value: "24", delta: "+6 today / +6 hoy", tone: "#f59e0b" },
  { label: "Approved roles / Roles aprobados", value: "18", delta: "+2 this week / +2 esta semana", tone: "#34d399" },
  { label: "Policy exceptions / Excepciones", value: "3", delta: "1 needs review / 1 en revisión", tone: "#fb7185" },
  { label: "Sync freshness / Actualización", value: "5m", delta: "Directory healthy / Directorio sano", tone: "#22d3ee" },
];

const requests = [
  {
    user: "Maya Chen / Maya Chen",
    team: "Finance Operations / Operaciones de finanzas",
    role: "Approver / Aprobador",
    status: "Pending / Pendiente",
    note: "Requires manager approval. / Requiere aprobación del manager.",
  },
  {
    user: "Diego Alvarez / Diego Alvarez",
    team: "Customer Success / Éxito del cliente",
    role: "Read-only / Solo lectura",
    status: "Approved / Aprobado",
    note: "Temporary access until Friday. / Acceso temporal hasta el viernes.",
  },
];

const roles = [
  { name: "Owner / Propietario", scope: "Full control / Control total", accent: "#f59e0b" },
  { name: "Admin / Administrador", scope: "User and policy management / Gestión de usuarios y políticas", accent: "#34d399" },
  { name: "Analyst / Analista", scope: "Reports and exports / Reportes y exportaciones", accent: "#22d3ee" },
  { name: "Viewer / Lector", scope: "Read-only access / Solo lectura", accent: "#fb7185" },
];

const auditTrail = [
  { title: "Access granted / Acceso aprobado", detail: "Finance Operations -> Approver", time: "3m ago / hace 3 min" },
  { title: "Policy rule updated / Regla actualizada", detail: "Admin scope now requires MFA", time: "18m ago / hace 18 min" },
  { title: "Sync completed / Sincronización completada", detail: "Directory refresh finished with no drift", time: "Today / Hoy" },
];

const policyChecks = [
  "MFA required for elevated roles / MFA obligatorio para roles elevados",
  "Temporary access expires automatically / Acceso temporal expira solo",
  "Approval chain recorded in audit log / Cadena de aprobación en auditoría",
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function pageSvg(width, height, mobile = false) {
  const statCards = stats
    .map((item, index) => {
      const x = mobile ? 20 + (index % 2) * 174 : 20 + index * 292;
      const y = mobile ? 390 + Math.floor(index / 2) * 136 : 356;
      return `
        <g transform="translate(${x}, ${y})">
          <rect width="${mobile ? 156 : 274}" height="118" rx="18" fill="rgba(17,26,38,0.95)" stroke="rgba(255,255,255,0.1)" />
          <text x="16" y="30" fill="#9fb0c7" font-size="10" letter-spacing="2">${esc(item.label)}</text>
          <text x="16" y="72" fill="#eef3fb" font-size="${mobile ? 28 : 34}" font-weight="700">${esc(item.value)}</text>
          <rect x="${mobile ? 88 : 196}" y="50" width="62" height="24" rx="12" fill="rgba(255,255,255,0.05)" />
          <text x="${mobile ? 119 : 227}" y="66" text-anchor="middle" fill="${item.tone}" font-size="10" font-weight="700">${esc(item.delta)}</text>
        </g>`;
    })
    .join("");

  const requestCards = requests
    .map((item, index) => {
      const y = mobile ? 1260 + index * 120 : 560 + index * 126;
      return `
        <g transform="translate(${mobile ? 20 : 20}, ${y})">
          <rect width="${mobile ? 350 : 740}" height="108" rx="18" fill="rgba(17,26,38,0.95)" stroke="rgba(255,255,255,0.1)" />
          <text x="16" y="28" fill="#eef3fb" font-size="13" font-weight="700">${esc(item.user)}</text>
          <text x="16" y="48" fill="#9fb0c7" font-size="11">${esc(item.team)}</text>
          <text x="16" y="78" fill="#eef3fb" font-size="11">${esc(item.role)}</text>
          <text x="${mobile ? 250 : 620}" y="28" fill="#22d3ee" font-size="10" font-weight="700">${esc(item.status)}</text>
          <text x="${mobile ? 250 : 620}" y="78" fill="#9fb0c7" font-size="11">${esc(item.note)}</text>
        </g>`;
    })
    .join("");

  const roleCards = roles
    .map((item, index) => {
      const x = mobile ? 20 : 20 + (index % 2) * 358;
      const y = mobile ? 1488 + index * 104 : 820 + Math.floor(index / 2) * 108;
      return `
        <g transform="translate(${x}, ${y})">
          <rect width="${mobile ? 350 : 340}" height="92" rx="18" fill="rgba(17,26,38,0.95)" stroke="rgba(255,255,255,0.1)" />
          <rect x="16" y="18" width="10" height="56" rx="5" fill="${item.accent}" />
          <text x="36" y="35" fill="#eef3fb" font-size="13" font-weight="700">${esc(item.name)}</text>
          <text x="36" y="60" fill="#9fb0c7" font-size="11">${esc(item.scope)}</text>
        </g>`;
    })
    .join("");

  const auditItems = auditTrail
    .map((item, index) => {
      const y = mobile ? 1840 + index * 84 : 560 + index * 88;
      return `
        <g transform="translate(${mobile ? 20 : 800}, ${y})">
          <circle cx="6" cy="8" r="5" fill="#f59e0b" />
          <text x="20" y="12" fill="#eef3fb" font-size="12" font-weight="700">${esc(item.title)}</text>
          <text x="20" y="32" fill="#9fb0c7" font-size="10">${esc(item.detail)}</text>
          <text x="20" y="50" fill="#9fb0c7" font-size="10">${esc(item.time)}</text>
        </g>`;
    })
    .join("");

  const policyItems = policyChecks
    .map((item, index) => {
      const y = mobile ? 2104 + index * 48 : 840 + index * 52;
      return `
        <g transform="translate(${mobile ? 20 : 800}, ${y})">
          <rect width="${mobile ? 350 : 360}" height="40" rx="12" fill="rgba(255,255,255,0.04)" />
          <text x="16" y="25" fill="#9fb0c7" font-size="10">${esc(item)}</text>
        </g>`;
    })
    .join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#081018" />
          <stop offset="100%" stop-color="#0b1420" />
        </linearGradient>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(34,211,238,0.16)" />
          <stop offset="100%" stop-color="rgba(245,158,11,0.12)" />
        </linearGradient>
        <pattern id="grid" width="96" height="96" patternUnits="userSpaceOnUse">
          <path d="M96 0 L0 0 0 96" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        </pattern>
      </defs>

      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <rect width="${width}" height="${height}" fill="url(#grid)" opacity="0.55" />
      <circle cx="${mobile ? 40 : 120}" cy="90" r="${mobile ? 150 : 220}" fill="rgba(245,158,11,0.14)" />
      <circle cx="${mobile ? 340 : 1180}" cy="140" r="${mobile ? 110 : 180}" fill="rgba(34,211,238,0.14)" />
      <circle cx="${mobile ? 280 : 980}" cy="${mobile ? 2200 : 980}" r="${mobile ? 100 : 180}" fill="rgba(251,113,133,0.1)" />

      <g transform="translate(${mobile ? 20 : 48}, ${mobile ? 24 : 36})">
        <rect width="${mobile ? 350 : 1144}" height="${mobile ? 330 : 260}" rx="28" fill="url(#heroGrad)" stroke="rgba(255,255,255,0.1)" />
        <text x="24" y="38" fill="#9fb0c7" font-size="12" letter-spacing="3">AEGIS / ACCESS</text>
        <text x="24" y="${mobile ? 90 : 110}" fill="#eef3fb" font-size="${mobile ? 30 : 56}" font-weight="700" letter-spacing="-2">Access approvals.</text>
        <text x="24" y="${mobile ? 144 : 156}" fill="#9fb0c7" font-size="${mobile ? 13 : 20}">English: Review who can enter, who approved it, and how every change was recorded.</text>
        <text x="24" y="${mobile ? 172 : 188}" fill="#9fb0c7" font-size="${mobile ? 13 : 20}">Español: Revisa quién tiene acceso, quién aprobó y cómo quedó registrado cada cambio.</text>
        <rect x="24" y="${mobile ? 220 : 206}" width="${mobile ? 142 : 176}" height="44" rx="22" fill="#f59e0b" />
        <text x="${mobile ? 95 : 112}" y="${mobile ? 248 : 234}" text-anchor="middle" fill="#081018" font-size="14" font-weight="800">Review / Revisar</text>
        <rect x="${mobile ? 176 : 214}" y="${mobile ? 220 : 206}" width="${mobile ? 148 : 180}" height="44" rx="22" fill="rgba(255,255,255,0.04)" />
        <text x="${mobile ? 250 : 304}" y="${mobile ? 248 : 234}" text-anchor="middle" fill="#eef3fb" font-size="14" font-weight="700">Export / Exportar</text>
      </g>

      ${statCards}

      <g transform="translate(${mobile ? 20 : 48}, ${mobile ? 534 : 500})">
        <rect width="${mobile ? 350 : 1144}" height="${mobile ? 720 : 620}" rx="26" fill="rgba(17,26,38,0.94)" stroke="rgba(255,255,255,0.1)" />
        <text x="24" y="36" fill="#9fb0c7" font-size="11" letter-spacing="2.5">REQUESTS / SOLICITUDES</text>
        <text x="24" y="66" fill="#eef3fb" font-size="24" font-weight="700">Pending access approvals</text>
        <text x="${mobile ? 24 : 806}" y="66" fill="#9fb0c7" font-size="14">${mobile ? "Queue and notes / Cola y notas" : "Audit / Auditoría"}</text>
      </g>

      ${requestCards}

      <g transform="translate(${mobile ? 20 : 48}, ${mobile ? 1268 : 792})">
        <rect width="${mobile ? 350 : 740}" height="${mobile ? 300 : 220}" rx="26" fill="rgba(17,26,38,0.94)" stroke="rgba(255,255,255,0.1)" />
        <text x="24" y="34" fill="#9fb0c7" font-size="11" letter-spacing="2.5">ROLES / ROLES</text>
        <text x="24" y="64" fill="#eef3fb" font-size="24" font-weight="700">Permission matrix</text>
      </g>

      ${roleCards}

      <g transform="translate(${mobile ? 20 : 800}, ${mobile ? 1768 : 500})">
        <rect width="${mobile ? 350 : 392}" height="${mobile ? 374 : 430}" rx="26" fill="rgba(17,26,38,0.94)" stroke="rgba(255,255,255,0.1)" />
        <text x="24" y="34" fill="#9fb0c7" font-size="11" letter-spacing="2.5">AUDIT / AUDITORÍA</text>
        <text x="24" y="64" fill="#eef3fb" font-size="24" font-weight="700">Change log</text>
      </g>

      ${auditItems}

      <g transform="translate(${mobile ? 20 : 800}, ${mobile ? 2140 : 956})">
        <rect width="${mobile ? 350 : 392}" height="${mobile ? 164 : 178}" rx="26" fill="rgba(17,26,38,0.94)" stroke="rgba(255,255,255,0.1)" />
        <text x="24" y="34" fill="#9fb0c7" font-size="11" letter-spacing="2.5">POLICY / POLÍTICA</text>
        <text x="24" y="64" fill="#eef3fb" font-size="24" font-weight="700">Enforcement checks</text>
      </g>

      ${policyItems}
    </svg>`;
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await sharp(Buffer.from(pageSvg(1440, 1420, false))).png().toFile(
    fileURLToPath(new URL("./aegis-access-portal-home-desktop.png", outputDir)),
  );
  await sharp(Buffer.from(pageSvg(390, 2320, true))).png().toFile(
    fileURLToPath(new URL("./aegis-access-portal-home-mobile.png", outputDir)),
  );
}

await main();
