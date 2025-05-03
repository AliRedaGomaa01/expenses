import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IndexSearch from './Components/IndexSearch';
import ContactTable from './Components/ContactTable';
import IndexTest from './Components/IndexTest';

export default function Index(props) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    جهات الاتصال
                </h2>
            }
        >
            <Head title="جهات الاتصال" />


            <div className="py-12">

                <IndexTest auth={props.auth} />

                <IndexSearch categories={props.categories} filters={props.filters} />
                
                {!!props?.contacts?.data && <ContactTable contacts={props.contacts} contactData={props.contactData} filters={props.filters} categories={props.categories}/>}

            </div>
        </AuthenticatedLayout>
    );
}
