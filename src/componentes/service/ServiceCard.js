import style from '../project/ProjectCards.module.css'
import { BsTrash } from 'react-icons/bs'


function ServiceCard({ id, name, cost, description, handleRemove }) {
    const remove = (event) => {
        event.preventDefault()
        handleRemove(id, cost)

    }
    return (
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{description}</p>

            <div className={style.project_card_actions}>
                <button onClick={remove}>
                    <BsTrash /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard;