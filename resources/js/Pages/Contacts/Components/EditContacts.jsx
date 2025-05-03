import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import axios from 'axios';

export default function EditContacts({ contacts = [], categories, ...props }) {
  const [currentContacts, setCurrentContacts] = useState(contacts ?? []);
  const [status, setStatus] = useState('');
  const [statusIndex, setStatusIndex] = useState('');

  const updateContact = async (e, index) => {
    const contact = currentContacts.find((_, idx) => idx === index);
    setStatus('processing');
    setStatusIndex(index);
    await axios.put(route('contacts.update', contact.id), contact)
      .then((res) => {
        if (res.data.status === 'success') {
          setStatus('success');
        }
      }).catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setStatus('');
      setStatusIndex('');
    }, 2000);
  }

  const deleteContact = (e, index) => {
    const isSure = confirm('هل انت متاكد من حذف هذه الحقول؟');
    if (!isSure) return;
    const contact = currentContacts.find((_, idx) => idx === index);
    contact[e.target.name] = e.target.value;
    axios.delete(route('contacts.destroy', contact.id))
      .then((res) => {
        if (res.data.status === 'success') {
          setCurrentContacts(prev => prev.filter((_, idx) => idx !== index));
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {!!currentContacts && [...currentContacts].map((contact, index) => (
        <div key={index} className="">

          <div className={'p-2 my-4 relative rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3' + `${index % 2 == 0 ? ' bg-red-50' : ' bg-blue-50'}`} >
            <div
              className="absolute top-2 right-2 rounded-full cursor-pointer bg-red-500 w-6 h-6 flex items-center justify-center text-white"
              onClick={(e) => deleteContact(e, index)}
            >
              X
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="first_name" value="الاسم الاول" />

              <TextInput
                id="first_name"
                type="text"
                name="first_name"
                placeholder="الاسم الاول"
                value={contact.first_name}
                className="mt-1 block w-full"
                onChange={(e) => setCurrentContacts(prev => [...prev].map((item, idx) => { idx === index ?  item['first_name']= e.target.value : null; return item; }))}
                required
                autoComplete="off"
              />

            </div>

            <div className="mt-4">
              <InputLabel htmlFor="last_name" value="الاسم الأخير" />

              <TextInput
                id="last_name"
                type="text"
                name="last_name"
                placeholder="الاسم الأخير"
                value={contact.last_name}
                className="mt-1 block w-full"
                onChange={(e) => setCurrentContacts(prev => [...prev].map((item, idx) => { idx === index ? item['last_name'] = e.target.value : null; return item; }))}
                required
                autoComplete="off"
              />

            </div>

            <div className="mt-4">
              <InputLabel htmlFor="email" value="البريد الاكتروني" />

              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="البريد الاكتروني"
                value={contact.email}
                className="mt-1 block w-full"
                onChange={(e) => setCurrentContacts(prev => [...prev].map((item, idx) => { idx === index ? item['email'] = e.target.value : null; return item; }))}
                autoComplete="off"
              />

            </div>


            <div className="mt-4">
              <InputLabel htmlFor="phone" value="الهاتف" />

              <TextInput
                id="phone"
                type="text"
                name="phone"
                placeholder="الهاتف"
                value={contact.phone}
                className="mt-1 block w-full"
                onChange={(e) => setCurrentContacts(prev => [...prev].map((item, idx) => { idx === index ? item['phone'] = e.target.value : null; return item; }))}
                required
                autoComplete="off"
              />

            </div>

            <div className="mt-4">
              <InputLabel htmlFor="address" value="العنوان" />

              <TextInput
                id="address"
                type="text"
                name="address"
                placeholder="العنوان"
                value={contact.address}
                className="mt-1 block w-full"
                onChange={(e) => setCurrentContacts(prev => [...prev].map((item, idx) => { idx === index ?  item['address'] = e.target.value : null; return item; }))}
                autoComplete="off"
              />

            </div>

            <div className="mt-4">
              <InputLabel htmlFor="notes" value="ملاحظة" />

              <TextInput
                id="notes"
                type="text"
                name="notes"
                placeholder="ملاحظة"
                value={contact.notes}
                className="mt-1 block w-full"
                onChange={(e) => setCurrentContacts(prev => [...prev].map((item, idx) => { idx === index ? item['notes'] = e.target.value : null; return item; }))}
                autoComplete="off"
              />

            </div>

          </div>
          <div className="mt-4 grid justify-items-stretch">
            {statusIndex !== index &&
              <PrimaryButton btnClassName='!bg-blue-700' onClick={(e) => updateContact(e, index)} > تحديث القيم </PrimaryButton>
            }
            {status == 'processing' && statusIndex === index &&
              <PrimaryButton btnClassName='!bg-yellow-700' > جاري المعالجة </PrimaryButton>
            }
            {status == 'success' && statusIndex === index &&
              <PrimaryButton btnClassName='!bg-green-700' > تم بنجاح </PrimaryButton>
            }
          </div>

        </div>

      ))
      }
    </>

  );
}
