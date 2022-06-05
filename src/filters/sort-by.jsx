import React from 'react'

export const SortMenu = ({ menuRef, isSortMenuOpen, onSetFilter }) => {

    const handleChange = ({ target }) => {
        const value = target.value
        onSetFilter(value)
    }


    return <section>
        {isSortMenuOpen && <div className="group-sort-main-container" ref={menuRef}>
            <div className="sort-header-container">
                <h3>Sort by</h3>
            </div>
            <div className="sort-by-content-header">
                <select onChange={handleChange}>
                    <option value="">All</option>
                    <option value="title">Name</option>
                    <option value="person">Person</option>
                    <option value="status">Status</option>
                    <option value="clear">Clear</option>
                </select>
                <div className="sort-by-footer"></div>
            </div>
        </div>}
    </section>

}