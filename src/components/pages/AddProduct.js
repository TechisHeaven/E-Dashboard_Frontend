import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [catogary, setCatogary] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProductbtn = async () => {
    if (!name || !price || !catogary || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("users"))._id;
    await fetch("http://localhost:5000/api/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, catogary, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    alert("Success");
    setName("");
    setPrice("");
    setCatogary("");
    setCompany("");
  };

  

  return (
    <div className="product-con">
      <div className="container">
        <h1>Add Product</h1>
        <div className="inputfields">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          {error && !name && (
            <span className="invalid-message">Enter a valid name</span>
          )}

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="off"
            placeholder="Enter price"
          />
          {error && !price && (
            <span className="invalid-message">Enter a valid price</span>
          )}
          <input
            type="text"
            value={catogary}
            onChange={(e) => setCatogary(e.target.value)}
            placeholder="Enter product catogary"
          />
         

          {error && !catogary && (
            <span className="invalid-message">Enter a valid catogary</span>
          )}
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name"
          />

          {error && !company && (
            <span className="invalid-message">Enter a valid company name</span>
          )}
          <button onClick={addProductbtn}>Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
