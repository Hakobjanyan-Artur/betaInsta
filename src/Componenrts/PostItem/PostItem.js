import { useDispatch, useSelector } from 'react-redux'
import { addNewComment, } from '../../store/slices/posts/postsSlice'
import './PostItem.css'
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import {  useRef } from 'react';
import { selectUsers } from '../../store/slices/users/usersSlice';

const PostItem = ({username, id, img, desc, comments}) => {
    
    const dispatch = useDispatch()
    const {currentUser} = useSelector(selectUsers)
    const formRef = useRef(null)

    const handleSubmit = (e) => {
            e.preventDefault()
            dispatch(addNewComment({txt: formRef.current[0].value, id: id, username: currentUser.username}))
            formRef.current.reset()
    }

    return (
        <div className='posts'>
            <div className="container">
                    <div className="post">
                        <div className="title">
                            <div className="avatar">
                            <img src="https://phonoteka.org/uploads/posts/2021-07/1625611256_28-phonoteka-org-p-ilon-mask-art-krasivo-30.jpg" alt="" />
                            </div>
                            <div className="name">{username}</div>
                        </div>
                        <div className="image">
                            <img src={img} alt="" />
                        </div>
                        <div className="likes">
                            <div className="iconLeft">
                                <div className="heart"><AiOutlineHeart /></div>
                                <div className="comment"><FaRegComment /></div>
                                <div className="send"><FiSend /></div>
                            </div>
                        </div>
                            {desc && <div className='desc'>{desc}</div>}
                            <div className="comments">
                                {comments.map(comment => (
                                    <div className="commentari" key={comment.id}>
                                        
                                        <div className="comUserName">
                                            <h2>{comment.username}</h2>
                                        </div>
                                        <div className="userComment">
                                            <p>{comment.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        <div className="newComments">
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <input type="text"
                            placeholder='Send your Comment'
                            />
                            <button>Send</button>
                        </form>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default PostItem