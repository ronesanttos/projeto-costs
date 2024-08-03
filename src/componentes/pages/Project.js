import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './Project.module.css';

import Message from '../layout/Message.js';
import Container from '../layout/Container.js'
import LinkButton from '../layout/LinkButton.js'
import ProjectCards from '../project/ProjectCard.js';
import Loading from '../layout/Loading';

function Project() {
    const [project, setProject] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 300)
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
        })
            .then(resp => resp.json())
            .then(() => {
                setProject(project.filter((projects) => projects.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {project.length > 0 && project.map((projects) => (
                    <ProjectCards id={projects.id} name={projects.name} budget={projects.budget} category={projects?.category?.name} key={projects.id} 
                    handleRemove={removeProject}/>
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && project.length === 0 && (
                    <p className={style.info}>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>)
}

export default Project;