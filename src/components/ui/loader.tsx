interface ILoaderProps {
  width?: number;
  height?: number;
  className?: string;
}

function Loader({ width = 24, height = 24, className = "" }: ILoaderProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid"
      className={className}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#cccccc"
        strokeWidth="5"
        fill="none"
      />

      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="100 150"
        strokeDashoffset="0"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-250"
          dur="2.5s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default Loader;
