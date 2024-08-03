import { Link } from 'react-router-dom';
import style from './ProjectCards.module.css';

import { BsPencil, BsTrash } from 'react-icons/bs';


function ProjectCards({ id, name, budget, category, handleRemove }) {

    const remove = (event) => {
        event.preventDefault()
        handleRemove(id)
    }
    return (
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>

            <p className={style.category_text}>
                <span className={`${style[category?.toLowerCase()]}`}></span> {category}
            </p>
            <div className={style.project_card_actions}>
                <Link to={`/editproject/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsTrash /> Excluir
                </button>
            </div>
        </div>)
}

export default ProjectCards;