const Product = require('../models/Product');

exports.create = async (req, res) => {

  console.log( 'req.file', req.file)
  console.log(req.body)
  console.log(req.user)

  const { filename } = req.file
  
  const { productName, productDescription, productPrice, productCategory, productQuantity } = req.body

  try {
    let product = new Product()
    product.fileName = filename
    product.productName = productName
    product.productDescription = productDescription
    product.productPrice = productPrice
    product.productCategory = productCategory
    product.productQuantity = productQuantity
    await product.save()

    .then(response => {
      res.status(201).json({
        message: 'Product created successfully',
        product: response
      })
    })
    
  } catch (error) {
    console.log(error)
  }


}