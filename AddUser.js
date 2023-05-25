import React,{ useState , useRef} from "react";
import Button from "../UI/Button";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from './AddUser.module.css';
import Wrapper from "../Helper/Wrapper";
 
const AddUser = (props) => {
    const nameInputRef =  useRef();
    const ageInputRef = useRef();
    const collegeInputRef = useRef();

    // const [enteredUsername,setEnteredUsername] = useState('');
    // const [enteredAge,setEnteredAge] = useState('');
    const [error,setError] = useState();

    // const usernameChangeHandler = (event) =>{
    //     setEnteredUsername(event.target.value);
    // };

    // const ageChangeHandler = (event) =>{
    //     setEnteredAge(event.target.value);
    // };

    const errorHandler = () => {
        setError(null);
    };

    const addUserHandler = (event) =>{
      event.preventDefault();
       const enteredName =  nameInputRef.current.value;
       const enteredUserAge = ageInputRef.current.value;
       const enteredCollegeName = collegeInputRef.current.value;

      if(enteredName.trim().length === 0 || enteredUserAge.trim().length === 0 || enteredCollegeName.trim().length === 0){
        setError({
            title : 'Inavlid input',
            message : 'Please enter a valid name ,age and college name (non-empty values).'
        });
        return;
      }
      if(+enteredUserAge < 1){
        setError({
            title : 'Inavlid age',
            message : 'Please enter a valid age (> 0).'
        });
        return;
      }
      props.onAddUser(enteredName,enteredUserAge,enteredCollegeName);
      nameInputRef.current.value = '';
      ageInputRef.current.value = '';
      collegeInputRef.current.value = '';

    };

    return (
        <Wrapper>
            {error && ( 
                <ErrorModal 
                    title={error.title} 
                    message={error.message} 
                    onConfirm={errorHandler}/>
        )}
            <Card className={classes.input}>
            <form onSubmit={addUserHandler}> 
                <label htmlFor="username">Username</label>
                <input id="username" type="text" ref={nameInputRef}/>
                <label htmlFor="age">Age(Years)</label>
                <input id="age" type="number"  ref={ageInputRef}/>
                <label htmlFor="college">College Name</label>
                <input id="college" type="text"  ref={collegeInputRef}/>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
       </Wrapper> 
    );

};

export default AddUser;