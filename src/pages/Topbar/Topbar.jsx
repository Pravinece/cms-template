import { Link, useLocation } from "react-router-dom";

const LABEL_MAP = {
  "": "Dashboard",
  admin: "Admin",
  users: "Users",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Dashboard", to: "/" },
    ...segments.map((seg, i) => ({
      label: LABEL_MAP[seg] || seg,
      to: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6 z-10">
      <nav className="flex items-center text-sm text-gray-500">
        {crumbs.map((crumb, i) => (
          <span key={crumb.to} className="flex items-center">
            {i > 0 && <span className="mx-2">/</span>}
            {i === crumbs.length - 1 ? (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            ) : (
              <Link to={crumb.to} className="hover:text-gray-900 transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
}
