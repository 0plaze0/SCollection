import { Link } from "react-router-dom";

export interface Navigation {
  title: string;
  path: string;
}

export interface Props {
  links: Navigation[];
}

const Sidebar = ({ links }: Props) => {
  return (
    <ul role="list" className="divide-y divide-gray-200 p-2">
      {links.map((link) => (
        <li
          key={link.title}
          className="flex justify-center items-center gap-x-6 py-5"
        >
          <Link to={`${link.path}`}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
};
export default Sidebar;
