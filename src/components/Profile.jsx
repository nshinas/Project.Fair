//rafce
import React,{useEffect, useState} from 'react'
import { Collapse } from 'react-bootstrap'
import uploadImg from '../assets/uploadImg.jpg'
import SERVER_BASE_URL from '../services/serverUrl';
import { updateUserAPI } from '../services/allAPI';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [preview,setPreview] = useState("")
  const [existingProfilePic,setExisitingProfilePic] = useState("")
  // profilePic key of userDeatils is used to store uploaded user profile pic file
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
  })
  console.log(userDetails);
  //get exisiting user details from session and store it to userDetails state
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin
      })
      setExisitingProfilePic(user.profilePic)
    }
  },[open])

  //generate url for upload profile pic
  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic])

  const handleUserUpdate = async ()=>{
    // 1. get all user details
    const {username,email,password,github,linkedin,profilePic} = userDetails
    // if text filed have value
    if(github && linkedin){
      // req body
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview ? reqBody.append("profilePic",profilePic) :reqBody.append("profilePic",existingProfilePic)
      //reqheader
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // make api call
        try{
          const result = await updateUserAPI(reqBody,reqHeader)
          if(result.status==200){
            // alert
            alert("User profile updated successfullyy!!!")
            // store update user in session
            sessionStorage.setItem("user",JSON.stringify(result.data))
            // collapse profile
            setOpen(!open)
          }
        }catch(err){
          console.log(err);          
        }
      }
    }else{
      alert("Please fill the form completetly!!!!")
    }
  }

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <h3 className="text-warning">Profile</h3>
        <button onClick={()=>setOpen(!open)} className="btn text-warning"> <i className="fa-solid fa-chevron-down"></i> </button>
      </div>
      <Collapse in={open}>
        <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded' id="example-collapse-text">
          {/* upload pic */}
          <label className='text-center'>
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} style={{display:'none'}} type="file" />
            {
              existingProfilePic=="" ?
              <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:uploadImg} alt="" />
              :
              <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:`${SERVER_BASE_URL}/uploads/${existingProfilePic}`} alt="" />
            }
          </label>
          <div className="my-2 w-100">
            <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" placeholder='User GITHUB Link' className="form-control" />
          </div>
          <div className="mb-2 w-100">
            <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" placeholder='User LINKEDIN Link' className="form-control" />
          </div>
          <div className="d-grid w-100">
            <button onClick={handleUserUpdate} className="btn btn-warning">Update</button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile