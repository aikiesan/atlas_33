import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-semibold text-stone-900 tracking-tight">
                Atlas 3+3
              </h1>
              <p className="text-xs text-stone-500 tracking-wide">
                UIA Sustainable Development
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium text-stone-600 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-stone-600 hover:text-primary-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/submit"
              className="text-sm font-medium text-stone-600 hover:text-primary-600 transition-colors"
            >
              Submit Project
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/login"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors"
            >
              Admin
            </Link>
            <Link
              to="/submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm"
            >
              Submit Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
