import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

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
            <Head title="الرئيسية" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                {/* <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                /> */}
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <Link href="/">
                                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                                </Link>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        لوحة التحكم
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            تسجيل الدخول
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            تسجيل جديد
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="min-h-[60vh] bg-gradient-to-b from-teal-500 to-cyan-600 flex flex-col items-center justify-center text-center p-6 gap-5">
                                <h1 className="text-4xl font-extrabold text-white mb-4">مرحباً بك في تطبيق إدارة النفقات الشخصية!</h1>
                                <p className="text-xl text-white opacity-90 mb-6">
                                    هذا التطبيق سيساعدك على متابعة نفقاتك اليومية، وتنظيم ميزانيتك بطريقة بسيطة وفعّالة.
                                    <br />
                                    <br />
                                    من خلال تتبع المصاريف، يمكنك الحصول على نظرة واضحة على أموالك واتخاذ قرارات مالية أفضل.
                                    <br />
                                    <br />
                                    فقط سجل مصاريفك اليومية لمدة 3 شهور لتستطيع معرفة متوسط نفقتك في اليوم وفي الشهر
                                </p>
                                <div className="flex justify-center">
                                    <Link href={route('register')} as='button' className="bg-teal-600 text-white py-2 px-6 rounded-xl shadow-md hover:bg-teal-700 transition duration-300">
                                        سجل الآن
                                    </Link>
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Designed & Developed by <a href="https://aly-h-.com" className='font-bold italic underline text-blue-500'>Ali Hussein</a>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
