import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
function CategoryList(props) {
    return (
        <section>
            <h2>Categories</h2>
            <ul>
                { props.categories.map(category => (
                    <li key={category.path}><Link to={`/${category.path}`}>{category.name}</Link></li>
                ))}
            </ul>
        </section>
    )
}

function mapStateToProps ({ categories }) {
    return { categories }
}

export default connect(mapStateToProps)(CategoryList)