import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';

export default function IndexTable({ dates, expenseData, filters, ...props }) {

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-4">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 text-center">

                    {!dates?.data.length && <div className='text-center p-2 shadow-gray-400 shadow-md'>'لا يوجد مصاريف'</div>}

                    {!!dates?.data.length && <div className="overflow-scroll scrollbar-hide">
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
                                {!!dates?.data && dates?.data.map((date, index) => (
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

                        <Pagination links={dates.links} />

                        <div className="my-4 p-4 bg-gray-100 rounded-md shadow-md text-center">
                            <p className="text-lg font-medium text-gray-700">
                                مجموع النفقات ل
                                <span className="text-red-500 font-semibold">
                                    {' '}  {filters.category_id ? categories.find(cat => cat.id == filters.category_id).name : ' كل التصنيفات '}  {'  '}
                                </span>
                                من تاريخ
                                <span className="text-blue-500 font-semibold"> {expenseData.startDate} </span>
                                إلى تاريخ
                                <span className="text-blue-500 font-semibold"> {expenseData.endDate} </span>
                                هو :
                                <span className="text-green-600 font-bold"> {expenseData.sum} </span>
                                بمعدل :
                                <span className="text-green-600 font-bold"> {expenseData.averagePerDay} </span>
                                لليوم خلال :
                                <span className="text-blue-500 font-semibold"> {expenseData.daysBetween} </span>
                                يوم
                            </p>
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    );
}
