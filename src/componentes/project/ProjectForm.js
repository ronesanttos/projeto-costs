import { useState, useEffect } from 'react';
import style from './ProjectForm.module.css';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ handleSubmit, btnText, projetctData }) {
    const [categories, setCategories] = useState([]);

    const [project, setProject] = useState(projetctData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(project)
    }

    function handleChange(event) {
        setProject({ ...project, [event.target.name]: event.target.value})
    }

    function handleCategory(event) {
        setProject({ ...project, category: { id: event.target.value, name: event.target.options[event.target.selectedIndex].text,},
        })
    }
    return (
        <form onSubmit={submit} className={style.form}>

            <Input type='text' text='Nome do projeto' name='name' placeholder='Insira o nome do projeto' 
            handleOnChange={handleChange} value={project.name ? project.name : ''}/>

            <Input type="number" text='Orçamento do projeto' name='budget' placeholder="Insira o orçamento total" 
            handleOnChange={handleChange} value={project.budget ? project.budget : ''}/>

            <Select name="category_id" text='Selecione a categoria' options={categories}
            handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>


            <SubmitButton text={btnText} />

        </form>
    )

}

export default ProjectForm;