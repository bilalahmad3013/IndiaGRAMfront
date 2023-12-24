import React, { useContext ,useState} from 'react'
import "@fortawesome/fontawesome-free/css/all.css";
import { Link, useNavigate } from 'react-router-dom';
import { StatesProvider } from '../States/states';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Signup() {
    const BASE_URL=process.env.REACT_APP_BASE_URL;
    const initialFormState = {
        email: '',
        password: '',
        confermPassword:'',
        name:''
      };

    const navigate = useNavigate();
    const {setTitle}=useContext(StatesProvider);
    const [formValues, setFormValues] = useState(initialFormState);
    
    setTitle("SignUp")


    const Successnotify = () => toast.info('Email or username already exists', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    
      const notify = () => toast.info('Enter valid credentials', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

       
      const notify1 = () => toast.info('SignUp successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      

    const SignUp = () => {
        navigate('/login');
    }

   

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log('Submitted data:', formValues);
        
        const response=await fetch(`${BASE_URL}/user/signUp`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:formValues.name,
                email:formValues.email,
                password:formValues.password,
                ConfirmPassword:formValues.confermPassword
            })
        })

        const ans=await response.json();
        const error=ans.error;
        if(!ans.success){
           
            if(error){
                Successnotify();
            }
            else{
            notify();
            }             
        }
        else{
            notify1();
            navigate('/login');

        }

        // setFormValues(initialFormState);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    }

  
  

    return (
        <div>
            <section class="vh-100">
                <div class="container py-5 h-100">

                    <div class="row d-flex align-items-center justify-content-center h-100">
                        <div class="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                class="img-fluid" alt="Phone image" />
                        </div>
                        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h1 style={{ padding: "10px", marginLeft: "35%" }}>SignUp</h1>
                            <form onSubmit={handleSubmit}>

                                <div class="form-outline mb-4">
                                    <input type="text" id="form1Example23" class="form-control form-control-lg" name='name' value={formValues.name} onChange={handleChange}/>
                                    <label class="form-label" for="form1Example23">Name</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="email" id="form1Example13" class="form-control form-control-lg" name='email' value={formValues.email} onChange={handleChange}/>
                                    <label class="form-label" for="form1Example13">Email address</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="password" id="form1Example23" class="form-control form-control-lg" name='password' value={formValues.password} onChange={handleChange}/>
                                    <label class="form-label" for="form1Example23">Password</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="password" id="form1Example23" class="form-control form-control-lg" name='confermPassword' value={formValues.confermPassword} onChange={handleChange}/>
                                    <label class="form-label" for="form1Example23">Confirm Password</label>
                                </div>
                                <button type="submit" class="btn btn-primary btn-lg btn-block" >Sign Up</button>
                                <div class="divider d-flex align-items-center my-4">
                                    <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>
                                <a class="btn btn-primary btn-lg btn-block" style={{ background: "#3b5998" }} href="http://localhost:8000/user/auth/google"
                                    role="button">
                                    SignUp with &nbsp;<i class="fa-brands fa-google"> </i>
                                </a>
                                
                                <button onClick={SignUp} class="btn btn-primary btn-lg btn-block" style={{ background: "#3b5998", marginLeft: "2%" }}>LogIn..?</button>


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
