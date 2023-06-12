import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const img_hosting_token = import.meta.env.VITE_image_upload_token;

const AddClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    setLoading(true); // Set loading state to true

    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name, price, seats } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            seats: parseFloat(seats),
            instructor: user?.displayName,
            email: user?.email,
            image: imgURL,
            status: "pending",
            enrolled: 0,
          };
          console.log(newItem);
          axiosSecure.post("/addclass", newItem).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            setLoading(false); // Set loading state to false after API request is completed
          });
        }
      });
  };

  return (
    <div className="w-full px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text font-semibold">Class Name</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full my-2">
          <label className="label">
            <span className="label-text font-semibold">Class Image</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>
        <div className="flex gap-5 my-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Seats</span>
            </label>
            <input
              type="seats"
              {...register("seats", { required: true })}
              placeholder="10"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Price</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="100.00"
              className="input input-bordered w-full "
            />
          </div>
        </div>
        <div className="flex gap-5 my-2">
          <div className="w-full">
            <label className="label">
              <span className="label-text font-semibold">Instructor</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={user?.displayName}
              disabled
            />
          </div>
          <div className="w-full">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={user?.email}
              disabled
            />
          </div>
        </div>

        <input
          className="btn btn-warning mt-8"
          type="submit"
          value={loading ? "Adding..." : "Add Class"}
          disabled={loading} // Disable the button while loading
        />
      </form>
    </div>
  );
};

export default AddClass;
