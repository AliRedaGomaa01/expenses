import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import axios from 'axios';

export default function EditCurrentExpenses({ expenses = [] , ...props }) {
    const [currentExpenses, setCurrentExpenses] = useState( expenses ?? []);
    const [status, setStatus] = useState('');
    const [statusIndex, setStatusIndex] = useState('');

    const updateExpense = async (e, index) => {
        const expense = currentExpenses.find((_, idx) => idx === index);
        setStatus('processing');
        setStatusIndex(index);
        await axios.put(route('expenses.update', expense.id), expense)
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

    const deleteExpense = (e, index) => {
        const isSure = confirm('هل انت متاكد من حذف هذه الحقول؟');
        if (!isSure) return;
        const expense = currentExpenses.find((_, idx) => idx === index);
        expense[e.target.name] = e.target.value;
        axios.delete(route('expenses.destroy', expense.id))
            .then((res) => {
                if (res.data.status === 'success') {
                    setCurrentExpenses(prev => prev.filter((_, idx) => idx !== index));
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
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
            ))
            }
        </>

    );
}
