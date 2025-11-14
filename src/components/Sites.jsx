import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
const Sites = ({ sites, loading, onSiteAdded }) => {

  const [toShow, setToShow] = useState(null);
  const [toEdit, setToEdit] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  let edit = (prompt) => {
    if (window.confirm(`Do you really want to edit ${prompt[0]} details?`)) {
      setToEdit(prompt[1]);
    }
  };

  const handleOnSubmit = (data) => {
    if (window.confirm(`Do you really want to save changes for ${data.name}?`)) {
      onSubmit(data);
    }
  }
  let deleteSite = async (id) => {
    if (window.confirm("Are you sure you want to delete this site?")) {
      try {
        await axios.post('http://localhost:3000/delete', JSON.stringify({ _id: id }), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        toast.success('Site deleted successfully!', {
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
        if (onSiteAdded) {
          onSiteAdded();
        }
      }
      catch (err) {
        console.error(err);
        toast.error('Failed to delete the site.Try again', {
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
      }
    }
  }

const decrypt = async(index) => { 
  try{
  const response = await axios.post('http://localhost:3000/decrypt', JSON.stringify({ password: sites[index].password }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  toast.success(`${response.data.password}`, {
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
  }
  catch(err) {
    console.error(err);
    toast.error('Failed to decrypt the password. Try again', {
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
  }
}

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      await axios.post('http://localhost:3000/saveChanges', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Changes saved successfully!', {
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
      setToEdit(null);
      if (onSiteAdded) onSiteAdded();
    } catch (err) {
      console.error(err);
      toast.error('Failed to Save the changes.Try again', {
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

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="mt-6 heading mb-4">
        <h1 className="mt-5 text-2xl font-bold text-center mb-4 bg-blue-100 p-4 rounded-lg shadow">Saved Sites</h1></div>
      <div className="titles grid grid-cols-4 gap-4 mb-4 border-b-3 border-black pb-2">
        <div className="title-div">Site Name</div>
        <div className="title-div">Username</div>
        <div className="title-div">Password</div>
        <div className="title-div">Actions</div>
      </div>
      <div className="main-sites">
        {sites.map((site, index) => (
          <div key={site._id}>
            {toEdit === index && (
              <form onSubmit={handleSubmit(handleOnSubmit)} className="site-cards">
                <input
                  type="hidden"
                  {...register("_id")}
                  defaultValue={site._id}
                />
                <div className="in site-details">
                  <input
                    className="site-details focus:outline-none focus:border-transparent"
                    type="text"
                    placeholder="Site Name"
                    {...register("name", { required: "Site name is required" })}
                    defaultValue={site.name || ""}
                  />
                  {errors.name && (
                    <div className="error">{errors.name.message}</div>
                  )}
                </div>
                <div className="in site-details">
                  <input
                    className="site-details focus:outline-none focus:border-transparent"
                    type="text"
                    placeholder="Username"
                    {...register("username", { required: "Username is required" })}
                    defaultValue={site.username || ""}
                  />
                  {errors.username && (
                    <div className="error">{errors.username.message}</div>
                  )}
                </div>
                <div className="in site-details">
                  <input
                    className="site-details focus:outline-none focus:border-transparent"
                    type="text"
                    placeholder="Password"
                    {...register("password", { required: "Password is required" })}
                    defaultValue={site.password || ""}
                  />
                  {errors.password && (
                    <div className="error">{errors.password.message}</div>
                  )}
                </div>
                <div className="action text-center">
                  <input
                    className="site-submit"
                    type="submit"
                    value={"Save changes"}
                    disabled={!isValid || isSubmitting}
                  />
                  <input
                    className="site-cancel"
                    type="button"
                    value={"Cancel"}
                    onClick={() => {
                      if (window.confirm("Are you sure you want to cancel editing?")) {
                        toast.error('Cancelled the edit', {
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
                        setToEdit(null);
                      }
                    }}
                  />
                </div>
              </form>)
            }
            {
              (toEdit !== index) && (
                <div className="site-cards">
                  <div className="site-name site-details">{site.name}</div>
                  <div className="site-username site-details">{site.username}</div>
                  {index === toShow ? (
                    <div tabIndex={0}  onKeyDown={
                      e=>{
                        if(e.key === 'P') {
                          decrypt(index);
                          e.preventDefault();
                      }
                    }} className="site-password site-details flex justify-center items-center gap-6">
                      <lord-icon
                        className="cursor-pointer"
                        onClick={() => setToShow(null)}
                        src="https://cdn.lordicon.com/dicvhxpz.json"
                        trigger="click"
                        stroke="bold"
                        state="hover-cross"
                      ></lord-icon>
                      {site.password}
                    </div>
                  ) : (
                    <div className="site-details cursor-pointer" onClick={() => setToShow(index)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/dicvhxpz.json"
                        trigger="click"
                        stroke="bold"
                      ></lord-icon>
                    </div>
                  )}
                  <div className="site-details flex justify-center items-center gap-4">
                    <div className="icons">
                      <lord-icon
                        onClick={() => edit([site.name, index])}
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="click"
                        stroke="bold"
                        state="hover-line">
                      </lord-icon>
                    </div>
                    <div className="icons">
                      <lord-icon
                        onClick={() => deleteSite(site._id)}
                        src="https://cdn.lordicon.com/hwjcdycb.json"
                        trigger="click"
                        stroke="bold"
                        colors="primary:#e83a30,secondary:#c71f16">
                      </lord-icon>
                    </div>
                  </div>
                </div>
              )
            }

          </div>
        ))}
      </div>
    </div>
  );
};

export default Sites;
