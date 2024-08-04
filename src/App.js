import { useState } from "react";
import CreateProduct from "./CreateProduct";
import SearchBar from "./SearchBar";
import ProductsTable from "./ProductsTable";
import "./App.css";
import WariningMessage from "./WarningMessage";
import uniqid from "uniqid";
import Swal from "sweetalert2";

//products
//data = index product to update

//state dy
//state private
// change state => re-render
// initilze state by props
// override state [object, array]
//take deep copy
//override copy
//pass new state to setState
// outside return state prev value => state mash
// use local storage

const key = "products";
const initialProducts = JSON.parse(localStorage.getItem(key)) || [];

const updateLocalStorage = (newProducts) => {
  localStorage.setItem(key, JSON.stringify(newProducts));
};
function App() {
  var uniqid = require("uniqid");

  //state
  const [products, setProducts] = useState(initialProducts); //lifiting up
  const [updatedProductIndex, setUpdatedProductIndex] = useState(-1);
  const [product, setProduct] = useState({
    name: "",
    cat: "",
    price: "",
    description: "",
  });
  const [updatedProduct, setUpdatedProduct] = useState(null);
  // const [filterProducts, setFilterProducts] = useState(null);

  //effects

  //functions (handlers)
  //for handelsubmit
  const addProduct = () => {
    const newProducts = [...products];
    newProducts.push(product);
    updateLocalStorage(newProducts);
    setProducts(newProducts);
    setProduct({
      name: "",
      cat: "",
      price: "",
      description: "",
      id: 0,
    });
  };

  const updateProduct = () => {
    //copy
    const updatedProducts = products.map((product, index) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      } else {
        return product;
      }
    });
    //setState
    updateLocalStorage(updatedProducts);
    setProducts(updatedProducts);
    setUpdatedProduct(null);
    setUpdatedProductIndex(-1);
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Your work has been updated",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //for product table
  const deleteProduct = (item) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedProducts = JSON.parse(localStorage.getItem(key)).filter(
            (product, index) => product.id !== item.id
          );
          updateLocalStorage(updatedProducts);
          setProducts(updatedProducts);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  //for searchbar
  const filterProducts = (e) => {
    const value = e.target.value;
    // console.log(value);

    const filterProducts = products.filter((product) =>
      product.name.includes(value)
    );
    // console.log(filterProducts);
    if (filterProducts.length === 0) {
      initialzeProducts();
      console.log("there's no results!");
    } else {
      setProducts(filterProducts);
    }
  };

  //for createproduct
  const handelChangeOfProduct = (e) => {
    if (updatedProduct) {
      setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value, id: uniqid() });
    }
  };

  //for createproduct
  const handelSubmit = (e) => {
    e.preventDefault();
    if (updatedProduct) {
      updateProduct();
    } else {
      addProduct();
    }
  };

  //for product table
  const handelUpdatedProduct = (productToProduct, index) => {
    console.log(index);

    initialzeProducts();
    setUpdatedProduct(productToProduct);
    setUpdatedProductIndex(index);
  };

  const initialzeProducts = () =>
    setProducts(
      (prevState) => [...JSON.parse(localStorage.getItem(key))] || []
    );

  return (
    <>
      <CreateProduct
        product={updatedProduct ? updatedProduct : product}
        handelChange={handelChangeOfProduct}
        handelSubmit={handelSubmit}
        setProduct={setProduct}
      >
        <button id="create-btn" className="btn btn-primary">
          {updatedProduct ? "Update Product" : "Add Product"}
        </button>
      </CreateProduct>

      <SearchBar filterProducts={filterProducts} />
      {products.length > 0 ? (
        <ProductsTable
          products={products}
          handelUpdatedProduct={handelUpdatedProduct}
          deleteProductByIndex={deleteProduct}
        />
      ) : (
        <WariningMessage />
      )}
    </>
  );
}

export default App;
