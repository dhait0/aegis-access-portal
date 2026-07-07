import { Panel } from "@/components/panel";
import { StatCard } from "@/components/stat-card";
import { Timeline } from "@/components/timeline";
import { auditTrail, policyChecks, requests, roles, stats } from "@/lib/access-data";

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="page-shell__wash" aria-hidden="true">
        <span className="wash wash--amber" />
        <span className="wash wash--cyan" />
        <span className="wash wash--coral" />
        <span className="grid-overlay" />
      </div>

      <div className="page-shell__content">
        <header className="hero">
          <div className="hero__topline">
            <span className="brand-mark">Aegis / Access</span>
            <span className="status-pill">Live policy / Política activa</span>
          </div>

          <div className="hero__grid">
            <div className="hero__copy">
              <p className="eyebrow">Access control / Control de acceso</p>
              <h1>Access approvals.</h1>
              <p>
                English: Review who can enter, who approved it, and how every change was recorded.
              </p>
              <p>
                Español: Revisa quién tiene acceso, quién aprobó y cómo quedó registrado cada
                cambio.
              </p>
            </div>

            <Panel>
              <div className="hero-card">
                <p className="eyebrow">Directory sync / Sincronización</p>
                <h2>Healthy / Saludable</h2>
                <p>5 minutes ago / hace 5 minutos</p>
                <div className="hero-card__bars">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </Panel>
          </div>

          <div className="hero__actions">
            <button type="button" className="primary-button">
              Review access / Revisar acceso
            </button>
            <button type="button" className="secondary-button">
              Export audit / Exportar auditoría
            </button>
          </div>
        </header>

        <section className="stats-grid" aria-label="Portal metrics">
          {stats.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </section>

        <section className="workspace">
          <div className="workspace__main">
            <Panel>
              <div className="section-head">
                <div>
                  <p className="eyebrow">Requests / Solicitudes</p>
                  <h2>Pending access approvals</h2>
                </div>
                <p>Queue and notes / Cola y notas</p>
              </div>

              <div className="request-list">
                {requests.map((request) => (
                  <article key={request.user} className="request-card">
                    <div className="request-card__title">
                      <div>
                        <h3>{request.user}</h3>
                        <p>{request.team}</p>
                      </div>
                      <span className="request-status">{request.status}</span>
                    </div>
                    <div className="request-card__meta">
                      <span>{request.role}</span>
                      <span>{request.note}</span>
                    </div>
                  </article>
                ))}
              </div>
            </Panel>

            <Panel>
              <div className="section-head">
                <div>
                  <p className="eyebrow">Roles / Roles</p>
                  <h2>Permission matrix</h2>
                </div>
                <p>Scope by role / Alcance por rol</p>
              </div>

              <div className="role-grid">
                {roles.map((role) => (
                  <article key={role.name} className={`role-card role-card--${role.accent}`}>
                    <h3>{role.name}</h3>
                    <p>{role.scope}</p>
                  </article>
                ))}
              </div>
            </Panel>
          </div>

          <aside className="workspace__side">
            <Panel>
              <div className="section-head">
                <div>
                  <p className="eyebrow">Audit / Auditoría</p>
                  <h2>Change log</h2>
                </div>
                <p>Who changed what / Quién cambió qué</p>
              </div>

              <ul className="timeline">
                {auditTrail.map((entry) => (
                  <Timeline key={entry.title} {...entry} />
                ))}
              </ul>
            </Panel>

            <Panel>
              <div className="section-head">
                <div>
                  <p className="eyebrow">Policy / Política</p>
                  <h2>Enforcement checks</h2>
                </div>
                <p>Guardrails / Controles</p>
              </div>

              <ul className="policy-list">
                {policyChecks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  );
}
