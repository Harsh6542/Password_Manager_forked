import React from 'react'
import { useForm } from 'react-hook-form'
import { toast, Bounce } from 'react-toastify';
import axios from 'axios'
import './styles/form.css'
const Form = ({ onSiteAdded }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = async (data) => {
        try {
            console.log("Form data:", data);
            await axios.post('http://localhost:3000', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Site saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            reset();
            if (onSiteAdded) onSiteAdded();
        } catch (err) {
            console.error(err);
            toast.error('Cannot save the site please try again', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        };
    }
    return (
        <div className="py-8">
            <div className="mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-2xl dark:shadow-gray-900 p-8 w-full max-w-lg border border-blue-100 dark:border-gray-700">
                <h1 className='text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent'>Password Manager</h1>
                <p className='text-center text-gray-600 dark:text-gray-400 mb-8'>Add a new site securely</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className='form-lab flex items-center text-sm font-semibold mb-2' htmlFor="name">
                            <span className='text-red-500 mr-1'>*</span>Site Name
                        </label>
                        <input
                            className='form-in w-full px-4 py-3 rounded-lg border-2 border-blue-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                            type="text"
                            id="name"
                            placeholder="e.g., Gmail, Netflix"
                            {...register("name", { required: { value: true, message: "Site name cannot be empty" } })}
                        />
                        {errors.name && <div className="error mt-1 text-sm">{errors.name.message}</div>}
                    </div>

                    <div>
                        <label className='form-lab flex items-center text-sm font-semibold mb-2' htmlFor="username">
                            <span className='text-red-500 mr-1'>*</span>Username/Email
                        </label>
                        <input
                            className='form-in w-full px-4 py-3 rounded-lg border-2 border-blue-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                            type="text"
                            id="username"
                            placeholder="Your username or email"
                            {...register("username", { required: { value: true, message: "Username cannot be empty" } })}
                        />
                        {errors.username && <div className="error mt-1 text-sm">{errors.username.message}</div>}
                    </div>

                    <div>
                        <label className='form-lab flex items-center text-sm font-semibold mb-2' htmlFor="password">
                            <span className='text-red-500 mr-1'>*</span>Password
                        </label>
                        <input
                            className='form-in w-full px-4 py-3 rounded-lg border-2 border-blue-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                            type="password"
                            id="password"
                            placeholder="Your secure password"
                            {...register("password", { required: { value: true, message: "Password cannot be empty" } })}
                        />
                        {errors.password && <div className="error mt-1 text-sm">{errors.password.message}</div>}
                    </div>

                    <button
                        className={(isValid && !isSubmitting) ? 'form-s w-full py-3 px-6 mt-4 rounded-lg font-bold text-white transition-all duration-200 transform hover:scale-105' : 'form-sb w-full py-3 px-6 mt-4 rounded-lg font-bold text-white transition-all'}
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : '+ Add Site'}
                    </button>

                </form>
            </div>

        </div>
    )
}

export default Form
