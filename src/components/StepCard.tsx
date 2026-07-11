// Componente simplificado sem animações de scroll

interface StepData {
  step: string;
  title: string;
  description: string;
}

interface StepCardProps {
  step: StepData;
  index: number;
}

const StepCard = ({ step, index }: StepCardProps) => {
  return (
    <div className="flex-shrink-0 w-[350px]">
      <div 
        className="bg-white rounded-2xl p-8 relative transition-all duration-300 hover:scale-105 hover:-translate-y-2 h-full"
        style={{
          boxShadow: `
            0 10px 40px rgba(0, 0, 0, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.2),
            0 0 60px rgba(212, 175, 55, 0.15)
          `
        }}
      >
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="inline-block px-5 py-2 rounded-lg bg-black text-[var(--gold)] text-sm font-bold border border-[#D4AF37]/30">
              Etapa - {step.step}
            </span>
          </div>
          
          <h3 className="text-2xl font-heading font-bold text-black mb-3">
            {step.title}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
