import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Nexus Labs AI Systems coleta, usa e protege dados pessoais em nexus-lab.pro, em conformidade com a LGPD (Lei nº 13.709/2018).",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const TOC = [
  { id: "quem-somos", num: "01", label: "Quem somos" },
  { id: "dados-coletados", num: "02", label: "Dados que coletamos" },
  { id: "por-que-usamos", num: "03", label: "Por que usamos" },
  { id: "compartilhamento", num: "04", label: "Com quem compartilhamos" },
  { id: "retencao", num: "05", label: "Por quanto tempo guardamos" },
  { id: "cookies", num: "06", label: "Cookies" },
  { id: "seguranca", num: "07", label: "Segurança" },
  { id: "direitos", num: "08", label: "Seus direitos" },
  { id: "transferencia", num: "09", label: "Transferência internacional" },
  { id: "menores", num: "10", label: "Menores de idade" },
  { id: "mudancas", num: "11", label: "Mudanças nesta política" },
  { id: "contato", num: "12", label: "Fale com a gente" },
] as const;

const RIGHTS = [
  { title: "Confirmação e acesso", desc: "Saber se tratamos seus dados e quais são eles" },
  { title: "Correção", desc: "Pedir a atualização de dados incompletos ou desatualizados" },
  {
    title: "Anonimização, bloqueio ou eliminação",
    desc: "Solicitar a remoção de dados desnecessários ou tratados fora da lei",
  },
  { title: "Portabilidade", desc: "Pedir a transferência dos seus dados a outro fornecedor" },
  { title: "Revogação do consentimento", desc: "Retirar autorizações dadas anteriormente" },
  { title: "Oposição", desc: "Se opor a um tratamento feito com base em legítimo interesse" },
  { title: "Informação sobre compartilhamento", desc: "Saber com quem compartilhamos seus dados" },
] as const;

const PURPOSES = [
  {
    purpose: "Responder sua mensagem ou pedido de contato",
    basis: "Execução de procedimentos preliminares a contrato, a seu pedido",
  },
  {
    purpose: "Apresentar e negociar nossos serviços",
    basis: "Legítimo interesse do controlador",
  },
  {
    purpose: "Manter o histórico da conversa no WhatsApp para dar continuidade ao atendimento",
    basis: "Legítimo interesse do controlador",
  },
  {
    purpose: "Cumprir obrigação legal ou regulatória, quando aplicável",
    basis: "Cumprimento de obrigação legal",
  },
] as const;

