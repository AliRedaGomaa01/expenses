import Pagination from '@/Components/Pagination';
import EditContacts from './EditContacts';

export default function ContactTable({ contacts, contactData, filters, categories, ...props }) {

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-4">
      <div className="overflow-hidden my-grad shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 text-center">

          {!contacts?.data.length && <div className='text-center p-2 shadow-gray-400 shadow-md my-4'> لا يوجد سجلات </div>}

          {!!contacts?.data.length && <div className="overflow-scroll scrollbar-hide space-y-5">

            <EditContacts contacts={contacts.data} />

            <Pagination {...contacts} />
          </div>}
        </div>
      </div>
    </div>
  );
}
