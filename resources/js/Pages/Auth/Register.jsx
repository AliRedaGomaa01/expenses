import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import validatePassword from '@/Helpers/validatePassword.js';
import {  useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        if (!!passwordError) {
            return;
        }
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="تسجيل الدخول" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="الاسم" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="البريد الإلكتروني" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        onChange={(e) => { setData('password', e.target.value) ; setPasswordError(validatePassword(e.target.value)) }}
                        required
                    />

                    <small className='text-sm text-blue-600 underline inline cursor-pointer' onClick={() => setShowPassword( prev => !prev )} > { !showPassword ?  ' عرض كلمة المرور ' : 'اخفاء كلمة المرور' } </small>

                    <InputError message={errors.password} className="mt-2" />
                    <InputError message={passwordError} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="تأكيد كلمة المرور"
                    />

                    <TextInput
                        id="password_confirmation"
                        type={showPassword ? "text" : "password"}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        مسجل بالفعل؟
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        تسجيل
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