function SectionHeading({ num, id, children }: { num: string; id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="accent-line mb-5 scroll-mt-28 pb-3 font-display text-2xl font-bold tracking-tight text-text sm:text-[28px]">
      <span className="mr-3 font-mono text-base font-normal text-text-muted">{num}</span>
      {children}
    </h2>
  );
}

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="bg-bg pb-32 pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Masthead */}
        <header className="border-b border-border pb-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
            nexus-lab.pro · v1.0 · vigente desde 09/07/2026
          </p>
          <h1 className="mb-6 text-balance font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Política de Privacidade
          </h1>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-4 rounded-lg border border-border bg-surface p-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">Controlador</dt>
              <dd className="mt-1 font-body text-text-secondary">
                44.393.495 LUCIANO FERRO TAQUETE
                <span className="block text-text-muted">opera sob a marca Nexus Labs AI Systems</span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">CNPJ</dt>
              <dd className="mt-1 font-body text-text-secondary">44.393.495/0001-31</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">Domicílio</dt>
              <dd className="mt-1 font-body text-text-secondary">Loanda/PR — CEP 87900-000</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">Contato de privacidade</dt>
              <dd className="mt-1 font-body">
                <a href="mailto:taquetedigital@gmail.com" className="text-accent hover:underline">
                  taquetedigital@gmail.com
                </a>
              </dd>
            </div>
          </dl>
        </header>

        <div className="grid grid-cols-1 gap-14 pt-12 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* TOC */}
          <nav aria-label="Sumário" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                Nesta política
              </p>
              <ol className="flex flex-col gap-2 border-l border-border">
                {TOC.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px block border-l-2 border-transparent py-0.5 pl-4 font-body text-sm text-text-secondary transition-colors duration-200 hover:border-accent hover:text-text"
                    >
                      <span className="mr-2 font-mono text-text-muted">{item.num}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* Article */}
          <article className="max-w-[68ch]">
            <p className="mb-2 text-balance font-display text-xl font-semibold leading-snug text-text">
              A Nexus Labs existe para tirar peso de cima de negócios locais que não têm tempo nem time
              técnico — não pra acumular dados de quem confia na gente.
            </p>
            <p className="mb-12 border-b border-border pb-10 font-body text-sm leading-relaxed text-text-secondary">
              Esta política explica o que acontece com os dados de quem visita{" "}
              <code className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-text">
                nexus-lab.pro
              </code>{" "}
              ou fala com a gente pelo WhatsApp. Ela segue a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018 — LGPD).
            </p>

            <section className="mb-12">
              <SectionHeading num="01" id="quem-somos">
                Quem somos
              </SectionHeading>
              <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
                <strong className="text-text">Nexus Labs AI Systems</strong> é a marca sob a qual{" "}
                <strong className="text-text">44.393.495 LUCIANO FERRO TAQUETE</strong> (CNPJ
                44.393.495/0001-31), com domicílio em Loanda/PR, presta serviços de desenvolvimento de
                software e automação de processos — em especial atendimento e automação via WhatsApp —
                para pequenos negócios e instituições locais.
              </p>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                Para efeitos desta política, somos o <strong className="text-text">controlador</strong>{" "}
                dos dados pessoais tratados através do site{" "}
                <code className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-text">
                  nexus-lab.pro
                </code>{" "}
                e do número de WhatsApp oficial da Nexus Labs.
              </p>
            </section>

            <section className="mb-12">
              <SectionHeading num="02" id="dados-coletados">
                Dados que coletamos
              </SectionHeading>
              <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
                Coletamos apenas o que é necessário pra responder quem entra em contato. Hoje, isso
                acontece de duas formas:
              </p>
              <ul className="mb-4 flex flex-col gap-3">
                <li className="flex gap-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                  <span>
                    <strong className="text-text">Formulário de contato do site:</strong> nome, e-mail,
                    telefone e o conteúdo da mensagem que você escreve.
                  </span>
                </li>
                <li className="flex gap-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                  <span>
                    <strong className="text-text">WhatsApp:</strong> quando você clica no botão do site e
                    nos chama, recebemos seu número de telefone, nome de exibição do WhatsApp e o
                    conteúdo da conversa.
                  </span>
                </li>
              </ul>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                O site <code className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-text">nexus-lab.pro</code> não usa cookies, pixels de rastreamento ou ferramentas de
                analytics — não medimos nem cruzamos seu comportamento de navegação. Também não temos
                lista de e-mail ou newsletter.
              </p>
            </section>

            <section className="mb-12">
              <SectionHeading num="03" id="por-que-usamos">
                Por que usamos seus dados
              </SectionHeading>
              <div className="mb-4 overflow-x-auto rounded-lg border border-border">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-widest text-text-muted">
                        Finalidade
                      </th>
                      <th className="px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-widest text-text-muted">
                        Base legal (LGPD art. 7º)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PURPOSES.map((row) => (
                      <tr key={row.purpose} className="border-b border-border-subtle last:border-0">
                        <td className="px-4 py-3 align-top font-body text-text-secondary">{row.purpose}</td>
                        <td className="px-4 py-3 align-top font-body text-text-secondary">{row.basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                Não usamos seus dados para decisões automatizadas que produzam efeitos jurídicos sobre
                você, nem os vendemos a terceiros.
              </p>
            </section>

            <section className="mb-12">
              <SectionHeading num="04" id="compartilhamento">
                Com quem compartilhamos
              </SectionHeading>
              <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
                Não compartilhamos seus dados para fins comerciais de terceiros. Compartilhamos apenas
                com quem precisa processar a informação pra que o serviço funcione:
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                  <span>
                    <strong className="text-text">Meta / WhatsApp Business Platform</strong> — toda
                    conversa por WhatsApp passa pela infraestrutura da Meta, sob a{" "}
                    <a
                      href="https://www.whatsapp.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      política de privacidade do WhatsApp
                    </a>
                    .
                  </span>
                </li>
                <li className="flex gap-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                  <span>
                    <strong className="text-text">Provedores de hospedagem, e-mail e infraestrutura</strong>{" "}
                    que operam os bastidores do site e dos nossos sistemas, sempre como operadores agindo
                    em nosso nome, nunca como donos dos dados.
                  </span>
                </li>
                <li className="flex gap-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                  <span>
                    <strong className="text-text">Autoridades públicas</strong>, somente quando exigido
                    por lei, ordem judicial ou requisição de autoridade competente.
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <SectionHeading num="05" id="retencao">
                Por quanto tempo guardamos
              </SectionHeading>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                Guardamos os dados de contato e o histórico de conversa enquanto durar o relacionamento
                comercial ou pelo tempo necessário para a finalidade que motivou a coleta — o que for
                maior. Depois disso, eliminamos ou anonimizamos a informação, exceto quando a lei exigir
                prazo diferente de guarda (por exemplo, obrigações fiscais).
              </p>
            </section>

            <section className="mb-12">
              <SectionHeading num="06" id="cookies">
                Cookies
              </SectionHeading>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                Hoje{" "}
                <code className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-text">
                  nexus-lab.pro
                </code>{" "}
                não instala cookies de rastreamento, analytics ou publicidade no seu navegador. Se isso
                mudar — por exemplo, ao adicionarmos uma ferramenta de métricas — vamos atualizar esta
                seção antes de ativar qualquer coleta.
              </p>
            </section>

            <section className="mb-12">
              <SectionHeading num="07" id="seguranca">
                Segurança
              </SectionHeading>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                Adotamos medidas técnicas e administrativas razoáveis para proteger seus dados contra
                acesso não autorizado, perda, alteração ou vazamento — incluindo controle de acesso e uso
                de provedores com práticas de segurança reconhecidas. Nenhum sistema é 100% infalível; se
                identificarmos um incidente que possa afetar você, avisaremos conforme exige a LGPD.
              </p>
            </section>

            <section className="mb-12">
              <SectionHeading num="08" id="direitos">
                Seus direitos
              </SectionHeading>
              <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
                Como titular dos dados, o artigo 18 da LGPD garante que você pode, a qualquer momento:
              </p>
              <div className="mb-4 overflow-x-auto rounded-lg border border-border">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {RIGHTS.map((r) => (
                      <tr key={r.title} className="border-b border-border-subtle last:border-0">
                        <td className="w-56 px-4 py-3 align-top font-body font-medium text-text">
                          {r.title}
                        </td>
                        <td className="px-4 py-3 align-top font-body text-text-secondary">{r.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                Pra exercer qualquer um desses direitos, é só escrever pra gente — contato na seção 12.
                Respondemos em até 15 dias.
              </p>
            </section>

            <section className="mb-12">
              <SectionHeading num="09" id="transferencia">
                Transferência internacional
              </SectionHeading>
              <div className="rounded-lg border border-border border-l-2 border-l-accent bg-surface p-5 font-body text-[15px] leading-relaxed text-text-secondary">
                Como usamos o WhatsApp Business Platform, seus dados podem ser processados em servidores
                da Meta fora do Brasil. Isso é inerente ao funcionamento do próprio WhatsApp e segue as
                garantias contratuais e de segurança da própria Meta.
              </div>
            </section>

            <section className="mb-12">
              <SectionHeading num="10" id="menores">
                Menores de idade
              </SectionHeading>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                Nossos serviços são voltados a donos e responsáveis por negócios e instituições, não a
                crianças ou adolescentes. Não coletamos intencionalmente dados de menores de 18 anos.
              </p>
            </section>

            <section className="mb-12">
              <SectionHeading num="11" id="mudancas">
                Mudanças nesta política
              </SectionHeading>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                Podemos atualizar este documento conforme o serviço evolui — por exemplo, ao adicionarmos
                novas ferramentas ao site. A data de &ldquo;vigente desde&rdquo;, no topo da página,
                sempre mostra a versão mais recente. Mudanças relevantes serão comunicadas de forma
                visível no site.
              </p>
            </section>

            <section>
              <SectionHeading num="12" id="contato">
                Fale com a gente
              </SectionHeading>
              <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
                Dúvidas sobre esta política ou sobre como tratamos seus dados podem ir direto pro nosso
                contato de privacidade:
              </p>
              <div className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-6">
                <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  Encarregado de proteção de dados (contato)
                </span>
                <span className="font-display text-lg font-semibold text-text">Taquete — Nexus Labs</span>
                <a
                  href="mailto:taquetedigital@gmail.com"
                  className="font-body text-accent hover:underline"
                >
                  taquetedigital@gmail.com
                </a>
              </div>
            </section>
          </article>
        </div>

        <footer className="mt-20 flex flex-col justify-between gap-2 border-t border-border pt-6 font-mono text-xs text-text-muted sm:flex-row">
          <span>Nexus Labs AI Systems — CNPJ 44.393.495/0001-31</span>
          <span>Documento regido pela Lei nº 13.709/2018 (LGPD)</span>
        </footer>
      </div>
    </main>
  );
}
