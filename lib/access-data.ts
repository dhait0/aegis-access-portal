export const securityMetrics = [
  {
    label: "MFA coverage / Cobertura MFA",
    value: "96%",
    delta: "+4 points / +4 puntos",
    tone: "amber" as const,
  },
  {
    label: "Guest reviews / Revisiones guest",
    value: "7",
    delta: "2 waiting / 2 en espera",
    tone: "emerald" as const,
  },
  {
    label: "Break-glass sessions / Sesiones de emergencia",
    value: "2",
    delta: "Reviewed / Revisadas",
    tone: "rose" as const,
  },
  {
    label: "Audit lag / Retardo de auditoría",
    value: "2m",
    delta: "Within target / En objetivo",
    tone: "sky" as const,
  },
];

export const commandSignals = [
  {
    label: "Identity trust / Confianza de identidad",
    value: "High / Alta",
    detail: "Device posture and MFA checks are green.",
  },
  {
    label: "Contractor access / Acceso de contratistas",
    value: "Watch / Vigilar",
    detail: "Two accounts expire this afternoon.",
  },
  {
    label: "Incident bridge / Puente de incidente",
    value: "Ready / Listo",
    detail: "Break-glass paths are pre-approved.",
  },
];

export const queueItems = [
  {
    user: "Maya Chen / Maya Chen",
    access: "Vendor VPN / VPN de proveedor",
    reason: "Quarterly support window / Ventana de soporte trimestral",
    status: "Pending / Pendiente",
  },
  {
    user: "Diego Alvarez / Diego Alvarez",
    access: "Finance export / Exportación finanzas",
    reason: "Temporary analyst cover / Cobertura temporal",
    status: "Approved / Aprobado",
  },
  {
    user: "Sofia Patel / Sofia Patel",
    access: "Security console / Consola de seguridad",
    reason: "Step-up review / Revisión reforzada",
    status: "Review / Revisión",
  },
];

export const auditTrail = [
  {
    title: "Access granted / Acceso aprobado",
    detail: "Vendor VPN -> Maya Chen",
    time: "3m ago / hace 3 min",
  },
  {
    title: "Policy tightened / Política reforzada",
    detail: "MFA now required for exports",
    time: "18m ago / hace 18 min",
  },
  {
    title: "Session expired / Sesión expirada",
    detail: "Temporary analyst cover closed",
    time: "1h ago / hace 1 h",
  },
  {
    title: "Directory sync / Sincronización",
    detail: "No drift detected in the last refresh",
    time: "Today / Hoy",
  },
];

export const policyRules = [
  {
    title: "MFA for privileged roles / MFA para roles privilegiados",
    note: "Always enforced / Siempre aplicada",
  },
  {
    title: "Temporary access expiry / Expiración temporal",
    note: "Automatic / Automática",
  },
  {
    title: "Approval traceability / Trazabilidad de aprobaciones",
    note: "Logged with user ID / Registrada con ID",
  },
];

export const roleLattice = [
  {
    name: "Owner / Propietario",
    scope: "Platform-wide control / Control total",
    accent: "amber" as const,
  },
  {
    name: "Admin / Administrador",
    scope: "Users, policies, exports / Usuarios, políticas, exportaciones",
    accent: "emerald" as const,
  },
  {
    name: "Analyst / Analista",
    scope: "Read data, export reports / Leer datos y exportar",
    accent: "sky" as const,
  },
  {
    name: "Viewer / Lector",
    scope: "Read only / Solo lectura",
    accent: "rose" as const,
  },
];
