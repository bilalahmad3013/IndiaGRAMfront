import React, { useContext, useState } from 'react';
import { StatesProvider } from '../States/states';
import { TypeAnimation } from 'react-type-animation';
import '../styles/Timeline.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Timeline() {
  const { setTitle } = useContext(StatesProvider);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const userEmail = decodeURIComponent(getCookie("userEmail"));

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

  setTitle("Create");

  const initialObj = {
    media: null,
    caption: ""
  };

  const [form, setForm] = useState(initialObj);
  const [mediaPreview, setMediaPreview] = useState('https://source.unsplash.com/random/900×700/');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [videoKey, setVideoKey] = useState(0);

  const handleChange = (e) => {
    const { name, type } = e.target;
    if (type === "file") {
      if (e.target.files[0] === undefined) {
        return;
      }
      const mediaURL = URL.createObjectURL(e.target.files[0]);
      setMediaPreview(mediaURL);
      setVideoKey((prevKey) => prevKey + 1);
      setDisableSubmit(false);
      setForm({
        ...form,
        [name]: e.target.files[0]
      });
    } else {
      setForm({
        ...form,
        [name]: e.target.value
      });
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (disableSubmit) {
      notify();
      return;
    }

    const formDataMedia = new FormData();
    formDataMedia.append('media', form.media);
    formDataMedia.append('userEmail', userEmail);
    formDataMedia.append('caption', form.caption);

    let response = await fetch(`${BASE_URL}/posts/upload`, {
      method: "POST",
      body: formDataMedia
    });

    if (!response.ok) {
      console.log('Something went wrong');
      return;
    }

    const data = await response.json();
    console.log(data);
    Successnotify();
  }

  const notify = () => toast.info('Please select file first', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const Successnotify = () => toast.info('Uploaded Successfully', {
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
    <div className="container">
      <TypeAnimation
        sequence={[
          'Yes you can post here',
          1000,
          'Yes you can post just below',
          1000,
          'Yes you can post anything',
          1000
        ]}
        wrapper="h1"
        deletionSpeed={90}
        className="custom-type-animation"
        repeat={Infinity}
      />

      <div className='container d-flex' style={{ flexDirection: "column", alignItems: "center", marginTop: "2%" }}>
        <form encType="multipart/form-data" className="image-upload-form">
          <div className="file-input-container">
            <label htmlFor="fileInput" className="custom-file-label">Choose an Image or Video</label>
            <input type="file" id="fileInput" name="media" className="input-file" accept="image/*, video/*" onChange={handleChange} />
          </div>
          <textarea name="caption" className="caption-input" placeholder="Add a caption" onChange={handleChange}></textarea>
          <button type="submit" className="submit-button" onClick={handleClick} >Upload</button>
        </form>

        <div className="card" style={{ width: "450px", maxheight: "1000px", marginTop: "5%", marginBottom: "5%" }}>
          <h1 style={{ marginLeft: "33%" }}>Preview</h1>
          {form.media ? (
            form.media.type.includes("image") ? (
              <img
                className="card-img-top"
                src={mediaPreview}
                alt="Card image"
                style={{ maxHeight: "700px" }}
              />
            ) : (
              <video
                key={videoKey}
                className="card-img-top"
                controls
                style={{ maxHeight: "700px", width: "auto", height: "auto" }}
              >
                <source src={mediaPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <img
              className="card-img-top"
              src={mediaPreview}
              alt="Card image"
              style={{ maxHeight: "700px", width: "auto", objectFit: "contain", height: "auto" }}
            />
          )}
          <div className="card-body">
            <h4 className="card-title">Caption</h4>
            <p className="card-text">{form.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
