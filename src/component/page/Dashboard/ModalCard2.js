import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUrl from "../../hooks/useUrl";
import Loading from "../../Share/Loading";

const ModalCard = ({ product, refetch }) => {
    // console.log(product);
    const [url] = useUrl();
    const [conErr, SetError] = useState(null);
    const [productName, SetProductName] = useState("");
    const [minimumQuantity, SetMinimumQuantity] = useState("");
    const [availableQuantity, SetAvailableQuantity] = useState("");
    const [price, SetPrice] = useState("");
    const [productDescription, SetProductDescription] = useState("");
    const [loading, SetLoading] = useState(false);
    // Error
    let err;
    useEffect(() => {
        SetProductName(product.productName);
        SetMinimumQuantity(product.minimumQuantity);
        SetAvailableQuantity(product.availableQuantity);
        SetPrice(product.price);
        SetProductDescription(product.productDescription);
    }, [product]);
    // --- -- -- -- -- -- -- - - - -  -  -  -  -   -    -

    // Use Form for design and validate
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // --- -- -- -- -- -- -- - - - -  -  -  -  -   -    -
    // Handle Submit
    const handleUpdate = data => {
        // console.log("inside", data);
        SetLoading(true);
        const img = data.img[0];
        const formData = new FormData();
        formData.append("image", img);
        fetch(url, { method: "POST", body: formData })
            .then(res => res.json())
            .then(r => {
                if (r.success) {
                    const imgUrl = r.data.url;
                    data.img = imgUrl;
                    // console.log(data);
                    // Send to server

                    fetch(
                        "https://fierce-savannah-66985.herokuapp.com/updateProduct",
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                authorization: `Bearer ${localStorage.getItem(
                                    "access-token-12"
                                )}`,
                            },
                            body: JSON.stringify(data),
                        }
                    )
                        .then(res => res.json())
                        .then(data => {
                            SetLoading(false);
                            if (data.modifiedCount) {
                                toast("Update Successfully");
                                refetch();
                            }
                        });
                }
            })
            .catch(err => console.error(err));
    };
    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            {/* <!-- Put this part before </body> tag --> */}
            <input
                type="checkbox"
                id="product-update"
                className="modal-toggle z-60"
            />
            <div className="modal pt-14">
                <div className="modal-box relative">
                    <div className="text-center text-2xl my-2">
                        Update Product
                    </div>
                    <label
                        htmlFor="product-update"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <>
                        {/* Form */}
                        <form
                            className="flex flex-col w-full mx-auto gap-4"
                            onSubmit={handleSubmit(handleUpdate)}
                        >
                            {/* Input Person Name */}
                            <label className="label">
                                <span className="label-text">Name:</span>
                            </label>
                            <input
                                type="text"
                                autoComplete="name"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is Required.",
                                    },
                                    pattern: {
                                        value: /[A-Za-z]{3}/,
                                        message: "Provide a valid Name.",
                                    },
                                })}
                                placeholder="Your Name"
                                className="input input-bordered input-accent w-full"
                                value={product.name || ""}
                                readOnly
                            />
                            {errors.name?.type === "required" && (
                                <span className="label-text-alt text-lg text-red-500">
                                    {errors.name.message}{" "}
                                </span>
                            )}
                            {errors.name?.type === "pattern" && (
                                <span className="label-text-alt text-lg text-red-500">
                                    {errors.name.message}{" "}
                                </span>
                            )}
                            {/* --- --- --- */}
                            <>
                                {/* Input Person Email */}
                                <label className="label">
                                    <span className="label-text">Email:</span>
                                </label>
                                <input
                                    type="email"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is Required.",
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: "Provide a valid Email.",
                                        },
                                    })}
                                    placeholder="Your Email"
                                    className="input input-bordered input-accent w-full"
                                    value={product.email || ""}
                                    readOnly
                                />
                                {errors.email?.type === "required" && (
                                    <span className="label-text-alt text-lg text-red-500">
                                        {errors.email.message}{" "}
                                    </span>
                                )}
                                {errors.email?.type === "pattern" && (
                                    <span className="label-text-alt text-lg text-red-500">
                                        {errors.email.message}{" "}
                                    </span>
                                )}
                                {/* --- --- --- */}
                            </>
                            <>
                                {/* Input Product name */}
                                <label className="label">
                                    <span className="label-text">
                                        {" "}
                                        Product name:
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    autoComplete="Product Name"
                                    {...register("productName", {
                                        required: {
                                            value: true,
                                            message:
                                                "product Name is Required.",
                                        },
                                    })}
                                    placeholder="Product Name"
                                    className="input input-bordered input-accent w-full"
                                    value={productName || ""}
                                    onChange={e =>
                                        SetProductName(e.target.value)
                                    }
                                />
                                {errors.productName?.type === "required" && (
                                    <span className="label-text-alt text-lg text-red-500">
                                        {errors.productName.message}{" "}
                                    </span>
                                )}
                                {/* --- --- --- */}
                                {/* Input Minimum Quantity */}
                                <label className="label">
                                    <span className="label-text">
                                        {" "}
                                        Minimum Quantity:
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    autoComplete="Minimum Quantity"
                                    {...register("minimumQuantity", {
                                        required: {
                                            value: true,
                                            message:
                                                "Minimum Quantity is Required.",
                                        },
                                    })}
                                    placeholder="Minimum Quantity"
                                    className="input input-bordered input-accent w-full"
                                    value={minimumQuantity || ""}
                                    onChange={e =>
                                        SetMinimumQuantity(e.target.value)
                                    }
                                />
                                {errors.minimumQuantity?.type ===
                                    "required" && (
                                    <span className="label-text-alt text-lg text-red-500">
                                        {errors.minimumQuantity.message}{" "}
                                    </span>
                                )}
                                {/* --- --- --- */}
                                {/* Input Available Quantity */}
                                <label className="label">
                                    <span className="label-text">
                                        Available Quantity:
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    autoComplete="Available Quantity"
                                    {...register("availableQuantity", {
                                        required: {
                                            value: true,
                                            message:
                                                "Available Quantity is Required.",
                                        },
                                    })}
                                    placeholder="Available Quantity"
                                    className="input input-bordered input-accent w-full"
                                    value={availableQuantity || ""}
                                    onChange={e =>
                                        SetAvailableQuantity(e.target.value)
                                    }
                                />
                                {errors.availableQuantity?.type ===
                                    "required" && (
                                    <span className="label-text-alt text-lg text-red-500">
                                        {errors.availableQuantity.message}{" "}
                                    </span>
                                )}
                                {/* --- --- --- */}
                                {/* Input Price Per Unit */}
                                <label className="label">
                                    <span className="label-text">
                                        Price Per Unit:
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    autoComplete="Price Per Unit"
                                    {...register("price", {
                                        required: {
                                            value: true,
                                            message:
                                                "Price Per Unit is Required.",
                                        },
                                    })}
                                    placeholder="Price Per Unit"
                                    className="input input-bordered input-accent w-full"
                                    value={price || ""}
                                    onChange={e => SetPrice(e.target.value)}
                                />
                                {errors.price?.type === "required" && (
                                    <span className="label-text-alt text-lg text-red-500">
                                        {errors.price.message}{" "}
                                    </span>
                                )}
                                {/* --- --- --- */}
                                {/* Input Product Description */}
                                <label className="label">
                                    <span className="label-text">
                                        Product Description:
                                    </span>
                                </label>
                                <textarea
                                    type="text"
                                    autoComplete="Product Description"
                                    {...register("productDescription", {
                                        required: {
                                            value: true,
                                            message:
                                                "Product Description is Required.",
                                        },
                                    })}
                                    placeholder="product Description"
                                    className="input input-bordered input-accent w-full"
                                    value={productDescription || ""}
                                    onChange={e =>
                                        SetProductDescription(e.target.value)
                                    }
                                />
                                {errors.productDescription?.type ===
                                    "required" && (
                                    <span className="label-text-alt text-lg text-red-500">
                                        {errors.productDescription.message}{" "}
                                    </span>
                                )}
                                {/* --- --- --- */}
                                {/* Input File */}
                                <input
                                    type="file"
                                    autoComplete="file"
                                    {...register("img", {
                                        required: {
                                            value: true,
                                            message: "Image is Required.",
                                        },
                                    })}
                                    placeholder="Your Image"
                                    className="btn btn-sm btn-outline w-full my-1"
                                />
                                {errors.email?.type === "required" && (
                                    <span className="label-text-alt text-lg text-red-500">
                                        {errors.email.message}{" "}
                                    </span>
                                )}
                                {/* --- --- --- */}
                            </>

                            {/* Error Show */}
                            {err && (
                                <span className="label-text-alt text-lg text-red-500">
                                    {err}
                                </span>
                            )}
                            {/* --- --- --- */}
                            {/* Error Show */}
                            {conErr && (
                                <span className="label-text-alt text-lg text-red-500">
                                    {conErr}
                                </span>
                            )}
                            {/* --- --- --- */}
                            <input
                                type="submit"
                                value="Update Product"
                                className="btn btn-primary w-full"
                            />
                        </form>
                        {/* -- -- - */}
                    </>
                </div>
            </div>
        </div>
    );
};

export default ModalCard;
