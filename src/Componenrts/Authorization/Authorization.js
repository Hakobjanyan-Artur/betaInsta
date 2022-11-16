import './Authorization.css'
import InstaLogo from "../../logo/InstaLogo"
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../store/slices/users/usersAPI';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectUsers, toggleCurrentUser } from '../../store/slices/users/usersSlice';


function Authorization() {
    const dispatch = useDispatch()
    const formRef = useRef(null)
    const navigate = useNavigate()
    const {currentUser} = useSelector(selectUsers)
    
    useEffect(() => {

        if (currentUser) {
            navigate('/home')
        }
    }, [currentUser])

    useEffect(() => {
        dispatch(fetchUsers())

    }, []);

    const handleSubmit = (e) => {

        e.preventDefault()

        let log = formRef.current[0].value
        let pass = formRef.current[1].value

        if (log && pass) {
            dispatch(toggleCurrentUser({log, pass}))
        }
        
        formRef.current.reset()
    }

    return (
        <div className="author">
            <div className="container">
                <div className="formAuthor">
                    <form ref={formRef} onSubmit={handleSubmit}>
                       <div className="logo"><InstaLogo/></div>
                        <input type="text"
                            defaultValue='bret' 
                            placeholder='Login or Email'
                        />
                        <input type="password"
                            defaultValue='gwenborough' 
                            placeholder='Password'
                        />
                        <button>Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Authorization