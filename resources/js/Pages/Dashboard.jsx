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
                    <div className="overflow-hidden my-grad shadow-sm sm:rounded-lg min-h-[70vh] grid items-center justify-center">
                        <div className="p-6 text-gray-900 text-center text-2xl">
                            شكرا لك على الاشتراك في تطبيق الويب الخاص بنا لمتابعة المصاريف 
                            <br />
                            <br />
                            نتمنى لك تجربة استخدام رائعة للتطبيق  
                            <br />
                            <br />
                            بامكانك التنقل بين الصفحات التالية واستخدام التطبيق بكل سهولة
                            <br />
                            <br />
                            حيث بإمكانك اضافة النفقات ومعرفة معدل انفاقك اليومي والبحث في نفقاتك وتعديلها وحذفها 
                            <br />
                            <br />
                            <Link href={route('expenses.create')} as='button' className='animate-colored p-2 rounded-xl my-3 border border-gray-600' > اضافة نفقات جديدة  </Link>
                            <br />
                            <br />
                            <Link href={route('date.index')} as='button' className='animate-colored p-2 rounded-xl my-3 border border-gray-600' > متابعة أيام الانفاق  </Link>
                            <br />
                            <br />
                            <Link href={route('expenses.index')} as='button' className='animate-colored p-2 rounded-xl my-3 border border-gray-600' > متابعة النفقات  </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
