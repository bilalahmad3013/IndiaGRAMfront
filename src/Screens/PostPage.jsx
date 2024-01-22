import React from 'react'
import '../styles/PostPage.css'
import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../Compontnts/Loader';

export default function PostPage() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [msg, setMsg] = useState("");
    const [emoojee, setEmoojee] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const [like, setLike] = useState(0);
    const [comment, setComment] = useState([]);   
    const location = useLocation();
    const inputRef = useRef(null); 
    const user=location.state.user;
    const email=location.state.email; 
    const id=location.state.id;
      
    console.log(user)

    function handleEmoojee() {
        setEmoojee(!emoojee);
    }

    const handleEmojeeSelect = (event) => {
        setMsg((prev) => prev + event.emoji);
        inputRef.current.focus();
    }

    const handleInputChange = (e) => {       
        setMsg(e.target.value)
    }

    const handleComment =async () =>{
        if(msg===''){
            failnotify("Comment can't be empty");
            return;
        }
        try {           
            const response = await fetch(`${BASE_URL}/comments/addComment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user:user.userEmail,
                id:id,
                commentedUser:email,
                comment:msg
            }),
            });
            const data = await response.json(); 
            setMsg('')
            successnotify("Comment added successfully")
          
          } catch (error) {
            console.error('Error fetching posts:', error);
          }       
    }
    // useEffect(()=>{
    //     const fetchComments=async()=>{
    //     try {           
    //         const response = await fetch(`${BASE_URL}/comments/getComments`, {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({               
    //             postId:id,                
    //         }),
    //         });
    //         const data = await response.json(); 
    //         setComment(data.comments)
    //         console.log(data)           
          
    //       } catch (error) {
    //         console.error('Error fetching posts:', error);
    //       }
    //     }
    //     fetchComments();
    // },[])

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 2000)
    }, []);

    const failnotify = (name) => toast.info(`${name}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    const successnotify = (name) => toast.success(`${name}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });  

    return (
        <>
            {
                !loaded ? <Loader /> :
                    <div className="container1">
                        <div className='post-img'><img src='http://localhost:8000/uploads/posts/media-1705215775279.png' alt="Failed to load" /></div>
                        <div className='post-information'>
                            <div className='banner'><strong>{user.fullname}</strong></div>
                            <div className='likeComment'>
                                <button className='btn'><svg height="20" role="img" viewBox="0 0 48 48" width="20">
                                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                </svg> {like}</button>
                                <button className='btn'> <svg fill="#262626" height="20" role="img" viewBox="0 0 48 48" width="20">
                                    <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>
                                </svg> {comment}</button>
                            </div>
                            <div style={{ position: "relative" }}>
                                <svg className='emoji-btn' onClick={handleEmoojee} xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                                {
                                    emoojee && <div className='emoojee'><EmojiPicker height={350} width={300} size="25" sheetSize={32}
                                        emojiSize={24} onEmojiClick={handleEmojeeSelect} /> </div>
                                }
                                <input className='commentInput' type="text" name="" id="" ref={inputRef} placeholder='Add comment' value={msg} onChange={(e) => handleInputChange(e)} />
                                <button className='post-comment' onClick={handleComment}>Comment</button>
                                </div>
                            <div className='comments'>
                                <strong className='commentHeading'>Comments</strong>
                                <div className='comments-list'>
                                    <div className='comment-item'>
                                        <span className='user-comment'></span><span><strong className='user-name'>Anzar Ahmad &nbsp;</strong>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id omnis facere non perspiciatis nostrum ipsam, distinctio dignissimos atque asperiores, voluptatum est ad itaque iure molestiae natus! Temporibus inventore corrupti quasi dolorem commodi omnis, asperiores quam esse numquam ducimus quia sequi cumque amet atque quas unde qui molestiae officia explicabo dolor dolore sit ipsum? Neque tenetur vel maiores alias perferendis ducimus.</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
