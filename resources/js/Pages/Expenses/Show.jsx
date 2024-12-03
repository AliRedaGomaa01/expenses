import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import CreateNewInputs from './Components/CreateNewInputs.jsx';
import EditCurrentExpenses from './Components/EditCurrentExpenses.jsx';
import DateInput from './Components/DateInput.jsx';

export default function Show(props) {
    const { data: data, setData: setData, post: post, processing: processing, errors: errors, reset: reset } = useForm({
        date: props?.date?.date ?? '',
        expenses: [],
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    اضافة نفقات جديدة
                </h2>
            }
        >
            <Head title="اضافة نفقات جديدة" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden my-grad shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center">

                            <DateInput data={data} setData={setData} errors={errors} disabled={true} />

                            <EditCurrentExpenses expenses={ props.date?.expenses } categories={ props.categories }/>

                            <CreateNewInputs data={data} setData={setData} post={post} processing={processing} errors={errors} reset={reset} categories={props.categories} />
                        
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
