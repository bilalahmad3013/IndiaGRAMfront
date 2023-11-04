import React ,{useContext,useState}from 'react'
import "@fortawesome/fontawesome-free/css/all.css";
import { Link,useNavigate } from 'react-router-dom';
import { StatesProvider } from '../States/states';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const BASE_URL=process.env.REACT_APP_BASE_URL;
    console.log(BASE_URL);
    const initialFormState = {
        email: '',
        password: '',
         };
    const navigate=useNavigate();
    const {setTitle, socket, loginEmail}=useContext(StatesProvider);
    const [formValues, setFormValues] = useState(initialFormState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response =await fetch(`${BASE_URL}/user/signIn`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            email:formValues.email,
            password:formValues.password
          })
        }) 
    
        const ans=await response.json();
        if(!ans.success){
            Faliurnotify();
        }
    
        else {
          
          Successnotify();
          document.cookie = `authToken=${ans.authToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; Secure; SameSite=None;`;
          document.cookie = `userEmail=${formValues.email}; expires=Fri, 31 Dec 9999 23:59:59 GMT; Secure; SameSite=None;`;
         
                
          navigate('/');
        }
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    }

    
    setTitle("SignIn")

    const SignUp=()=>{
        navigate('/signup');
    }

    const Successnotify = () =>toast.success('LogIn successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

   const Faliurnotify=()=>toast.info('Invalid username or password', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    return (
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h1 style={{padding:"10px", marginLeft:"35%"}}>SignIn</h1>
                            <form onSubmit={handleSubmit}>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form1Example13" className="form-control form-control-lg" name='email' value={formValues.email} onChange={handleChange} />
                                    <label className="form-label" htmlFor="form1Example13">Email address</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="form1Example23" className="form-control form-control-lg" name='password' value={formValues.password} onChange={handleChange}/>
                                    <label className="form-label" htmlFor="form1Example23">Password</label>
                                </div>

                                <div className="d-flex justify-content-around align-items-center mb-4">

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                        <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                                    </div>
                                    <Link to="#!">Forgot password?</Link>
                                </div>


                                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>

                                <a className="btn btn-primary btn-lg btn-block" style={{background: "#3b5998"}} href="http://localhost:8000/user/auth/google?prompt=select_account"
                                    role="button">
                                  Login with &nbsp;<i className="fa-brands fa-google"> </i> 
                                </a>
                                <button onClick={SignUp} className="btn btn-primary btn-lg btn-block" style={{background: "#3b5998", marginLeft:"2%"}}>SignUp..?</button>
                              

                            </form>
                        </div>
                    </div>
                </div>
            </section>
          
        </div>
    )
}
