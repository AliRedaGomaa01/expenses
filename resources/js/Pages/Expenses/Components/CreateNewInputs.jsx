import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function CreateNewInputs({ data: data, setData: setData, post: post, processing: processing, errors: errors, reset: reset, categories  , ...props  }) {

    const submit = (e) => {
        e.preventDefault();

        post(route('expenses.store'), {
            onFinish: () => console.log('finished'),
        });
    };

    const addNewExpense = (e) => {
        e.preventDefault();

        setData('expenses', [
            ...data.expenses,
            {
                name: '',
                price: '',
                category_id: '1',
            },
        ]);
    };

    const removeExpense = (e, index) => {
        e.preventDefault();

        let isSure = confirm('هل انت متاكد من حذف هذه الحقول؟');
        if (!isSure) return;

        setData('expenses',
            [...data.expenses].filter((_, i) => i !== index),
        );
    };

    return (
        <>
            <div className='my-3' >
                <PrimaryButton className='bg-green-700' onClick={addNewExpense} > + اضف حقول جديدة</PrimaryButton>
            </div>

            <form onSubmit={submit}>

                {!!data.expenses && data.expenses.map((expense, index) => (

                    <div className={'p-2 my-4 relative rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3' + `${index % 2 == 0 ? ' bg-red-50' : ' bg-blue-50'}`} key={index}>
                        <div
                            className="absolute top-2 right-2 rounded-full cursor-pointer bg-red-500 w-6 h-6 flex items-center justify-center text-white"
                            onClick={(e) => removeExpense(e, index)}
                        >
                            X
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="اسم المشتريات" />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                placeholder="مثال : فواكه - لحوم - شحن هاتف - دواء - تسوق - فواتير - طلبات ديليفري -  ..."
                                value={expense.name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('expenses', [...data.expenses].map((item, idx) => { idx === index ? item['name'] = e.target.value : null; return item; }))}
                                required
                                autoComplete="off"
                            />

                            <InputError message={errors?.expenses && errors?.expenses[index]['name']} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="price" value="سعر المشتريات" />

                            <TextInput
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                value={expense.price}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('expenses', [...data.expenses].map((item, idx) => { idx === index ? item['price'] = e.target.value : null; return item; }))}
                                required
                                autoComplete="off"
                            />

                            <InputError message={errors?.expenses && errors?.expenses[index]['price']} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="category_id" value="تصنيف المشتريات" />

                            <select name="category_id" id="category_id" className="mt-1 block w-full"
                                onChange={(e) => setData('expenses', [...data.expenses].map((item, idx) => { idx === index ? item['category_id'] = e.target.value : null; return item; }))}
                                required
                                value={expense['category_id']}
                            >
                                <option value="" disabled> اختر تصنيف من التالي </option>
                                {!! categories && categories.map((category, index) => (
                                    <option value={category.id} key={category.id}> {category.name} </option>
                                ))}

                            </select>

                            <InputError message={errors?.expenses && errors?.expenses[index]['category_id']} className="mt-2" />
                        </div>
                    </div>
                ))}

                {data.expenses.length > 0 && <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        إضافة
                    </PrimaryButton>
                </div>}
            </form>
        </>
    );
}
