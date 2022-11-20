import { useNavigate } from 'react-router-dom'
import './error.css'

function Error () {
    const navigate = useNavigate()
    return (
        <div className="error">
            <div className="container">
                <img src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg" alt="" />
                <button onClick={() => navigate('/home')}>Home Page</button>
            </div>
        </div>
    )
}

export default Error