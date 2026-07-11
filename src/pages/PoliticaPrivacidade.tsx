import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import footerLogoGold from "@/assets/footer-logo-gold.png";
import Footer from "@/components/Footer";

const PoliticaPrivacidade = () => {
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
          Política de Privacidade
        </h1>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <p className="text-white/60 text-sm">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Introdução</h2>
            <p>
              A Infinity ("nós", "nosso" ou "empresa") está comprometida em proteger sua privacidade. 
              Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas 
              informações quando você utiliza o SaaSKiller e nossos serviços relacionados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Informações que Coletamos</h2>
            <p className="mb-4">Podemos coletar as seguintes informações:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Informações de identificação pessoal (nome, e-mail, telefone)</li>
              <li>Informações de pagamento e faturamento</li>
              <li>Dados de uso e navegação</li>
              <li>Informações técnicas (IP, tipo de navegador, dispositivo)</li>
              <li>Cookies e tecnologias similares</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Como Usamos Suas Informações</h2>
            <p className="mb-4">Utilizamos suas informações para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecer e manter nossos serviços</li>
              <li>Processar transações e enviar confirmações</li>
              <li>Enviar comunicações de marketing (com seu consentimento)</li>
              <li>Melhorar nossos produtos e serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Compartilhamento de Dados</h2>
            <p>
              Não vendemos suas informações pessoais. Podemos compartilhar dados com prestadores de 
              serviços terceirizados que nos auxiliam na operação do negócio, sempre sob acordos de 
              confidencialidade e proteção de dados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Cookies</h2>
            <p>
              Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o 
              tráfego do site e personalizar conteúdo. Você pode controlar as preferências de cookies 
              através das configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Seus Direitos (LGPD)</h2>
            <p className="mb-4">De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a anonimização ou eliminação de dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Segurança</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas 
              informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato 
              através do e-mail: <a href="mailto:suporte@saaskiller.com.br" className="text-primary hover:underline">suporte@saaskiller.com.br</a>
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

export default PoliticaPrivacidade;
