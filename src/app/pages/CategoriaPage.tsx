import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { useArreglos } from "../../hooks/useArreglos";
import { ProductCard } from "../components/ProductCard";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/ui/button";

export function CategoriaPage() {

  const { cat } = useParams();
  const { arreglos, loading } = useArreglos();

  const [showTop, setShowTop] = useState(false);

  const filtrados = arreglos.filter((a) => a.categoria === cat);
  const categorias = Array.from(
    new Set(arreglos.map((a) => a.categoria).filter(Boolean))
  ).filter((c) => c !== cat);
  // 🔥 detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔝 scroll top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <p className="p-10">Cargando...</p>;

  return (
    <div className="min-h-screen bg-neutral-100 p-10 relative">

      {/* BACK BUTTON */}
      <Button
        variant="ghost"
        asChild
        className="mb-6 bg-neutral-200 hover:bg-neutral-300"
      >
        <Link to="/">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>
      </Button>

      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: "Inicio", path: "/" },
          { label: cat ?? "Categoría" },
        ]}
      />

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-8 capitalize">
        {cat}
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtrados.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onAddToCart={() => { }}
          />
        ))}
      </div>

      {/* 🔝 BOTÓN VOLVER ARRIBA */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="
    fixed bottom-6 right-6
    bg-neutral-900 text-white
    px-4 py-3 rounded-full shadow-lg
    hover:bg-neutral-800 transition
    flex items-center gap-2
  "
        >
          <ArrowUp className="w-5 h-5" />
          <span className="text-sm font-medium">Volver Arriba</span>
        </button>
      )}
      {/* 🔥 OTRAS CATEGORÍAS */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-6">
          Otras categorías
        </h2>

      </div>
        <div className="flex flex-wrap gap-3 ">
          {categorias.map((c) => (
            <Link
              key={c}
              to={`/categoria/${c}`}
              className="
          px-5 py-2 rounded-full
          bg-white border border-neutral-300
          text-neutral-800
          hover:bg-neutral-900 hover:text-white
          transition-all duration-300
          text-sm font-medium
        "
            >
              {c}
            </Link>
          ))}
        </div>

    </div>
  );
}