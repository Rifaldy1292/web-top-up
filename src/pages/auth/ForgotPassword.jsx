import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FormLayout from '@/Layouts/FormLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <FormLayout>
            <Head title="Forgot Password" />

            {/* Logo & Title */}
            <div className="text-center">
                <Link href={route('login')}></Link>
                <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">Forgot Your Password?</h2>
                <p className="mt-1 text-sm text-gray-600">
                    No worries! Enter your email and we’ll send you a reset link.
                </p>
            </div>

            {/* Status Message */}
            {status && <div className="text-center text-sm font-medium text-green-600">{status}</div>}

            {/* Form */}
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        placeholder="Enter your email"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Button & Link */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Link href={route('login')} className="text-sm text-blue-600 hover:underline">
                        Back to Login
                    </Link>

                    <PrimaryButton
                        className="w-full rounded-md bg-red-500 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-red-700 sm:w-auto"
                        disabled={processing}
                    >
                        Send Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </FormLayout>
    );
}
