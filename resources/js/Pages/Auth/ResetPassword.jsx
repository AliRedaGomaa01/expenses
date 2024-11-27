import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import validatePassword from '@/Helpers/validatePassword.js';
import { useEffect, useState } from 'react';

export default function ResetPassword({ token, email }) {
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (!!passwordError) {
            return;
        }

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="إعادة ضبط كلمة المرور" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="البريد الالكتروني" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
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
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => { setData('password', e.target.value) ; setPasswordError(validatePassword(e.target.value)) }}
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
                        type={showPassword ? "text" : "password"}
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        أعد ضبط كلمة المرور
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
