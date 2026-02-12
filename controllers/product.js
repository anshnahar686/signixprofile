const { validate } = require('uuid')
const product = require('../models/product')
exports.CreateProducts = async (req, res) => {
    try {
        console.log(req.body)
        const {
            cDt,
            item_name,
            alias_name,
            item_code,
            EAN,
            active,
            seqno,
            ItemInCase,
            ecessAmount,
            MRP,
            sales_Price,
            LRP,
            LCP,
            MRP_Case_,
            sales_Price_Case_Unit,
            LPR_Case_Unit,
            for_sale,
            for_purchase,
            for_issue,
            for_recieve,
            latetude,
            logititude,
            description,
            base_unit_stock_type,
            case_unit_stock_type


        } = req.body
        const pic = req.files?.pic?.[0]?.filename || null;
        const banner = req.files?.banner?.[0]?.filename || null;
        const technical_details= req.files?.technical_details?.[0]?.filename || null;
        if(!item_name||!active||!seqno||!ItemInCase||!MRP||!MRP_Case_ ||!for_sale ||!base_unit_stock_type ||!case_unit_stock_type)
        {
              return res.status(400).json({ message: 'fields are missing' })
        }
        const createproducts=await product.create({
            cDt,
            item_name,
            alias_name,
            item_code,
            EAN,
            active,
            seqno,
            ItemInCase,
            ecessAmount,
            MRP,
            sales_Price,
            LRP,
            LCP,
            MRP_Case_,
            sales_Price_Case_Unit,
            LPR_Case_Unit,
            for_sale,
            for_purchase,
            for_issue,
            for_recieve,
            latetude,
            logititude,
            description,
            base_unit_stock_type,
            case_unit_stock_type,
            pic,
            banner,
            technical_details


        })
        res.status(201).json({ message: 'product is created',createproducts})
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.AllProducts = async (req, res) => {
    try {
        const createproducts = await product.findAll()
        if (createproducts.length === 0) {
            return res.status(400).json({ message: 'products are not found' })
        }
        res.status(201).json({ message: 'all products', createproducts })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.Products = async (req, res) => {
    try {
        const { id } = req.params
        if (!validate(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }
        const createproducts = await product.findByPk(id)
        if (!createproducts) {
            return res.status(400).json({ message: 'products are not found' })
        }
        res.status(201).json({ message: 'product is', createproducts })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.UpdateProducts = async (req, res) => {
    try {
        const { id } = req.params
        if (!validate(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }
        const createproducts = await product.findByPk(id)
        if (!createproducts) {
            return res.status(400).json({ message: 'products are not found' })
        }
        const updateProduct = await product.update(req.body, {
            where: { id: id }
        })
        if (!updateProduct) {
            return res.status(400).json({ message: 'product cant be updated' })
        }
        res.status(201).json({ message: 'product is updated', updateProduct })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.DeleteProducts = async (req, res) => {
    try {
        const { id } = req.params
        if (!validate(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }
        const createproducts = await product.findByPk(id)
        if (!createproducts) {
            return res.status(400).json({ message: 'products are not found' })
        }
        const updateProduct = await product.destroy({
            where: { id: id }
        })
        if (!updateProduct) {
            return res.status(400).json({ message: 'product cant be delted' })
        }
        res.status(201).json({ message: 'product is deleted', updateProduct })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}