import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Show(props) {
    const [currentExpenses, setCurrentExpenses] = useState(props?.date?.expenses ?? []);
    const [status, setStatus] = useState('');
    const [statusIndex, setStatusIndex] = useState('');

    const { data: data, setData: setData, post: post, processing: processing, errors: errors, reset: reset } = useForm({
        date: props?.date?.date ?? '',
        expenses: [],
    });

    const updateExpense = async (e, index) => {
        const expense = currentExpenses.find((_, idx) => idx === index);
        setStatus('processing');
        setStatusIndex(index);
        await axios.put(route('expenses.update', expense.id), expense)
            .then((res) => {
                if (res.data.status === 'success') {
                    // console.log('deleted');
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

    const deleteExpense = (e, index) => {
        const isSure = confirm('هل انت متاكد من حذف هذه الحقول؟');
        if (!isSure) return;
        const expense = currentExpenses.find((_, idx) => idx === index);
        expense[e.target.name] = e.target.value;
        axios.delete(route('expenses.destroy', expense.id))
            .then((res) => {
                if (res.data.status === 'success') {
                    // console.log('deleted');
                    setCurrentExpenses(prev => prev.filter((_, idx) => idx !== index));
                }
            }).catch((error) => {
                console.log(error);
            });
    }

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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center">

                            <div>
                                <InputLabel htmlFor="date" value="التاريخ" />

                                <TextInput
                                    id="date"
                                    type="date"
                                    name="date"
                                    value={data.date}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    disabled={true}
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                />

                                <InputError message={errors.date} className="mt-2" />
                            </div>

                            {!!currentExpenses && currentExpenses.map((expense, index) => (

                                <div className={'p-2 my-4 relative rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3' + `${index % 2 == 0 ? ' bg-red-50' : ' bg-blue-50'}`} key={index}>
                                    <div
                                        className="absolute top-2 right-2 rounded-full cursor-pointer bg-red-500 w-6 h-6 flex items-center justify-center text-white"
                                        onClick={(e) => deleteExpense(e, index)}
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
                                            onChange={(e) => setCurrentExpenses(prev => [...prev].map((item, idx) => { idx === index ? item['name'] = e.target.value : null; return item; }))}
                                            required
                                            autoComplete="off"
                                        />

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
                                            onChange={(e) => setCurrentExpenses(prev => [...prev].map((item, idx) => { idx === index ? item['price'] = e.target.value : null; return item; }))}
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="category_id" value="تصنيف المشتريات" />

                                        <select name="category_id" id="category_id" className="mt-1 block w-full"
                                            onChange={(e) => setCurrentExpenses(prev => [...prev].map((item, idx) => { idx === index ? item['category_id'] = e.target.value : null; return item; }))}
                                            required
                                            value={expense['category_id']}
                                        >

                                            <option value="" disabled> اختر تصنيف من التالي </option>
                                            {!!props?.categories && props?.categories.map((category, index) => (
                                                <option value={category.id} key={category.id}> {category.name} </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="mt-4">
                                        {statusIndex !== index &&
                                            <PrimaryButton className='bg-blue-700' onClick={(e) => updateExpense(e, index)} > تحديث القيم </PrimaryButton>
                                        }
                                        {status == 'processing' && statusIndex === index &&
                                            <PrimaryButton className='bg-yellow-700' > جاري المعالجة </PrimaryButton>
                                        }
                                        {status == 'success' && statusIndex === index &&
                                            <PrimaryButton className='bg-green-700' > تم بنجاح </PrimaryButton>
                                        }
                                    </div>
                                </div>
                            ))}

                            <div className='my-3' >
                                <PrimaryButton className='bg-green-700' onClick={addNewExpense} > + اضف حقول جديدة</PrimaryButton>
                            </div>

                            <form onSubmit={submit}>
                                {Object.keys(errors).length > 0 && Object.keys(errors).map((key, idx) => (<InputError message={errors[key]} className="mt-2" />))}

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
                                                {!!props?.categories && props?.categories.map((category, index) => (
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
