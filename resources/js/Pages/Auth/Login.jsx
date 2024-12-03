import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'test@aly-h.com',
        password: 'Test',
        remember: false,
    });

    const [isForTest, setIsForTest] = useState(false);

    useEffect(() => {
        if (isForTest == true) {
            setData('email', 'test@aly-h.com');
            setData('password', 'Test$123$');
        }
    }, [isForTest]);

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="تسجيل الدخول" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} id='loginForm'>
                <div>
                    <InputLabel htmlFor="email" value="البريد الالكتروني" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="كلمة المرور" />

                    <TextInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <small className='text-sm text-blue-600 underline inline cursor-pointer' onClick={() => setShowPassword(prev => !prev)} > {!showPassword ? ' عرض كلمة المرور ' : 'اخفاء كلمة المرور'} </small>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={isForTest}
                            onChange={(e) => setIsForTest(prev => !prev)}
                        />
                        <span className="ms-2 text-sm text-gray-600">
                        هل تريد اختبار البرنامج فقط ؟ 
                        </span>
                    </label>
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            تذكرني
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            نسيت كلمة المرور؟
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        تسجيل الدخول
                    </PrimaryButton>
                </div>
            </form>

        </GuestLayout>
    );
}
