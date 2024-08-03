import banner from '../../img/banner.jpg'
import style from './Home.module.css'
import LinkButton from '../layout/LinkButton'


function Home() {
    return (
        <section className={style.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
           < LinkButton to="/newproject" text="Criar projeto"/>
            <img src={banner} alt="Costs" />
        </section>
    )
}

export default Home;