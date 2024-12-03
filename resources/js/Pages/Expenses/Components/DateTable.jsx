import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';
import ExpenseSummary from './ExpenseSummary';

export default function DateTable({ dates, expenseData, filters, ...props }) {

    const pagination = {...dates};
    delete pagination.data;

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-4">
            <div className="overflow-hidden my-grad shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 text-center">

                    {!dates?.data.length && <div className='text-center p-2 shadow-gray-400 shadow-md'>'لا يوجد مصاريف'</div>}

                    {!!dates?.data.length && <div className="overflow-scroll scrollbar-hide">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead className="bg-yellow-100">
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
                                        className={index % 2 === 0 ? "bg-yellow-50" : "my-grad"} // Alternating row colors
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

                        <Pagination {...pagination} />

                        <ExpenseSummary expenseData={expenseData} filters={filters} />
                    </div>}
                </div>
            </div>
        </div>
    );
}
