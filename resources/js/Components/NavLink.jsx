import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    routeName="",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            href={route(`${routeName}`)}
            className={
                'inline-flex items-center p-3 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none' +
                (route().current(`${routeName}`)
                    ? 'border-indigo-400 focus:border-indigo-700 text-blue-600 decoration-blue-600 bg-green-100 rounded-lg'
                    : 'border-transparent text-gray-500 scale-90  hover:border-b-2 hover:border-gray-600 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 ') +
                    className
            }
            style={{ margin: '0.25rem' }}
        >
            {children}
        </Link>
    );
}
