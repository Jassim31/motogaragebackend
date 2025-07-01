import products from "../models/productModel.js"

export const addProduct =async(req,res)=>{
    const {name,description,price,category} = req.body
    const image = req.file.filename
    try {
        if(!name || !description || !price || !image || !category){
            return res.status(400).send({message:"All fields are required"})
        }

        const newproduct = new products({
            name,
            description,
            price,
            image,
            category

        })

        await newproduct.save()
            res.status(201).send(newproduct)
            } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
        console.log(error);
    }
}



export const getProduct =async(req,res)=>{
    try {  
        const allProducts = await products.find()
        res.status(200).send(allProducts)
    } catch (error) {
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
}

// edit product

export const editProduct = async (req, res) => {
    const id = req.params.id;
    const { name, description, price, category, image } = req.body;
    const userId = req.user._id;
    const uploadImg = req.file ? req.file.filename : image;
    
    try {
        if (!name || !description || !price || !category || !uploadImg) {
            return res.status(400).send({message: "all fields are required"});
        }

      const updatedProduct = await products.findByIdAndUpdate(
        id,
        {  
            name,
            description,
            image: uploadImg,
            price,
            category,
            userId,
        },
        { new: true }
      );
res.status(201).send(updatedProduct);

    } catch (error) {
      res.status(500).send({ message: "internal server error" });
      console.log(error);        
    }
}




export const deleteProduct = async(req,res)=>{
    const id = req.params.id
    try {
        const removedItem = await products.findByIdAndDelete(id)
        res.status(200).send(removedItem)
    } catch (error) {
        res.status(500).send({ message: "internal server error" });
        console.log(error)
    }
}