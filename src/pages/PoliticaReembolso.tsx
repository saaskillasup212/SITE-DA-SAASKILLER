import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import footerLogoGold from "@/assets/footer-logo-gold.png";
import Footer from "@/components/Footer";

const PoliticaReembolso = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={footerLogoGold} 
                alt="SaaSKiller Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-white text-lg font-medium">SaaSKiller</span>
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold-hot)] to-[color:var(--gold)] bg-clip-text text-transparent">
          Política de Reembolso
        </h1>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <p className="text-white/60 text-sm">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Garantia de Satisfação</h2>
            <p>
              Oferecemos uma garantia de satisfação de <strong className="text-primary">7 dias</strong> a 
              partir da data de compra. Se você não estiver satisfeito com o produto por qualquer 
              motivo, pode solicitar o reembolso integral dentro deste período.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Condições para Reembolso</h2>
            <p className="mb-4">Para solicitar o reembolso, você deve:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Estar dentro do prazo de 7 dias corridos após a compra</li>
              <li>Ter realizado a compra diretamente através de nossos canais oficiais</li>
              <li>Fornecer o e-mail e dados utilizados na compra para identificação</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Como Solicitar o Reembolso</h2>
            <p className="mb-4">Para solicitar seu reembolso:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Envie um e-mail para <a href="mailto:suporte@saaskiller.com.br" className="text-primary hover:underline">suporte@saaskiller.com.br</a></li>
              <li>No assunto, escreva: "Solicitação de Reembolso"</li>
              <li>No corpo do e-mail, inclua:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Nome completo</li>
                  <li>E-mail usado na compra</li>
                  <li>Data da compra</li>
                  <li>Motivo da solicitação (opcional)</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Processamento do Reembolso</h2>
            <p className="mb-4">Após receber sua solicitação:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Confirmaremos o recebimento em até 24 horas úteis</li>
              <li>Analisaremos a solicitação em até 48 horas úteis</li>
              <li>O reembolso será processado em até 7 dias úteis após aprovação</li>
              <li>O valor será estornado na mesma forma de pagamento utilizada na compra</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Prazos de Estorno</h2>
            <p className="mb-4">O prazo para o valor aparecer em sua conta varia conforme o método de pagamento:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Cartão de crédito:</strong> 1 a 2 faturas (dependendo da data de fechamento)</li>
              <li><strong>PIX:</strong> Até 7 dias úteis</li>
              <li><strong>Boleto:</strong> Até 10 dias úteis (requer dados bancários)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Exceções</h2>
            <p className="mb-4">O reembolso <strong>não se aplica</strong> nos seguintes casos:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Solicitações feitas após o prazo de 7 dias</li>
              <li>Compras realizadas através de afiliados ou parceiros não autorizados</li>
              <li>Violação dos Termos de Uso da plataforma</li>
              <li>Uso indevido ou compartilhamento não autorizado da conta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Planos de Assinatura</h2>
            <p>
              Para planos de assinatura mensal ou anual, o reembolso segue as mesmas regras, 
              sendo aplicável apenas dentro dos primeiros 7 dias da primeira cobrança. 
              Renovações subsequentes não são elegíveis para reembolso, mas você pode 
              cancelar a qualquer momento para evitar futuras cobranças.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Cancelamento de Assinatura</h2>
            <p className="mb-4">Para cancelar sua assinatura:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acesse as configurações da sua conta na plataforma</li>
              <li>Ou envie um e-mail para suporte solicitando o cancelamento</li>
              <li>Você continuará tendo acesso até o fim do período já pago</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Contato</h2>
            <p>
              Dúvidas sobre reembolsos? Entre em contato: <a href="mailto:suporte@saaskiller.com.br" className="text-primary hover:underline">suporte@saaskiller.com.br</a>
            </p>
          </section>

          <section className="pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              <strong>Infinity</strong><br />
              CNPJ: 58.689.326/0001-58
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaReembolso;
