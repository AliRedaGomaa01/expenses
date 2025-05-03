import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function CreateNewInputs({ data: data, setData: setData, post: post, processing: processing, errors: errors, reset: reset, ...props }) {

  const submit = (e) => {
    e.preventDefault();

    post(route('contacts.store'), {
      onError: (err) => console.log(err),
      onSuccess: () => console.log('success'),
    });
  };

  const addNewContact = (e) => {
    e.preventDefault();

    setData('contacts', [
      ...data.contacts,
      {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
      },
    ]);
  };

  const removeContact = (e, index) => {
    e.preventDefault();

    let isSure = confirm('هل انت متاكد من حذف هذه الحقول؟');
    if (!isSure) return;

    setData('contacts',
      [...data.contacts].filter((_, i) => i !== index),
    );
  };

  return (
    <>
      <form onSubmit={submit}>

        {!!data.contacts && data.contacts.map((contact, index) => (

          <div className={'p-2 my-4 relative rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3' + `${index % 2 == 0 ? ' bg-red-50' : ' bg-blue-50'}`} key={index}>
            <div
              className="absolute top-2 right-2 rounded-full cursor-pointer bg-red-500 w-6 h-6 flex items-center justify-center text-white"
              onClick={(e) => removeContact(e, index)}
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
                onChange={(e) => setData('contacts', [...data.contacts].map((item, idx) => { idx === index ? item['first_name'] = e.target.value : null; return item; }))}
                required
                autoComplete="off"
              />

              <InputError message={errors?.contacts && errors?.contacts[index]['first_name']} className="mt-2" />
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
                onChange={(e) => setData('contacts', [...data.contacts].map((item, idx) => { idx === index ? item['last_name'] = e.target.value : null; return item; }))}
                required
                autoComplete="off"
              />

              <InputError message={errors?.contacts && errors?.contacts[index]['last_name']} className="mt-2" />
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
                onChange={(e) => setData('contacts', [...data.contacts].map((item, idx) => { idx === index ? item['email'] = e.target.value : null; return item; }))}
                autoComplete="off"
              />

              <InputError message={errors?.contacts && errors?.contacts[index]['email']} className="mt-2" />
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
                onChange={(e) => setData('contacts', [...data.contacts].map((item, idx) => { idx === index ? item['phone'] = e.target.value : null; return item; }))}
                required
                autoComplete="off"
              />

              <InputError message={errors?.contacts && errors?.contacts[index]['phone']} className="mt-2" />
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
                onChange={(e) => setData('contacts', [...data.contacts].map((item, idx) => { idx === index ? item['address'] = e.target.value : null; return item; }))}
                autoComplete="off"
              />

              <InputError message={errors?.contacts && errors?.contacts[index]['address']} className="mt-2" />
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
                onChange={(e) => setData('contacts', [...data.contacts].map((item, idx) => { idx === index ? item['notes'] = e.target.value : null; return item; }))}
                autoComplete="off"
              />

              <InputError message={errors?.contacts && errors?.contacts[index]['notes']} className="mt-2" />
            </div>
          </div>
        ))}

        <div className='my-3' >
          <PrimaryButton className='bg-green-700' onClick={addNewContact} > + اضف حقول جديدة</PrimaryButton>
        </div>

        {data.contacts.length > 0 && <div className="mt-4 flex items-center justify-end">
          <PrimaryButton className="ms-4" disabled={processing}>
            إضافة
          </PrimaryButton>
        </div>}
      </form>
    </>
  );
}
