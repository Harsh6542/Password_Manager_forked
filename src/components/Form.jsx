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
        <div>
            <div className="m-auto border-2 border-blue-300 bg-white rounded-lg shadow-emerald-400 shadow-lg p-8 w-[50vw]">
                <h1 className='text-2xl font-bold text-center mb-20'>Add a new site</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-1">
                    <div className="lab">
                        <span className='text-red-500'>*</span><label className='form-lab' htmlFor="name">Name of the site</label>
                    </div>

                    <div className="in">
                        <input
                            className='form-in'
                            type="text"
                            id="name"
                            {...register("name", { required: { value: true, message: "Site name cannot be blanked" } })}
                        />
                        {errors.name && <div className="error">{errors.name.message}</div>}
                    </div>
                    <div className="lab">
                        <span className='text-red-500'>*</span><label className='form-lab' htmlFor="username">Username</label>
                    </div>
                    <div className="in">
                        <input
                            className='form-in'
                            type="text"
                            id="username"
                            {...register("username", { required: { value: true, message: "Username cannot be blanked" } })}
                        />
                        {errors.username && <div className="error">{errors.username.message}</div>}
                    </div>
                    <div className="lab">
                        <span className='text-red-500'>*</span><label className='form-lab' htmlFor="password">Password</label>
                    </div>
                    <div className="in">
                        <input
                            className='form-in'
                            type="password"
                            id="password"
                            {...register("password", { required: { value: true, message: "Password cannot be blanked" } })}
                        />
                        {errors.password && <div className="error">{errors.password.message}</div>}
                    </div>
                    <input
                        className={(isValid && !isSubmitting) ? 'form-s' : 'form-sb'}
                        type="submit"
                        value="Add site"
                        disabled={!isValid || isSubmitting}
                    />

                </form>
            </div>

        </div>
    )
}

export default Form
