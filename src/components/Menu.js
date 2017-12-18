import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
function Menu(props) {
    return (
        <div className="pure-menu pure-menu-horizontal">
            <Link to="/" className="pure-menu-heading pure-menu-link">Home</Link>
            <ul className="pure-menu-list">
            { props.categories.map(category => (
                    <li key={category.path} className="pure-menu-item" ><Link to={`/${category.path}`} className="pure-menu-link">{category.name} </Link></li>
                ))}
            </ul>
        </div>

    )
}

function mapStateToProps ({ categories }) {
    return { categories }
}

export default connect(mapStateToProps)(Menu)