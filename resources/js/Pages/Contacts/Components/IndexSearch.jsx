import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function IndexSearch({ searchType, categories, filters, ...props }) {

    const { data, setData, get, errors, processing, reset } = useForm({
      first_name: filters.first_name ?? '',
      last_name: filters.last_name ?? '',
      email: filters.email  ?? '',
      phone: filters.phone  ?? '',
      address: filters.address  ?? '',
      notes: filters.notes  ?? '',
    });

    const search = (e) => {
        e.preventDefault();
        let routeName = 'contacts.index';

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
                            <InputLabel htmlFor="first_name" value="الاسم الأول" />
                            <TextInput
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                isFocused={true}
                                onChange={(e) => setData('first_name', e.target.value)}
                            />
                            <InputError message={errors.first_name} className="mt-2 text-red-500 text-sm" />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel htmlFor="last_name" value="الاسم الأخير" />
                            <TextInput
                                id="last_name"
                                type="text"
                                name="last_name"
                                value={data.last_name}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                isFocused={true}
                                onChange={(e) => setData('last_name', e.target.value)}
                            />
                            <InputError message={errors.last_name} className="mt-2 text-red-500 text-sm" />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel htmlFor="email" value="البريد الإلكتروني" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2 text-red-500 text-sm" />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel htmlFor="phone" value="الهاتف" />
                            <TextInput
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                isFocused={true}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <InputError message={errors.phone} className="mt-2 text-red-500 text-sm" />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel htmlFor="address" value="العنوان" />
                            <TextInput
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                isFocused={true}
                                onChange={(e) => setData('address', e.target.value)}
                            />
                            <InputError message={errors.address} className="mt-2 text-red-500 text-sm" />
                        </div>

                        <div className="flex flex-col">
                            <InputLabel htmlFor="notes" value="ملاحظات" />
                            <TextInput
                                id="notes"
                                type="text"
                                name="notes"
                                value={data.notes}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                                isFocused={true}
                                onChange={(e) => setData('notes', e.target.value)}
                            />
                            <InputError message={errors.notes} className="mt-2 text-red-500 text-sm" />
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
