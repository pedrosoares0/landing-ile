import React from 'react'

export const WhatsappButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/5571991509097?text=Sarav%C3%A1%20Alex!%20Tenho%20uma%20d%C3%BAvida%20quanto%20ao%20il%C3%AA"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group flex items-center justify-center w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer"
      title="Falar no WhatsApp"
    >
      {/* Tooltip */}
      <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-md bg-black text-[#F7F1E6] text-[9px] font-sans font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md whitespace-nowrap border border-white/5">
        Tire suas Dúvidas
      </span>

      {/* WhatsApp Thin Monochromatic SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-white opacity-85 group-hover:opacity-100 transition-all group-hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.004 0C5.372 0 0 5.372 0 12.004c0 2.116.55 4.1 1.513 5.845L.053 24l6.337-1.663c1.7.925 3.633 1.455 5.614 1.455 6.632 0 12.004-5.372 12.004-12.004C24.008 5.372 18.636 0 12.004 0zm6.822 17.292c-.273.766-1.34 1.393-2.13 1.545-.53.1-1.222.18-3.565-.79-2.997-1.24-4.93-4.29-5.08-4.49-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.033-2.455.273-.295.6-.37.796-.37.197 0 .393 0 .565.008.18.008.423-.07.662.502.247.592.846 2.07.92 2.22.074.15.124.324.025.523-.1.2-.148.324-.296.498-.148.174-.31.39-.443.522-.148.15-.304.312-.132.61.173.297.77 1.272 1.652 2.057 1.135 1.01 2.092 1.32 2.387 1.47.296.15.47.125.646-.075.176-.2.768-.893.972-1.2.204-.306.407-.25.686-.148.28.1.1.846 1.77.92.204.1.37.15.543.05.173-.1.872-.947 1.145-1.713.273-.766.1-.92-.075-1.02-.176-.1-.768-.375-.768-.375s-.356-.164-.176.1c.18.265.768.893.972 1.2.204.307.304.53.03.796z" />
      </svg>
    </a>
  )
}
