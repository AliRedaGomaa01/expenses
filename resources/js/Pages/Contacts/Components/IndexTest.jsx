import { router } from '@inertiajs/react';

export default function IndexTest({ auth, ...props }) {

    const deleteAll = () => {
        if (
            confirm('هل انت متاكد من حذف جميع البيانات')
        ) {
            return router.delete(route('contacts.delete-all'), {}, {});
        }
    };
    const seed = () => {
        if (
            confirm('سيتم اضافة بيانات اختبارية لحسابك ؟')
        ) {
            return router.post(route('contacts.seed'), {}, {});
        }
    };

    return (
        <>
            {auth?.user?.email === 'test@aly-h.com' && <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-8 ">
                <div className="overflow-hidden my-grad shadow-lg rounded-lg  p-3">
                    <div className="my-4 grid gap-4 grid-cols-2 items-center justify-items-center">
                        <button onClick={seed} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>اضافة قيم اختبارية</button>
                        <button onClick={deleteAll} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded '>حذف جميع البيانات</button>
                    </div>
                </div>
            </div>}
        </>
    );
}
