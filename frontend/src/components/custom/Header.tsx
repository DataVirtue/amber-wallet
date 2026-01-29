export default function Header() {
  return (
    <header className="flex h-20 items-center gap 2">
      <svg
        width="100"
        height="100"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="amberGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E58B01" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        <path
          d="M128 16L220 72V184L128 240L36 184V72L128 16Z"
          fill="url(#amberGradient)"
        />

        <path
          d="M128 56L188 92V164L128 200L68 164V92L128 56Z"
          fill="#111827"
        />

        <circle cx="128" cy="120" r="18" fill="url(#amberGradient)" />
        <rect
          x="120"
          y="136"
          width="16"
          height="36"
          rx="8"
          fill="url(#amberGradient)"
        />
      </svg>
      <span className=" text-xl font-bold ">Amber Wallet</span>

    </header>
  )
}
