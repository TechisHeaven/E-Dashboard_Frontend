import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [catogary, setCatogary] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    getProductDetails();
  }, []);


  const getProductDetails = async()=>{
    let result = await fetch(`http://localhost:5000/api/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
    result = await result.json();
    setName(result.name)
    setPrice(result.price)
    setCatogary(result.catogary)
    setCompany(result.company)
  }



  const UpdatePorductBtn = async (req, res) => {

    let result = await fetch(`http://localhost:5000/api/product/${params.id}`, {
        method: "put", 
        body: JSON.stringify({name , price, catogary, company}),
        headers: {
            "content-type": "application/json",
              authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    result = await result.json();
    res.send(result)
    navigate("/")
  };

  return (
    <div className="product-con">
      <div className="container">
        <h1>Update Product</h1>
        <div className="inputfields">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          {!name && (
            <span className="invalid-message">Enter a valid name</span>
          )}

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="off"
            placeholder="Enter price"
          />
          {!price && (
            <span className="invalid-message">Enter a valid price</span>
          )}
          <input
            type="text"
            value={catogary}
            onChange={(e) => setCatogary(e.target.value)}
            placeholder="Enter product catogary"
          />
          {!catogary && (
            <span className="invalid-message">Enter a valid catogary</span>
          )}
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name"
          />
          {!company && (
            <span className="invalid-message">Enter a valid company name</span>
          )}
          <button onClick={UpdatePorductBtn}>Update Product</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
