import { Link } from "@inertiajs/react";

const Pagination = ({ links, from , to, current_page, last_page, total  }) => {
    const startItem = from;
    const endItem = to;

    return (
        <div className="mt-4 overflow-scroll scrollbar-hide mx-auto grid grid-cols-1 md:grid-cols-2 w-full justify-between">
            {/* Showing X of All Message */}
            <div className="mb-2 text-gray-600 justify-self-center md:justify-self-start my-3">
                عرض من {startItem} إلى {endItem} من إجمالي {total}
            </div>

            {/* Pagination Links */}
            <nav className=" justify-self-center md:justify-self-end my-3">
                <ul className="flex list-none space-x-2">
                    {links.map((link, index) => ( index < 2 || index === current_page || index > last_page - 1  ) && (
                        <li key={index}>
                            <Link
                                href={link.url || '#'}
                                className={`px-4 py-2 border rounded ${
                                    link.active
                                        ? 'bg-blue-500 text-white'
                                        : 'my-grad text-blue-500 hover:bg-yellow-100'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;