import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IndexTable from './Components/DateTable';
import IndexSearch from './Components/IndexSearch';
import IndexTest from './Components/IndexTest';
import ExpenseTable from './Components/ExpenseTable';

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

                <IndexSearch  searchType={ !!props?.dates?.data ? 'date' : 'expense'} categories={props.categories} filters={props.filters} />
                
                {!!props?.dates?.data && <IndexTable dates={props.dates} expenseData={props.expenseData} filters={props.filters}/>}

                {!!props?.expenses?.data && <ExpenseTable expenses={props.expenses} expenseData={props.expenseData} filters={props.filters} categories={props.categories}/>}

            </div>
        </AuthenticatedLayout>
    );
}
