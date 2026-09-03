import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import LightningMark from "@/components/LightningMark";

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <LightningMark className="w-8 h-8" title="SaaSKiller" />
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
          Termos de Uso
        </h1>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <p className="text-white/60 text-sm">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou usar o SaaSKiller, você concorda em estar vinculado a estes Termos de Uso. 
              Se você não concorda com qualquer parte destes termos, não deve usar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Descrição do Serviço</h2>
            <p>
              O SaaSKiller é uma plataforma que oferece ferramentas e recursos para criação e 
              gerenciamento de negócios digitais. Os recursos específicos podem variar de acordo 
              com o plano contratado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Conta de Usuário</h2>
            <p className="mb-4">Ao criar uma conta, você concorda em:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecer informações verdadeiras e atualizadas</li>
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Ser responsável por todas as atividades em sua conta</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Uso Aceitável</h2>
            <p className="mb-4">Você concorda em não usar o serviço para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violar leis ou regulamentos aplicáveis</li>
              <li>Infringir direitos de propriedade intelectual de terceiros</li>
              <li>Transmitir malware ou códigos maliciosos</li>
              <li>Realizar atividades fraudulentas ou enganosas</li>
              <li>Interferir no funcionamento adequado da plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo, marcas, logos e materiais do SaaSKiller são de propriedade exclusiva 
              da Infinity ou de seus licenciadores. Você não pode copiar, modificar, distribuir ou 
              criar trabalhos derivados sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Pagamentos e Assinaturas</h2>
            <p className="mb-4">Ao adquirir um plano:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Você autoriza a cobrança do valor acordado</li>
              <li>Renovações são automáticas, salvo cancelamento prévio</li>
              <li>Preços podem ser alterados com aviso prévio de 30 dias</li>
              <li>Não há reembolso proporcional por cancelamento antecipado, exceto conforme nossa Política de Reembolso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Limitação de Responsabilidade</h2>
            <p>
              O SaaSKiller é fornecido "como está". Não garantimos que o serviço será ininterrupto, 
              seguro ou livre de erros. Em nenhuma circunstância seremos responsáveis por danos 
              indiretos, incidentais ou consequenciais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Isenção de Garantia de Resultados</h2>
            <p>
              Não garantimos resultados financeiros específicos. O sucesso depende de diversos 
              fatores, incluindo dedicação, mercado e execução. Depoimentos e exemplos não 
              representam garantia de resultados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar seu acesso a qualquer momento, com ou sem motivo, 
              com ou sem aviso. Você pode cancelar sua conta a qualquer momento através das 
              configurações ou entrando em contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações 
              significativas serão comunicadas por e-mail ou através da plataforma. O uso 
              continuado após as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">11. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer 
              disputa será resolvida no foro da comarca da sede da empresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">12. Contato</h2>
            <p>
              Para dúvidas sobre estes termos, entre em contato: <a href="mailto:suporte@saaskiller.com.br" className="text-primary hover:underline">suporte@saaskiller.com.br</a>
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

export default TermosUso;
