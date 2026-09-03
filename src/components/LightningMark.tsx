interface LightningMarkProps {
  className?: string;
  title?: string;
}

const LightningMark = ({ className = "", title }: LightningMarkProps) => (
  <svg
    viewBox="0 0 120 180"
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
  >
    <defs>
      <linearGradient id="saaskiller-mark-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFD874" />
        <stop offset="0.55" stopColor="#F2B93B" />
        <stop offset="1" stopColor="#8A6219" />
      </linearGradient>
    </defs>
    <path
      d="M75 4 26 91h31l-17 85 57-104H68L93 4Z"
      fill="url(#saaskiller-mark-gold)"
    />
  </svg>
);

export default LightningMark;

