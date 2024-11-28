import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
    return (
        <nav className="flex justify-center mt-4">
            <ul className="flex list-none space-x-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.url || '#'}
                            className={`px-4 py-2 border rounded ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-blue-500 hover:bg-gray-100'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;