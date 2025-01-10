//rafce
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingImg from '../assets/landingImg.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectsAPI } from '../services/allAPI'

const Home = () => {
  const navigate = useNavigate()
  const [homeProjects,setHomeProjects] = useState([])
  const [isLogin,setIsLogin] = useState(false)

  console.log(homeProjects);
  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[])

  const getHomeProjects = async ()=>{
    try{
      const result = await homeProjectsAPI()
      console.log( result);
      if(result.status==200) {
        setHomeProjects(result.data)
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleNavigateToProject = ()=>{
    //user is logined?
    if(sessionStorage.getItem("token")){
      // authorised user then redirect 
      navigate('/projects')
    }else{
      // not an authorised user then alert please login
      alert("Please login to get full access to our project Collection!!!")
    }
  }

  return (
    <>
    {/* landing */}
      <div style={{minHeight:'100vh'}} className="d-flex justify-content-center align-items-center rounded shadow w-100 ">
        <div className="container ">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{fontSize:'80px'}}><i className="fa-brands fa-docker"></i> 
              Project Fair</h1>
              <p style={{textAlign:'justify'}}>One Stop Destination for all Software Development Projects. Where User can add and manage their projects. As well as access all projects available in our website... What are you waiting for!!!
              </p>
              {
                isLogin ?
                <Link to={'/dashboard'} className="btn btn-warning">MANAGE YOUR PROJECTS</Link>
                :
                <Link to={'/login'} className="btn btn-warning">STARTS TO EXPLORE</Link>
              }
            </div>
            <div className="col-lg-6">
              <img className='img-fluid' src={landingImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    
    {/* Explore Our Projects */}
    <div className="my-5 text-center">
      <h1 className="mb-5">Explore Our Projects</h1>
      <marquee>
        <div className="d-flex">
          {
            homeProjects?.map(project=>(
              <div className="me-5">
                <ProjectCard displayData={project}/>
              </div>
            ))
          }
        </div>
      </marquee>
      <button onClick={handleNavigateToProject} className="btn btn-link mt-5">CLICK HERE TO VIEW MORE PROJECTS...</button>
    </div>

    {/* Our Testimonials */}
    <div className="d-flex justify-content-center align-items-center my-5 flex-column">
      <h1>Our Testimonials</h1>
      <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
          {/* card */}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text className='d-flex justify-content-center align-items-center flex-column'>
                <img width={'60px'}  height={'60px'} className='rounded-circle img-fluid' src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png" alt="" />
                <div className='d-flex justify-content-center my-2'>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{textAlign:'justify'}}>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
          {/* card */}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text className='d-flex justify-content-center align-items-center flex-column'>
                <img width={'60px'}  height={'60px'} className='rounded-circle img-fluid' src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/woman_9-512.png" alt="" />
                <div className='d-flex justify-content-center my-2'>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{textAlign:'justify'}}>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
          {/* card */}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text className='d-flex justify-content-center align-items-center flex-column'>
                <img width={'60px'}  height={'60px'} className='rounded-circle img-fluid' src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" alt="" />
                <div className='d-flex justify-content-center my-2'>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{textAlign:'justify'}}>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
    </div>

    </>
  )
}

export default Home