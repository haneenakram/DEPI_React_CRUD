import { useState, useEffect } from "react";

//re-redner (ref)

//state dynamic
//state private data
export default function CreateProduct({
  product,
  handelChange,
  handelSubmit,
  actionButton,
  children,
  setProduct
}) {
  const handleClear = () => {
    setProduct({
      name: "",
      cat: "",
      price: "",
      description: "",
      id: 0,
    });
  };
  return (
    <div className="w-75 mx-auto py-5 px-3 rounded-3 shadow-lg mt-5">
      <h1>CRUD Project</h1>
      <form id="product-form" onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="product_name" className="form-label">
            Proudct Name
          </label>
          <input
            type="text"
            className="form-control"
            id="product_name"
            placeholder="Product Name"
            value={product.name}
            name="name"
            onChange={handelChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="product_category" className="form-label">
            Product Category
          </label>
          <input
            type="text"
            className="form-control"
            id="product_category"
            placeholder="Product Category"
            name="cat"
            value={product.cat}
            onChange={handelChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="product_price" className="form-label">
            Product Price
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="product_price"
            placeholder="Product Price"
            name="price"
            value={product.price}
            onChange={handelChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prodct_desc" className="form-label">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="prodct_desc"
            rows={3}
            required
            value={product.description}
            name="description"
            onChange={handelChange}
          />
        </div>
        {children}
        <button className="btn btn-primary" onClick={handleClear}>
          Clear
        </button>
      </form>
    </div>
  );
}
