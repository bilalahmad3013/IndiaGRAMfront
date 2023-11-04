import React, { useContext, useEffect, useState } from 'react'
import { StatesProvider } from '../States/states'
import Post from '../Compontnts/Post';
import { useParams, Link } from 'react-router-dom';
import '../styles/profile.css'
import Followers from '../Compontnts/followers';
import Following from '../Compontnts/following';
import InfiniteScroll from 'react-infinite-scroll-component';




export default function Profile() {
  const { setTitle, socket } = useContext(StatesProvider);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { param } = useParams();

  const [isModalOpenFollowers, setModalOpenFollowers] = useState(false);
  const [isModalOpenFollowings, setModalOpenFollowings] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);


  const openModalFollowers = () => {
    setModalOpenFollowers(true);
  };
  const openModalFollowing = () => {
    setModalOpenFollowings(true);
  };


  setTitle("Profile");
  const [pic, setPic] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [loader, setLoader]=useState(false);

  function getCookie(name) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
  const loginEmail = decodeURIComponent(getCookie("userEmail"));

  useEffect(() => {
    const user = async () => {
      let response = await fetch(`${BASE_URL}/user/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: param

        })
      })

      if (!response.ok) {
        console.log("something went wrong");
      }
      let ans = await response.json();

      setPic(ans.pic);
      setEmail(ans.email)
    }
    user();


  }, []);

  useEffect(() => {
    if (email) {
      const userProfile = async () => {
        let response = await fetch(`${BASE_URL}/accountsetting/getSetting`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userEmail: email
          })
        });

        let ans = await response.json();


        setUser(ans);
      };

      userProfile();
    }
  }, [email]);



  const fetchPosts = async () => {
    try {
      setLoader(true);
      const response = await fetch(`${BASE_URL}/posts/getPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, skip: skip }),
      });
      const data = await response.json();
      if (data.posts.length === 0) {

        setHasMore(false);
      } else {
       
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setSkip(skip + 1);
      }
      setLoader(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchPosts();
    }
  }, [email]);

  const loadMore = () => {
    fetchPosts();
  };

  const handleFollow =()=>{
     
    socket.emit('follow', { senderUserId: loginEmail, receiverUserId: email });
  }






  return (
    <>
      <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center', padding: "10px" }}>

        <div id='header' style={{ width: '70%', height: 'auto', display: "flex", flexDirection: 'column', alignItems: 'center', padding: "10px" }}>

          <div id='pic' style={{ width: "250px", height: "250px", borderRadius: "50%" , boxShadow:"0px 0px 2px 4px #3b5998"}}>
            <img src={BASE_URL + pic} style={{ height: "100%", width: "100%", borderRadius: "50%" }} alt="" />
          </div>


          <div id='bio' style={{ width: "100%", padding: '5px' }}>

            <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>

              <p><strong>{user.fullname}</strong></p>


              <div id='profile-modals' style={{ display: "flex", width: "30%", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ borderRadius: "10px", padding: "5px", background: "#3b5998", color: "white", border: "none" }}><strong>128</strong> Posts</span>

                <button style={{ borderRadius: "10px", padding: "5px", background: "#3b5998", color: "white", border: "none" }} onClick={openModalFollowers}><strong>1 M</strong> Followers</button>

                <button style={{ borderRadius: "10px", padding: "5px", background: "#3b5998", color: "white", border: "none" }} onClick={openModalFollowing}><strong>1222</strong> Following</button>
              </div>

              {isModalOpenFollowers && <Followers closeModal={() => setModalOpenFollowers(false)} />}

              {isModalOpenFollowings && <Following closeModal={() => setModalOpenFollowings(false)} />}


              <div>
                {
                 loginEmail !== email && <>
                  <button className='btn' style={{ background: '#3b5998', color: 'white', margin: "5px" }} onClick={handleFollow}>Follow</button>
                 <button className='btn' style={{ background: '#3b5998', color: 'white' }}>Message</button> 
                 </>
                }
               
              </div>
            </div>

            <h3 id='biodiv'>Bio</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p style={{ textAlign: "center", width: "50%" }}>{user.bio}</p>
            </div>

          </div>

        </div>

      </div >
      <main>

      <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<div></div>}
        endMessage={<h6>No more posts to show</h6>}
      >
        <div className='container' id='post-container'>
          {posts.map((item, index) => (            
            <Post key={index} elem={item} />
          ))}
        </div>
      </InfiniteScroll>

      {
        loader &&  <div className='loader'></div>
      }
     
    </div>
    

      </main>

    </>
  )
}










