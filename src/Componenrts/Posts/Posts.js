import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewPost } from '../../store/slices/posts/postsSlice'
import { addNewUserPost, selectUsers } from '../../store/slices/users/usersSlice'
import './Posts.css'

function Posts() {
    const {currentUser} = useSelector(selectUsers)
    const navigate = useNavigate()
    const formRef = useRef(null)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {

        e.preventDefault()
        
        let img = formRef.current[0].value
        let desc = formRef.current[1].value
        let id = new Date().getTime().toString()
        let {username} = currentUser
        
        if (img) {
            dispatch(addNewPost({img, desc, id, username}))
            dispatch(addNewUserPost({img, desc, id, username}))
            formRef.current.reset()
            navigate('/home')   
        }
    }
    
    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    },[currentUser])
    
    return(
        <div className="posts">
            <div className='container'>
                <div className='form'>
                    <form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Add new post</h1>
                        <input type="text"
                        placeholder="Image url"
                        />
                        <input type="text"
                        placeholder="Post name"
                        />
                        <button>Add post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Posts