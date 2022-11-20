import './Home.css'
import Guests from '../Guests/Guests';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { selectUsers } from '../../store/slices/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import PostItem from '../PostItem/PostItem';
import { selectSearch } from '../../store/slices/search/searchSlice';
import { selectPosts } from '../../store/slices/posts/postsSlice';
import { fetchPosts } from '../../store/slices/posts/postsAPI';

const Home = () => {
    const {currentUser} = useSelector(selectUsers)
    const navigate = useNavigate()
    const search = useSelector(selectSearch)
    const posts = useSelector(selectPosts)
    const dispatch = useDispatch()
    const filterPosts = useMemo(() => {
        if (!search.replaceAll(' ', '')) {
            
            return [...posts]
        
        }else {

            return[
                ...posts.filter(post => post.username.includes(search.replaceAll(' ', '')))
            ]

        }
    },[posts, search])

    useEffect(() => {

        if (!currentUser) {
            
            navigate('/')
        
        }
    },[currentUser])

    useEffect(() => {

        if(!posts.length){

            dispatch(fetchPosts())
        
        }

    }, [])
    


    return(
        <div className="home">
           <Guests />
           {filterPosts.map(post => <PostItem key={post.id} {...post} />)}
           
        </div>
    )
}

export default Home 
