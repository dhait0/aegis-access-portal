import { AuditEntry } from "@/components/audit-entry";
import { Panel } from "@/components/panel";
import { QueueRow } from "@/components/queue-row";
import { SignalTile } from "@/components/signal-tile";
import {
  auditTrail,
  commandSignals,
  policyRules,
  queueItems,
  roleLattice,
  securityMetrics,
} from "@/lib/access-data";

export default function HomePage() {
  return (
    <main className="console-shell">
      <div className="console-shell__backdrop" aria-hidden="true">
        <span className="glow glow--lime" />
        <span className="glow glow--amber" />
        <span className="glow glow--rose" />
        <span className="grid-lines" />
      </div>

      <div className="console-shell__content">
        <header className="topbar">
          <div className="topbar__brand">
            <span className="brand-mark">Aegis</span>
            <span className="brand-copy">Security console / Consola de seguridad</span>
          </div>
          <div className="topbar__status">
            <span className="status-token">Zero trust / Confianza cero</span>
            <span className="status-token status-token--soft">Sync 2m ago / Sync hace 2m</span>
          </div>
        </header>

        <section className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Access decisions / Decisiones de acceso</p>
            <h1>Access approvals without the noise.</h1>
            <p>
              English: This console shows access requests, policy checks, and audit evidence in a
              single operating view.
            </p>
            <p>
              Español: Esta consola muestra solicitudes de acceso, validaciones de política y
              evidencia de auditoría en una sola vista operativa.
            </p>

            <div className="hero-actions">
              <button type="button" className="primary-button">
                Review queue / Revisar cola
              </button>
              <button type="button" className="secondary-button">
                Export log / Exportar log
              </button>
            </div>
          </div>

          <Panel>
            <div className="signal-panel">
              <div className="signal-panel__header">
                <p className="eyebrow">Live signals / Señales en vivo</p>
                <span className="signal-panel__badge">Policy live</span>
              </div>
              <div className="signal-panel__orbit" aria-hidden="true">
                <div />
                <div />
                <div />
              </div>
              <div className="signal-panel__list">
                {commandSignals.map((signal) => (
                  <SignalTile key={signal.label} {...signal} />
                ))}
              </div>
            </div>
          </Panel>
        </section>

        <section className="metric-strip" aria-label="Security metrics">
          {securityMetrics.map((metric) => (
            <article key={metric.label} className={`metric-chip metric-chip--${metric.tone}`}>
              <p>{metric.label}</p>
              <div className="metric-chip__value-row">
                <strong>{metric.value}</strong>
                <span>{metric.delta}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="workspace-grid">
          <div className="workspace-grid__left">
            <Panel>
              <div className="section-head section-head--condensed">
                <div>
                  <p className="eyebrow">Queue / Cola</p>
                  <h2>Pending access reviews</h2>
                </div>
                <p>Current queue / Cola actual</p>
              </div>

              <div className="queue-list">
                {queueItems.map((item) => (
                  <QueueRow key={item.user} {...item} />
                ))}
              </div>
            </Panel>

            <Panel>
              <div className="section-head section-head--condensed">
                <div>
                  <p className="eyebrow">Roles / Roles</p>
                  <h2>Role lattice</h2>
                </div>
                <p>Scope by persona / Alcance por perfil</p>
              </div>

              <div className="role-lattice">
                {roleLattice.map((role) => (
                  <article key={role.name} className={`role-lattice__card role-lattice__card--${role.accent}`}>
                    <h3>{role.name}</h3>
                    <p>{role.scope}</p>
                  </article>
                ))}
              </div>
            </Panel>
          </div>

          <aside className="workspace-grid__right">
            <Panel>
              <div className="section-head section-head--condensed">
                <div>
                  <p className="eyebrow">Audit / Auditoría</p>
                  <h2>Immutable activity</h2>
                </div>
                <p>Who changed what / Quién cambió qué</p>
              </div>

              <ul className="audit-list">
                {auditTrail.map((entry) => (
                  <AuditEntry key={entry.title} {...entry} />
                ))}
              </ul>
            </Panel>

            <Panel>
              <div className="section-head section-head--condensed">
                <div>
                  <p className="eyebrow">Policy / Política</p>
                  <h2>Enforcement rules</h2>
                </div>
                <p>Guardrails / Guardarraíles</p>
              </div>

              <div className="policy-stack">
                {policyRules.map((rule) => (
                  <article key={rule.title} className="policy-card">
                    <h3>{rule.title}</h3>
                    <p>{rule.note}</p>
                  </article>
                ))}
              </div>
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  );
}
