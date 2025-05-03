import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <GuestLayout>
                <Head title="الرئيسية" />
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">مرحباً بك في تطبيق إدارة جهات الاتصال!</h1>
                <p className="text-xl text-gray-900 opacity-90 mb-6">
                    هذا التطبيق سيساعدك على ادارة جهات اتصالك.
                </p>
                <div className="flex justify-center">
                    <Link href={route('register')} as='button' className="bg-teal-600 text-white py-2 px-6 rounded-xl shadow-md hover:bg-teal-700 transition duration-300">
                        سجل الآن
                    </Link>
                </div>
            </GuestLayout>
        </>
    );
}
