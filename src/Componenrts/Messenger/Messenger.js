import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { botMess, selectUsers, sendMess } from '../../store/slices/users/usersSlice'
import './Messenger.css'
import useSound from 'use-sound';
import sendSfx from '../../sound/send_iphone.mp3'
import music from '../../sound/Harut Pambukchyan - Te Achers Qez Voronen (2017).mp3'




function Messenger() {
    
    const {currentUser} = useSelector(selectUsers)
    const navigate = useNavigate()
    const desctopRef = useRef(null)
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const [playFx] = useSound(sendSfx)
    const [playM, {stop}] = useSound(music)
    let idx = currentUser?.messages.length - 1
    
    if (currentUser?.messages[idx]?.mess === 'ok') {
        playM()
    }else if(currentUser?.messages[idx]?.mess === 'of course') {
        stop()
    }
    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    },[currentUser])

    useEffect(() => {
        desctopRef.current.scrollTop = desctopRef.current.scrollHeight - desctopRef.current.clientHeight
    } )

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formRef.current[0].value) {
            
            dispatch(botMess({mess: formRef.current[0].value.replaceAll(' ', ''), user: currentUser.username}))

            playFx()
            dispatch(sendMess({mess: formRef.current[0].value}))
        }
        
        formRef.current.reset()
    }

    return (
        <div className="messenger">
            <div className='container'>
                <div className="mess">
                    <div className="users">
                        <div className="userone">
                                <div className="image">
                                    <img src="https://phonoteka.org/uploads/posts/2021-07/1625611256_28-phonoteka-org-p-ilon-mask-art-krasivo-30.jpg" alt="" />
                                </div>
                                <div className='name'>
                                        <h2>{currentUser.username}</h2>
                                </div>
                        </div>
                        <div className="usertwo">
                                <div className='name'>
                                        <h2>InstaBot</h2>
                                </div>
                                <div className="image">
                                    <img src="https://i.pinimg.com/originals/80/25/a9/8025a9f63435b64305b1cf045c76fd70.jpg" alt="" />
                                </div>
                        </div>
                    </div>
                    <div ref={desctopRef} className="desctop">
                            {
                                currentUser?.messages.map(mess => (
                                    <div key={mess.id}>
                                    <div className='messDesc'
                                    style={{
                                        marginLeft: mess.user === 'instabot' ? '45%' : '0'
                                    }} 
                                    >{mess.mess}</div>
                                    </div>
                                ))
                            }
                    </div>
                    <div className="form">
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <input type="text" 
                            placeholder='Send your message'
                            />
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger