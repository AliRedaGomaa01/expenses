import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index(props) {
    const [isForTest, setIsForTest] = useState(false);

    const { data, setData, get, errors, processing, reset } = useForm({
        start_date: (props.filters.length && props.filters.start_date) ?? "",
        end_date: (props.filters.length && props.filters.end_date) ?? "",
        category_id: (props.filters.length && props.filters.name) ?? "",
    });

    const search = (e) => {
        e.preventDefault();

        // console.log(data);

        get(route('date.index'),
            {
                preserveScroll: true,
                preserveState: true
            });
    }

    const deleteAll = () => {
        if (
            confirm('هل انت متاكد من حذف جميع المصاريف؟')
        ) {
            return router.delete(route('expenses.delete-all'), {}, {});
        }
    };
    const seed = () => {
        if (
            confirm('لا تقم بذلك في حالة وجود بيانات حقيقية في حسابك لأن ذلك سيتسبب في تلف الحسابات؟')
        ) {
            return router.post(route('expenses.seed'), {}, {});
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    المصاريف
                </h2>
            }
        >
            <Head title="المصاريف" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-8 ">
                    <div className="overflow-hidden bg-white shadow-lg rounded-lg flex items-center justify-center p-3">
                        <div className="">هل تريد اختبار البرنامج فقط ؟ </div>
                        <input type="checkbox" name="is_for_test" id="is_for_test" className='w-[30px] h-[30px] rounded-full' checked={isForTest} onChange={(e) => setIsForTest(prev => !prev)} />
                    </div>
                </div>

                { isForTest && <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-8 ">
                    <div className="overflow-hidden bg-white shadow-lg rounded-lg  p-3">
                        <div className="my-4 grid gap-4 grid-cols-2 items-center justify-items-center">
                            <button onClick={seed} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>اضافة قيم اختبارية</button>
                            <button onClick={deleteAll} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded '>حذف جميع النفقات</button>
                        </div>
                    </div>
                </div>}

                {!!props.dates?.data.length && <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-8">
                    <div className="overflow-hidden bg-white shadow-lg rounded-lg">
                        <form onSubmit={search} className="p-6 grid grid-cols-1 md:grid-cols-3 content-center justify-center gap-4">
                            {/* Start Date */}
                            <div className="flex flex-col">
                                <InputLabel htmlFor="start_date" value="بداية من تاريخ" />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={data.start_date}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                    isFocused={true}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                                <InputError message={errors.start_date} className="mt-2 text-red-500 text-sm" />
                            </div>

                            {/* End Date */}
                            <div className="flex flex-col">
                                <InputLabel htmlFor="end_date" value="آخر تاريخ" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={data.end_date}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                                <InputError message={errors.end_date} className="mt-2 text-red-500 text-sm" />
                            </div>

                            {/* Category */}
                            <div className="flex flex-col">
                                <InputLabel htmlFor="category_id" value="تصنيف المشتريات" />
                                <select
                                    name="category_id"
                                    id="category_id"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    value={data['category_id']}
                                >
                                    <option value="" >
                                        الجميع
                                    </option>
                                    {!!props?.categories &&
                                        props?.categories.map((category) => (
                                            <option value={category.id} key={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                                <InputError message={errors?.category_id} className="mt-2 text-red-500 text-sm" />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-stretch mt-6 md:col-span-3">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                                >
                                    بحث
                                </button>
                            </div>
                        </form>
                    </div>
                </div>}

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center">

                            {!props.dates?.data.length && <div className='text-center p-2 shadow-gray-400 shadow-md'>'لا يوجد مصاريف'</div>}

                            {!!props.dates?.data.length && <div className="overflow-scroll scrollbar-hide">
                                <table className="min-w-full border-collapse border border-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr className="text-center">
                                            <th width="10%" className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700">#</th>
                                            <th width="20%" className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700">التاريخ</th>
                                            <th width="20%" className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700">مجموع النفقات</th>
                                            <th width="10%" className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700">عرض</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!!props.dates?.data && props.dates?.data.map((date, index) => (
                                            <tr
                                                key={index}
                                                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // Alternating row colors
                                            >
                                                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-600">{index + 1}</td>
                                                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-600">{date.date}</td>
                                                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-600">
                                                    {date['expenses_sum'] ?? ''}
                                                </td>
                                                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-600">
                                                    <Link href={route('date.show', date.id)} as="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">عرض</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <Pagination links={props.dates.links} />

                                <div className="my-4 p-4 bg-gray-100 rounded-md shadow-md text-center">
                                    <p className="text-lg font-medium text-gray-700">
                                        مجموع النفقات ل
                                        <span className="text-red-500 font-semibold">
                                            {' '}  {props.filters.category_id ? props.categories.find(cat => cat.id == props.filters.category_id).name : ' كل التصنيفات '}  {'  '}
                                        </span>
                                        من تاريخ
                                        <span className="text-blue-500 font-semibold"> {props.expenseData.startDate} </span>
                                        إلى تاريخ
                                        <span className="text-blue-500 font-semibold"> {props.expenseData.endDate} </span>
                                        هو :
                                        <span className="text-green-600 font-bold"> {props.expenseData.sum} </span>
                                        بمعدل :
                                        <span className="text-green-600 font-bold"> {props.expenseData.averagePerDay} </span>
                                        لليوم خلال :
                                        <span className="text-blue-500 font-semibold"> {props.expenseData.daysBetween} </span>
                                        يوم
                                    </p>
                                </div>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
