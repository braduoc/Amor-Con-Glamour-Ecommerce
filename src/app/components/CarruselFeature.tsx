import { useRef, useEffect } from "react";
import { MessageCircle, Heart, Package, Shield } from "lucide-react";

export const CarruselFeature = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const features = [
    {
      icon: <Package className="w-8 h-8 text-rose-600" />,
      title: "Envío Rápido",
      desc: "Entrega el mismo día disponible",
      bg: "bg-rose-100",
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      title: "Personalización",
      desc: "Cada regalo es único y especial",
      bg: "bg-pink-100",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: "Atención 24/7",
      desc: "Estamos aquí para ayudarte",
      bg: "bg-green-100",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Calidad Garantizada",
      desc: "100% satisfacción asegurada",
      bg: "bg-blue-100",
    },
  ];

  // 🔥 duplicamos para infinito
  const looped = [...features, ...features];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let autoScroll = true;

    // 🖱️ DRAG MOUSE
    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      autoScroll = false;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      autoScroll = true;
    };

    const handleMouseUp = () => {
      isDown = false;
      autoScroll = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    // 📱 TOUCH
    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      autoScroll = false;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleTouchEnd = () => {
      isDown = false;
      autoScroll = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    // 🔥 AUTOSCROLL + INFINITO
    const interval = setInterval(() => {
      if (autoScroll) {
        container.scrollLeft += 1;

        // infinito real sin salto
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }
    }, 20);

    // eventos
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchmove", handleTouchMove);

    // cleanup
    return () => {
      clearInterval(interval);

      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);

      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div
        ref={scrollRef}
        className="
          flex gap-6 
          overflow-x-auto 
          no-scrollbar
          cursor-grab active:cursor-grabbing
        "
      >
        {looped.map((item, i) => (
  <div
    key={i}
    className="
      min-w-[280px]
      flex-shrink-0
      px-6
      flex items-center gap-4
    "
  >
    {/* ICONO */}
    <div className="flex-shrink-0">
      <div className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-300">
        {item.icon}
      </div>
    </div>

    {/* TEXTO */}
    <div className="text-left">
      <h3 className="text-base font-semibold text-neutral-900 tracking-wide">
        {item.title}
      </h3>
      <p className="text-sm text-neutral-500">
        {item.desc}
      </p>
    </div>
  </div>
))}
      </div>
    </section>
  );
};