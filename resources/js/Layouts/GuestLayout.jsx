import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className='m-5 bg-white rounded-xl grid grid-cols-2 gap-3'>
                <Link href={ route('register') } className={`${ route().current('register') ? 'active' :  '' } p-3 rounded-xl`}>
                    تسجيل جديد 
                </Link>
                <Link href={ route('login') } className={`${ route().current('login')? 'active' : '' }  p-3 rounded-xl`}>
                    تسجيل الدخول 
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
