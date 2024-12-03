import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function IndexSearch({ searchType, categories, filters, ...props }) {

    const { data, setData, get, errors, processing, reset } = useForm({
        start_date: filters.start_date  ?? '',
        end_date: filters.end_date ?? '',
        category_id: filters.category_id ?? '0',
        name: filters.name ?? '',
    });

    const search = (e) => {
        e.preventDefault();
        let routeName = searchType == 'date' ? 'date.index' : 'expenses.index';

        // console.log(data);

        get(route(routeName),
            {
                preserveScroll: true,
            });
    }

    return (
        <>

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-8">
                <div className="overflow-hidden my-grad shadow-lg rounded-lg">
                    <form onSubmit={search} className="p-6 grid grid-cols-1 md:grid-cols-2 content-center justify-center gap-4">
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


                        <div className="flex flex-col">
                            <InputLabel htmlFor="name" value="اسم المشتريات" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2 text-red-500 text-sm" />
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
                                <option value="0" >
                                    الجميع
                                </option>
                                {!!categories &&
                                    categories.map((category) => (
                                        <option value={category.id} key={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                            <InputError message={errors?.category_id} className="mt-2 text-red-500 text-sm" />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-stretch mt-6 md:col-span-2">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                            >
                                بحث
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
