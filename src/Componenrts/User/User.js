import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { delPost } from '../../store/slices/posts/postsSlice'
import { delUserPost, selectUsers } from '../../store/slices/users/usersSlice'
import './User.css'

function User() {
    
    const {currentUser} = useSelector(selectUsers)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!currentUser) {
            
            navigate('/')
        }
    },[])
    
    return(
        <div className="user">
            <div className="container">
               <div className="content">
                <div className="header">
                    <div className="imgBg">
                    <div className="image">
                        <img src="https://phonoteka.org/uploads/posts/2021-07/1625611256_28-phonoteka-org-p-ilon-mask-art-krasivo-30.jpg" alt="" />
                    </div>
                    </div>
                    <div className="infoUser">
                        <div className="name"><h1>{currentUser?.username}</h1></div>
                        <div className="public">
                            <div><h4>{currentUser?.posts.length}</h4><p>publications</p></div>
                            <div><h4>342</h4><p>subscribers</p></div>
                            <div><h4>78</h4><p>subscriptions</p></div>
                        </div>
                        <div className="realName"><h3>{currentUser?.name}</h3></div>
                        <div className='about'>{currentUser?.about}</div>
                    </div>
                </div>
                <div className="userPost">
                    <div className="title">
                        <h2>Publications</h2>
                    </div>
                    <div className="userPublic">
                        {currentUser.posts.map(post => (
                            <div className="divHead" key={post.id}>
                                <button onClick={() => {dispatch(delUserPost(post.id)); dispatch(delPost(post.id))}}>X</button>
                                <div className="div">
                                    <img src={post.img} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>  
            </div>
        </div>
    )
}

export default User