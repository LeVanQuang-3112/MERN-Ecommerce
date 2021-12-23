import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() => {
        const getProducts = async () => {
            let link = `http://localhost:5000/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`
            const response = await axios.get(link)
            setProducts(response.data.products)
            setResult(response.data.result)
        }
        getProducts()
    }, [category, page, sort, search, callback])
    return {
        products: [products, setProducts],
        search: [search, setSearch],
        category: [category, setCategory],
        sort: [sort, setSort],
        callback: [callback, setCallback],
        page: [page, setPage],
        result: [result, setResult]
    }
}
