import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useArreglos } from '../../hooks/useArreglos';

export function Header() {
  const { arreglos } = useArreglos();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔥 categorías únicas
  const categorias = Array.from(
    new Set(arreglos?.map((a) => a.categoria).filter(Boolean))
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          <img
            src="/images/logo.jpeg"
            alt="logo"
            className="h-16 w-auto object-contain"
          />
          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-6">

            <Link to="/" className="text-neutral-700 hover:text-neutral-900">
              Inicio
            </Link>

            {/* 🔥 CATEGORÍAS DINÁMICAS */}
            {categorias.map((cat) => (
              <Link
                key={cat}
                to={`/categoria/${cat}`}
                className="text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                {cat}
              </Link>
            ))}

            <a
              href="#contacto"
              className="text-neutral-700 hover:text-neutral-900"
            >
              Contacto
            </a>

          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden p-2 hover:bg-neutral-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t">

            <Link to="/" className="block py-2">
              Inicio
            </Link>

            {/* 🔥 MOBILE CATEGORÍAS */}
            {categorias.map((cat) => (
              <Link
                key={cat}
                to={`/categoria/${cat}`}
                className="block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}



          </nav>
        )}

      </div>
    </header>
  );
}