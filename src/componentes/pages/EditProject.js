import style from './EditProject.module.css'
import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from '../layout/Loading'
import Message from '../layout/Message'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function EditProject() {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [service, setServices] = useState([])
    const [showPF, setShowPF] = useState(false)
    const [showServiceF, setShowServiceF] = useState(false)
    const [message, setMessage] = useState()
    const [type, settype] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((err) => console.log(err))
        }, 300)
    }, [id])

    function editPost(project) {
        setMessage('')
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            settype('error')
            return false

        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json', },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowPF(false)
                setMessage('Atualizado!')
                settype('success')
            })
            .catch((err) => console.log(err))
    }

    function createService(project) {
        setMessage('')
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            settype('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}` , {
            method: 'PATCH',
           headers: { 'Content-type': 'application/json',},
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceF(false)
        })
        .catch((err) => console.log(err))
    }

    function removeService(id, cost) {

        const servicesUpdated = project.services.filter((service) => service.id !== id)

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id} `, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json',},
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json()
        .then((data) => { 
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso')
        }))
        .catch(err => console.log(err))
    }

    function toggleServiceF() {
        setShowServiceF(!showServiceF)
    }

    function togglePF() {
        setShowPF(!showPF)
    }

    return (
        <> {project.name ? (
            <div className={style.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={style.service_form_container}>
                        <h1> Projeto: {project.name}</h1>
                        <button className={style.btn} onClick={togglePF}>
                            {!showPF ? 'Editar projeto' : 'Fechar'}
                        </button>
                        {!showPF ? (
                            <div className={style.project_info}>
                                <p>
                                    <span>Categoria: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento: </span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado </span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={style.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText='Salvar edição' projetctData={project} />
                            </div>
                        )}
                    </div>
                    <div className={style.service_form_container}>
                        <h2>Adicione um serviço: </h2>
                        <button className={style.btn} onClick={toggleServiceF}>
                            {!showServiceF ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={style.project_info}>
                            {showServiceF && (<ServiceForm
                                handleSubmit={createService} btnText='Adicionar Serviço'
                                projectData={project} />)}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container className='start'>
                        {service.length > 0 && service.map((serve) => (
                            <ServiceCard
                            id={serve.id}
                            key={serve.id}
                            name={serve.name}
                            description={serve.description}
                            cost={serve.cost}
                            handleRemove={removeService}/>
                        )) }
                        {service.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
        ) : (<Loading />)} </>
    )
}

export default EditProject;