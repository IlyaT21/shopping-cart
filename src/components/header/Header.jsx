import './Header.scss'
import { useState } from 'react'
import { Link } from "react-router-dom";

function Header() {
	const [itemCount, setItemCount] = useState(0)

	return (
		<header>
			<Link>Home</Link>
			<Link>Shop</Link>
			<button>Cart</button>
		</header>
	)
}

export default Header;