import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index(props) {
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center">
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
                                    {props.dates && props.dates.map((date, index) => (
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
