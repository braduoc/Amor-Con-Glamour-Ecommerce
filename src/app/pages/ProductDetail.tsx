import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useArreglos } from "../../hooks/useArreglos";
import { Breadcrumb } from "../components/Breadcrumb";
import { RelatedCarousel } from "../components/RelatedCarousel";
import { useState } from "react";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openImage, setOpenImage] = useState(false);
  // 🔥 FIREBASE DATA
  const { arreglos, loading } = useArreglos();

  // 🔥 buscar producto
  const product = arreglos.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Producto no encontrado
          </h2>
          <Button asChild>
            <Link to="/">Volver al Inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    const message = `Hola! Me interesa:\n${product.categoria}\n${product.nombre}\nPrecio: $${product.precio}`;
    const whatsappUrl = `https://wa.me/56982823533?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl  p-10">

        {/* BACK */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 bg-neutral-200 hover:bg-neutral-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
        <Breadcrumb
          items={[
            { label: "Inicio", path: "/" },
            {
              label: product?.categoria ?? "Categoría",
              path: `/categoria/${product?.categoria}`,
            },
            {
              label: product?.nombre ?? "Producto",
            },
          ]}
        />

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div className="lg:sticky lg:top-24">
            <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-100 relative">
              <img
                src={product.imagenUrl}
                alt={product.nombre}
                onClick={() => setOpenImage(true)}
                className="
    w-full h-full object-cover
    cursor-zoom-in
    transition-transform duration-700 hover:scale-105
  "
              />

              {/* 🔥 Badge TOP */}
              {product.esTopEnVenta && (
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white text-black text-xs font-bold border-2 border-neutral-900 rounded-full">
                    ¡Top Ventas!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {product.nombre}
            </h1>

            <div className="flex items-end gap-3">
              {/* Precio anterior */}
              {product.precioAnterior && (
                <span className="text-lg text-neutral-400 line-through">
                  ${Number(product.precioAnterior).toFixed(0)}
                </span>
              )}

              {/* Precio actual */}
              <span
                className={`text-3xl font-bold ${product.precioAnterior ? "text-red-500" : "text-neutral-900"
                  }`}
              >
                ${Number(product.precio || 0).toFixed(0)}
              </span>
            </div>

            <p className="mt-6 text-neutral-600">
              {product.descripcion}
            </p>

            {/* BOTÓN WHATSAPP */}
            <div className="mt-8">
              <Button
                onClick={handleBuyNow}
                disabled={product.esAgotado}
                className={`w-full py-6 text-lg rounded-full transition ${product.esAgotado
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
              >
                <MessageCircle className="w-5 h-5 mr-2" />

                {product.esAgotado ? "Agotado" : "Pedir por WhatsApp"}
              </Button>
            </div>

            {/* INCLUYE */}
            <div className="mt-10 border-t pt-6">
              <h3 className="font-bold mb-4">
                ¿Qué incluye?
              </h3>

              <div className="text-neutral-600 whitespace-pre-line leading-relaxed">
                {product.incluye || "Sin información disponible"}
              </div>
            </div>
          </div>
        </div>

      </div>
      <RelatedCarousel
        arreglos={arreglos}
        currentId={product.id}
      />
      {openImage && (
        <div
          className="
      fixed inset-0 z-50
      bg-black/80 backdrop-blur-sm
      flex items-center justify-center
      p-4
    "
          onClick={() => setOpenImage(false)}
        >
          {/* BOTÓN CERRAR */}
          <button
            className="
        absolute top-6 right-6
        text-white text-2xl
        hover:scale-110 transition
      "
            onClick={() => setOpenImage(false)}
          >
            ✕
          </button>

          {/* IMAGEN */}
          <img
            src={product.imagenUrl}
            alt={product.nombre}
            className="
        max-h-[90vh] max-w-[90vw]
        object-contain
        rounded-2xl
        shadow-2xl
        animate-fadeIn
      "
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}