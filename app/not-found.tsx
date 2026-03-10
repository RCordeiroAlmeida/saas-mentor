// app/not-found.tsx  (Next.js 13+ App Router)
// or pages/404.tsx   (Pages Router — basta renomear o arquivo)

import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nf-root {
          font-family: 'DM Sans', sans-serif;
          background: #F7F4FA;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          color: #2D1B4E;
          position: relative;
          overflow: hidden;
        }

        /* ── decorative background circles ── */
        .nf-root::before,
        .nf-root::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .nf-root::before {
          width: 520px; height: 520px;
          top: -180px; right: -160px;
          background: radial-gradient(circle, rgba(107,79,160,0.09) 0%, transparent 70%);
        }
        .nf-root::after {
          width: 400px; height: 400px;
          bottom: -140px; left: -120px;
          background: radial-gradient(circle, rgba(120,191,160,0.12) 0%, transparent 70%);
        }

        /* ── card ── */
        .nf-card {
          position: relative;
          z-index: 1;
          background: #fff;
          border-radius: 28px;
          box-shadow: 0 8px 48px rgba(107,79,160,0.11);
          padding: 56px 48px 48px;
          max-width: 520px;
          width: 100%;
          text-align: center;
          animation: nf-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes nf-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── icon ── */
        .nf-icon-wrap {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: #F7F4FA;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
          animation: nf-fade-up 0.6s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .nf-icon-wrap svg {
          width: 32px; height: 32px;
          stroke: #6B4FA0;
          fill: none;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* ── 404 number ── */
        .nf-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem;
          font-weight: 300;
          color: #EDE8F4;
          letter-spacing: 0.06em;
          line-height: 1;
          margin-bottom: 4px;
          animation: nf-fade-up 0.6s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ── divider ── */
        .nf-divider {
          width: 44px; height: 2px;
          background: linear-gradient(90deg, #6B4FA0, #78BFA0);
          border-radius: 2px;
          margin: 0 auto 24px;
          animation: nf-fade-up 0.6s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ── headline ── */
        .nf-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem;
          font-weight: 400;
          color: #2D1B4E;
          line-height: 1.3;
          margin-bottom: 16px;
          animation: nf-fade-up 0.6s 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .nf-headline em {
          font-style: italic;
          color: #6B4FA0;
        }

        /* ── body text ── */
        .nf-body {
          font-size: 0.9rem;
          font-weight: 300;
          color: #7A6890;
          line-height: 1.75;
          margin-bottom: 36px;
          animation: nf-fade-up 0.6s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ── actions ── */
        .nf-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: nf-fade-up 0.6s 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .nf-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #6B4FA0;
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 14px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.22s ease, transform 0.18s ease, box-shadow 0.22s ease;
          box-shadow: 0 4px 18px rgba(107,79,160,0.25);
        }

        .nf-btn-primary:hover {
          background: #5a3f8a;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(107,79,160,0.32);
        }

        .nf-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: #6B4FA0;
          border: 1.5px solid #D5CBE8;
          border-radius: 50px;
          padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.22s ease, background 0.22s ease, transform 0.18s ease;
        }

        .nf-btn-secondary:hover {
          border-color: #6B4FA0;
          background: #F7F4FA;
          transform: translateY(-2px);
        }

        /* ── footer note ── */
        .nf-footer {
          margin-top: 40px;
          font-size: 0.78rem;
          color: #B8A8CC;
          font-weight: 300;
          letter-spacing: 0.02em;
          animation: nf-fade-up 0.6s 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
          z-index: 1;
          position: relative;
        }

        .nf-footer strong {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          color: #9E8BB5;
          font-size: 0.88rem;
        }

        @media (max-width: 480px) {
          .nf-card { padding: 40px 28px 36px; }
          .nf-number { font-size: 4rem; }
          .nf-headline { font-size: 1.5rem; }
        }
      `}</style>

      <main className="nf-root">
        <div className="nf-card">

          {/* Icon */}
          <div className="nf-icon-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <circle cx="12" cy="16" r="0.5" fill="#6B4FA0" stroke="#6B4FA0" strokeWidth="1" />
            </svg>
          </div>

          {/* 404 */}
          <div className="nf-number">404</div>

          {/* Divider */}
          <div className="nf-divider" />

          {/* Headline */}
          <h1 className="nf-headline">
            Página 
            <em> não encontrada</em>
          </h1>

          {/* Body */}
          <p className="nf-body">
            O link que você acessou pode ter expirado,
            o profissional pode ter alterado seu endereço
            ou a página não existe mais.
            <br /><br />
            Se você recebeu este link de alguém, entre em
            contato com o profissional para solicitar um novo.
          </p>

          {/* Actions */}
          <div className="nf-actions">
            <Link href="/" className="nf-btn-primary">
              {/* home icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                <path d="M9 21V12h6v9"/>
              </svg>
              Ir para a página inicial
            </Link>
          </div>

        </div>

        {/* Footer */}
        <p className="nf-footer">
          <strong>Claramente</strong> — Clínica de Psicologia
        </p>
      </main>
    </>
  );
}
