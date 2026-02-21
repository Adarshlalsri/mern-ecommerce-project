import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
dotenv.config();

console.log("Merchant ID:", process.env.BRAINTREE_MERCHANT_ID);
console.log("Public Key:", process.env.BRAINTREE_PUBLIC_KEY);
console.log("Private Key:", process.env.BRAINTREE_PRIVATE_KEY);
//PAYEMENT GATEWAY
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be < 1MB" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Products created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
    });
  }
};

// Get All Products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "All Products",

      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

//get single product

export const getSingleProductController = async (req, res) => {
  try {
    const products = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category"); // agar category bhi dikhani ho

    if (!products) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single product fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};

//get photo productPhotoController
export const productPhotoController = async (req, res) => {
  try {
    const products = await productModel
      .findById(req.params.pid)
      .select("photo");

    if (products?.photo?.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

// DELETE PRODUCT CONTROLLER
export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;

    const Products = await productModel.findByIdAndDelete(pid);

    if (!Products) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      Products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//Update product conrtoller

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be < 1MB" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true },
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Products updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update product",
    });
  }
};

//filter
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body; // frontend se aayega

    let args = {};

    // category filter
    if (checked.length > 0) args.category = checked;

    // price filter
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

    // query in DB
    const products = await productModel.find(args);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in filtering products",
      error,
    });
  }
};

// 👉 Count API
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};

// 👉 Product List with Pagination
// export const productListController = async (req, res) => {
//   try {
//     const perPage = 9; // ek page pr 9 products
//     const page = req.params.page ? req.params.page : 1;

//     const products = await productModel
//       .find({})
//       .select("-photo")
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .sort({ createdAt: -1 });

//     res.status(200).send({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error in per page ctrl",
//       error,
//     });
//   }
// };

// Product List with Dynamic Limit
export const productListController = async (req, res) => {
  try {
    const page = Number(req.params.page) || 1;
    const limit = Number(req.query.limit) || 9; // default 9

    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product pagination",
      error,
    });
  }
};

//searchProductController

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

//related-similar product
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    // Find all products in the same category except the current product
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid }, // $ne => not equal to (मतलब इस product को छोड़कर बाकी)
      })
      .select("-photo") // photo exclude कर दिया (performance के लिए)
      .limit(4) // सिर्फ 4 similar products लाओ
      .populate("category"); // category details भी लाओ

    res.status(200).send({
      success: true,
      message: "Similar products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting related products",
      error,
    });
  }
};

// Category wise product
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    const products = await productModel
      .find({ category }) // is category ke saare products
      .populate("category"); // category ka pura data bhi laane ke liye

    res.status(200).send({
      success: true,
      message: "Products fetched successfully by category",
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting products by category",
      error,
    });
  }
};

//Payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        console.error("Braintree token generation error:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to generate Braintree token",
          error: err.message,
        });
      }
      res.status(200).json({
        success: true,
        clientToken: response.clientToken,
      });
    });
  } catch (error) {
    console.error("Error in Braintree token controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true, // automatically submit for settlement
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      },
    );
  } catch (error) {
    console.error("Error in payment controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
