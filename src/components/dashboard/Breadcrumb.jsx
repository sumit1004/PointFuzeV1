import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="hidden md:flex items-center text-sm">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        // Capitalize and remove hyphens
        const title = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

        return (
          <div key={to} className="flex items-center">
            {index > 0 && <ChevronRight size={16} className="mx-2 text-text-secondary" />}
            {last ? (
              <span className="text-text font-semibold">{title}</span>
            ) : (
              <Link to={to} className="text-text-secondary hover:text-primary transition-colors">
                {title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
