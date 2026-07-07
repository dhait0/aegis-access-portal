export const stats = [
  {
    label: "Open requests / Solicitudes abiertas",
    value: "24",
    delta: "+6 today / +6 hoy",
    tone: "amber" as const,
  },
  {
    label: "Approved roles / Roles aprobados",
    value: "18",
    delta: "+2 this week / +2 esta semana",
    tone: "emerald" as const,
  },
  {
    label: "Policy exceptions / Excepciones",
    value: "3",
    delta: "1 needs review / 1 en revisión",
    tone: "rose" as const,
  },
  {
    label: "Sync freshness / Actualización",
    value: "5m",
    delta: "Directory healthy / Directorio sano",
    tone: "sky" as const,
  },
];

export const requests = [
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
  {
    user: "Sofia Patel / Sofia Patel",
    team: "Security / Seguridad",
    role: "Admin / Administrador",
    status: "Review / Revisión",
    note: "Step-up verification is active. / Verificación reforzada activa.",
  },
];

export const roles = [
  {
    name: "Owner / Propietario",
    scope: "Full control / Control total",
    accent: "amber" as const,
  },
  {
    name: "Admin / Administrador",
    scope: "User and policy management / Gestión de usuarios y políticas",
    accent: "emerald" as const,
  },
  {
    name: "Analyst / Analista",
    scope: "Reports and exports / Reportes y exportaciones",
    accent: "sky" as const,
  },
  {
    name: "Viewer / Lector",
    scope: "Read-only access / Solo lectura",
    accent: "rose" as const,
  },
];

export const auditTrail = [
  {
    title: "Access granted / Acceso aprobado",
    detail: "Finance Operations -> Approver",
    time: "3m ago / hace 3 min",
  },
  {
    title: "Policy rule updated / Regla actualizada",
    detail: "Admin scope now requires MFA",
    time: "18m ago / hace 18 min",
  },
  {
    title: "Temporary access expired / Acceso temporal expirado",
    detail: "Marketing contractor removed automatically",
    time: "1h ago / hace 1 h",
  },
  {
    title: "Sync completed / Sincronización completada",
    detail: "Directory refresh finished with no drift",
    time: "Today / Hoy",
  },
];

export const policyChecks = [
  "MFA required for elevated roles / MFA obligatorio para roles elevados",
  "Temporary access expires automatically / Acceso temporal expira solo",
  "Approval chain recorded in audit log / Cadena de aprobación en auditoría",
];
