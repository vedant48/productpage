import React, {useState, useEffect} from 'react'
import isEmpty from 'validator/lib/isEmpty';
import { createCategory, getCategories } from '../api/category'
import { createProduct } from '../api/product'
import { showErrorMessage, showSuccessMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';

const AdminDashboard = () => {

  const [loading, setLoading] = useState(false);

  const [category , setCategory] = useState('')
  const [categories, setCategories] = useState('')

  const [productData, setProductData] = useState({
    productImage: null,
    productName: '',
    productDescription: '',
    productPrice: '',
    productCategory: '',
    productQuantity: '',
  })

  const {productImage, productName, productDescription, productPrice, productCategory, productQuantity} = productData;

  const handleProductImage = (e) => {
    console.log(e.target.files[0])
    setProductData({...productData, productImage: e.target.files[0]})
  }

  const handleProductChange = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value})
  }

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (productImage === null || isEmpty(productName) || isEmpty(productDescription) || isEmpty(productPrice) || isEmpty(productCategory) || isEmpty(productQuantity)) {
      console.log('Please fill all fields')
    } else {
      let formData = new FormData();
      formData.append('productImage', productImage);
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('productPrice', productPrice);
      formData.append('productCategory', productCategory);
      formData.append('productQuantity', productQuantity);
      console.log([...formData])
      createProduct(formData)
      .then(response => {
        setProductData({
          productImage: null,
          productName: '',
          productDescription: '',
          productPrice: '',
          productCategory: '',
          productQuantity: '',
        })
      })
      .catch(err => {
        console.log(err)
      })      
    }
    console.log(productData)
  }

  useEffect(() => {
    loadCategories()
  }, [loading])

  const loadCategories = async () => {
    await getCategories()
    .then((response) => {
      setCategories(response.data)
      console.log('categories', response.data)
    }
    )
    .catch((error) => {
      console.log('loadCategories error', error)
    }
    )
  }


  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    // console.log(category)
  }

  const handleCategorySubmit = (e) => {
    e.preventDefault()
    if (isEmpty(category)) {
      alert('Please enter a category')
    } else {
      const data = { name: category }
      createCategory(data)
        .then(response => {
          setCategory('')
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      }

  }


  const showHeader = () => (
    <div className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>
            <i class="fa-solid fa-house"> Dashboard</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )

  const showActionBtns = () => (
    <div className="bg-light my-2">
      <div className="container">
        <div className="row pb3">
          <div className="col-md-4 my-1">
            <button className="btn btn-outline-secondary btn-block" data-toggle='modal' data-target='#addCategoryModal'>
              <i className="fas fa-plus-circle"></i> Create Category
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button className="btn btn-outline-warning btn-block" data-toggle='modal' data-target='#addProductModal'>
              <i className="fas fa-plus-circle"></i> Add Product
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button className="btn btn-outline-success btn-block">
              <i className="fa-solid fa-wallet"></i> View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const showCategoryModal = () => (
    <div className="modal fade" id="addCategoryModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
        <form onSubmit={handleCategorySubmit}>

          <div className="modal-header bg-info text-white">
            <h5 className="modal-title" id="exampleModalLabel">Add New Category</h5>
            <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Category Name:</label>
                <input type="text" className="form-control" id="recipient-name" 
                name='category' 
                value={category} 
                onChange={handleCategoryChange} />
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Add Category</button>
          </div>

        </form>
        </div>
      </div> 
    </div>
  )

  const showProductModal = () => (
    <div className="modal fade" id="addProductModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
        <form onSubmit={handleProductSubmit}>
          <div className="modal-header bg-warning text-white">
            <h5 className="modal-title" id="exampleModalLabel">Add New Product</h5>
            <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

              <div className="form-group mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Upload Image</label>
                <input name='productImage'onChange={handleProductImage} class="form-control" type="file" id="formFile"/>
              </div>

              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Product Name:</label>
                <input type="text" name='productName' value={productName} onChange={handleProductChange} className="form-control" id="recipient-name" />
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Product Minimum Bid:</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">₹</span>
                  <input name='productPrice' value={productPrice} onChange={handleProductChange} type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Product Description:</label>
                <textarea name='productDescription' value={productDescription} onChange={handleProductChange} type="text" className="form-control" id="recipient-name" rows = '3' ></textarea>
              </div>
              <div className="form-row" id="recipient-name">
                <div className="form-group col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">Product Category:</label>
                  <select name='productCategory' onChange={handleProductChange} className="custom-select mr-sm-2">
                    <option value='' selected>Choose Category</option>
                     {
                      categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                      ))
                     }
                  </select>
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="recipient-name" className="col-form-label">Product Quantity:</label>
                <input name='productQuantity' value={productQuantity} onChange={handleProductChange} type="number" min='0' className="form-control" id="recipient-name" />
              </div>
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )

  return (
    <section>
      
      {showHeader()}
      {showActionBtns()}
      {showCategoryModal()}
      {showProductModal()}

    </section>
  )
}

export default AdminDashboard