import css from 'components/Searchbar/Searchbar.module.css'
import { ImSearch } from "react-icons/im";

import PropTypes from 'prop-types'

import React from 'react'
import { useState } from 'react';

export default function Searchbar({onSubmit}) {

    const [ search, setSearch] = useState("")

    const handleChange = (e) => {
        console.log("handleChange")
        const { value } = e.target 
        setSearch(value)
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handleSubmit")
        onSubmit({ search })
            console.log(onSubmit)
        // this.reset()
    }
  
    return (

        <header className={css.searchbar}>
            <form onSubmit={handleSubmit} className={css.form}>
                <button onClick={handleSubmit} type="submit" className={css.button}>
            <span className={css.buttonLabel}><ImSearch size={24}/></span>
                </button>
        <input
            onChange={handleChange}
                value={search}
                className={css.input}
                type="text"
                name="search"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}

Searchbar.propTupes = {
  onSubmit: PropTypes.func.isRequired
}