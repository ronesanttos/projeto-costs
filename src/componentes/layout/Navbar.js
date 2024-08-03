import { Link } from 'react-router-dom'
import Container from './Container';
import style from './Navbar.module.css'

function Navbar() {
    return (
        <nav className={style.navbar}>
            <Container>
                <ul className={style.list}>
                    <li className={style.item}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={style.item}>
                        <Link to='/projects'>Project</Link>
                    </li>
                    <li className={style.item}>
                        <Link to='/company'>Company</Link>
                    </li>
                    <li className={style.item}>
                        <Link to='/contact'>Contatos</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar;