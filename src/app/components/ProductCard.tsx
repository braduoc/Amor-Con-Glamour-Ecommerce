import { motion } from 'motion/react';
import { Link } from 'react-router'; // ✅ CORREGIDO
import { ShoppingCart } from 'lucide-react';
import { Arreglo } from '../../types/Arreglo';
import { Button } from './ui/button';
import { ArrowRight } from "lucide-react";


interface ProductCardProps {
  product: Arreglo;
  onAddToCart?: () => void; // 👈 cambiar a opcional
    onClick?: () => void; // 👈 AGREGAR ESTO

}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      className="group relative bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 my-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Link to={`/producto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden ">

          {/* 🖼 Imagen segura */}
          <img
            src={product.imagenUrl || "/placeholder.jpg"}
            alt={product.nombre || "Producto"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          

          {/* 🔥 Badge TOP */}
          {product.esTopEnVenta && (
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-white text-black text-xs font-bold border-2 border-neutral-900 rounded-full">
                ¡Top Ventas!
              </span>
            </div>
          )}

          {/* ❌ Badge AGOTADO */}
          {product.esAgotado && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                Agotado
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/producto/${product.id}`}>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:scale-105 transition-all duration-300 ease-out">
            {product.nombre || "Sin nombre"}
          </h3>
        </Link>

        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
          {product.descripcion || "Sin descripción"}
        </p>

        <div className="flex items-center justify-between">

          {/* 💰 Precio */}
          <div className="flex flex-col">
            {product.precioAnterior && (
              <span className="text-sm line-through text-neutral-400">
                ${Number(product.precioAnterior).toFixed(0)}
              </span>
            )}

            <span
              className={`text-2xl font-bold ${product.precioAnterior ? "text-red-600" : "text-neutral-900"
                }`}
            >
              ${Number(product.precio || 0).toFixed(0)}
            </span>
          </div>

          {/* 🛒 Botón */}
        <Link to={`/producto/${product.id}`}>
  <Button
    disabled={product.esAgotado}
    className="bg-neutral-900 text-white border-2 hover:bg-white hover:text-neutral-900 hover:border-neutral-900 rounded-full px-6 disabled:opacity-50"
  >
    {product.esAgotado ? "No disponible" : "Ver Detalle"}
    <ArrowRight className="w-4 h-4 mr-2" />
  </Button>
</Link>
        </div>
      </div>
    </motion.div>
  );
}