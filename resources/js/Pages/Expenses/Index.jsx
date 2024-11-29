import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IndexTable from './Components/IndexTable';
import IndexSearch from './Components/IndexSearch';
import IndexTest from './Components/IndexTest';

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

                <IndexTest auth={props.auth} />

                <IndexSearch  dates={props.dates} categories={props.categories} />
                
                <IndexTable dates={props.dates} expenseData={props.expenseData} filters={props.filters}/>

            </div>
        </AuthenticatedLayout>
    );
}
