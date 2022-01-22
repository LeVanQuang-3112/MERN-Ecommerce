import { useContext } from "react"
import { GlobalState } from "../../../GlobalState"
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category

    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    return (
        <>
            <FormControl sx={{ m: 0, minWidth: 120 }} className="categories__form">
            <InputLabel id="demo-simple-select-autowidth-label"><h4>Categories</h4></InputLabel>
            <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={category ? category : ""}
                onChange={handleChange}
                autoWidth
                label="Categories"
            >
                <MenuItem value="">
                <em className="categories__item">All Products</em>
                </MenuItem>
                {
                        categories.map((item) => {
                            return (
                                <MenuItem value={"category=" + item.name} key={item._id} className="categories__item">{item.name}</MenuItem>
                            )
                        })
                    }
            </Select>
            </FormControl>
      </>
    )
}
