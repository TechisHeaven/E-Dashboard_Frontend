import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../ui_component/Loader";

const ProductList = () => {
  
  const [product, setProduct] = useState([]);
  const [loader , setLoader] = useState(false);


  useEffect(() => {
    getProduct();
  }, []);
  

  const getProduct = async (req, res) => {
    let userid = JSON.parse(localStorage.getItem("users"));
    if (userid.role === "ADMIN") {
      let result = await fetch("http://localhost:5000/api/product", {
        method: "get",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProduct(result);
    } else {
      let result = await fetch(
        `http://localhost:5000/api/${userid._id}/product`,
        {
          method: "get",
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      result = await result.json();
      setProduct(result);
    }
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/api/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Product deleted successfully");
      getProduct();
    }
  };

  const searchProduct = async (e) => {
    let useridd = JSON.parse(localStorage.getItem("users"));

    if (useridd.role === "ADMIN") {
      let userid = JSON.parse(localStorage.getItem("users"));
      let key = e.target.value;
      if (key) {
        let result = await fetch(
          `http://localhost:5000/api/${userid._id}/admin/search/${key}`,
          {
            headers: {
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        result = await result.json();
        setProduct(result);
      } else {
        getProduct();
      }
    } else {
      let key = e.target.value;
      let userid = JSON.parse(localStorage.getItem("users"));
      if (key) {
        let result = await fetch(
          `http://localhost:5000/api/${userid._id}/search/${key}`,
          {
            headers: {
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        result = await result.json();
        setProduct(result);
      } else {
        getProduct();
      }
    }
  };


  return (
    <div className="product-list">
      <div className="scroll-top">
        <a href="#header">
          <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>
      <h1>Product List</h1>
      <div className="search">
        <input type="text" onChange={searchProduct} placeholder="Search" />
      </div>
      <ul className="product-row">
        <li>S. no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Catogary</li>
        <li>Company</li>
        <li>Operator</li>
      </ul>
      {loader && <Loader />}

      {product.length > 0 ? (
        product.map((items, index) => (
          <ul className="product-col" key={index}>
            <li>{index + 1}</li>
            <li>{items.name}</li>
            <li>₹{items.price}</li>
            <li>{items.category || items.catogary}</li>
            <li>{items.company}</li>

            <li>
              <button onClick={() => deleteProduct(items._id)}>Delete</button>
              <button>
                <Link to={"/update/" + items._id}>Update</Link>
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Product found</h1>
      )}
    </div>
  );
};

export default ProductList;
