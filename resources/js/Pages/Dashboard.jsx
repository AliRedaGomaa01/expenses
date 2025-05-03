import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    لوحة التحكم
                </h2>
            }
        >
            <Head title="لوحة التحكم" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden  shadow-sm sm:rounded-lg min-h-[70vh] grid items-center justify-center">
                        <div className="p-10 text-gray-900 text-center text-2xl my-grad rounded-xl">
                            شكرا لك على الاشتراك في خدماتنا 
                            <br />
                            <br />
                            نتمنى لك تجربة استخدام رائعة للتطبيق  
                            <br />
                            <br />
                            بامكانك التنقل  في التطبيق واستخدام التطبيق بكل سهولة
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
