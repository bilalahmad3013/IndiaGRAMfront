import React, { useContext ,useState} from 'react'
import "@fortawesome/fontawesome-free/css/all.css";
import { Link, useNavigate } from 'react-router-dom';
import { StatesProvider } from '../States/states';

export default function Signup() {
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
    const SignUp = () => {
        navigate('/login');
    }

   

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log('Submitted data:', formValues);
        
        const response=await fetch('http://localhost:8000/user/signUp', {
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
                alert("Email already exists");
            }
            else{
            alert("Invalid " + ans.errors[0].path);
            }             
        }
        else{
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
                                    <label class="form-label" for="form1Example23">Conferm Password</label>
                                </div>
                                <button type="submit" class="btn btn-primary btn-lg btn-block" >Sign Up</button>
                                <div class="divider d-flex align-items-center my-4">
                                    <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>
                                <Link class="btn btn-primary btn-lg btn-block" style={{ background: "#3b5998" }} to="#!"
                                    role="button">
                                    SignUp with &nbsp;<i class="fa-brands fa-google"> </i>
                                </Link>
                                <button onClick={SignUp} class="btn btn-primary btn-lg btn-block" style={{ background: "#3b5998", marginLeft: "2%" }}>LogIn..?</button>


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
