import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";


const defaultFormFields = {
    email: "",
    password: "",
}



const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const SignInWithGoogle = async() => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert("incorrect password");
                    break
                case 'auth/user-not-found':
                    alert("incorrect email");
                    break 
                default:
                    console.log(error);
            }
            
        }
    }
       
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    
    return (
        <div className='sign-in-container'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
         
         <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
         <div className='buttons-container'>
         <Button type="submit">
             Sign In
         </Button>
         <Button type="button" buttonType='google' onClick={SignInWithGoogle}>
             Google Sign In
         </Button>
         </div>
        </form>
        
        </div>
        
    )
}

export default SignInForm;