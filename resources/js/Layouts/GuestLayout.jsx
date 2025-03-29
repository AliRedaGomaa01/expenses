import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

export default function GuestLayout({ children, ...props }) {
  let { auth } = usePage().props;

  return (
    <>
      <div className="bg-yellow-50 text-black/50">
        <div className="relative flex min-h-screen flex-col items-center justify-between gap-10 selection:bg-[#000] selection:text-white">
          <header className="grid grid-cols-2 items-center justify-between gap-2 min-w-full p-10 my-grad">
            <div className="">
              <Link href="/">
                <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
              </Link>
            </div>
            <nav className="-mx-3 flex flex-1 justify-end">
              {!!auth?.user ? (
                <NavLink
                  routeName="dashboard"
                >
                  لوحة التحكم
                </NavLink>
              ) : (
                <>
                  <NavLink
                    routeName="login"
                  >
                    تسجيل الدخول
                  </NavLink>
                  <NavLink
                    routeName="register"
                  >
                    تسجيل جديد
                  </NavLink>
                </>
              )}
            </nav>
          </header>

          <main className="py-10 my-grad flex flex-col items-center justify-center p-6 gap-5 rounded-xl max-w-2xl px-6 lg:max-w-7x">
            {children}
          </main>

          <footer className='min-w-full'>
            <div className='w-full text-center my-grad py-10 text-xl'>
              <p className='text-center text-xl'>
                تم التصميم والتطوير والاستضافة بواسطة
                <br className='md:hidden' /> &nbsp; &nbsp;
                <a href="https://aly-h.com" target='_blank' className='font-bold italic underline text-blue-500'>علي حسين</a>
                <br className='md:hidden' /> &nbsp; &nbsp;
                2024 &copy; جميع الحقوق محفوظة
              </p>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
