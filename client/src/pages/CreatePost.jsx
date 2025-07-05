import React, { useState } from "react";
import app from "../firebase.js";
import { ThreeDots } from "react-loader-spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const [imgUplaoding, setImgUploading] = useState(false);
  const [waiting, setWaiting] = useState(null);
  const [imgUplaodingError, setImgUploadingError] = useState(null);
  const [error, setError] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageHandler = async (e) => {
    e.preventDefault();
    setImgUploading(true);
    setError(null);
    setImgUploadingError(null);
    setWaiting("Image is uploading please wait");
    if (!image) {
      setImgUploading(false);
      setImgUploadingError("No image selected");
      setWaiting(null);
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setImgUploading(false);
        setImgUploadingError("Format not supported. Upload failed");
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setWaiting(null);
          setImgUploading(false);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.title || !formData.content) {
      setError("Title and description is required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/post/createpost`,
        {
          formData,
          author: currentUser.username,
          userId: currentUser._id,
        }
      );
      if (response.status === 200) {
        navigate(`/`);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 409) {
          setError(
            "Post already exist with this title please choose a different title"
          );
          return;
        } else if (error.response.status == 400) {
          setError("Inappropriate content detected. Cannot post this");
          return;
        } else if (error.response.status == 401) {
          setError("Title contains too many offensive words");
          return;
        } else if (error.response.status == 402) {
          setError("Post content contains too many offensive words");
        } else {
          setError("Something went wrong");
          return;
        }
      }
    }
  };

  return (
    <div className={`w-full min-h-screen pt-20 pb-20 flex justify-center overflow-x-hidden ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      <div className="max-w-[700px] px-4 mt-2 mb-10 items-center w-full flex gap-6 flex-col">
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Create Post
        </h1>
        
        <div className={`w-full rounded-lg shadow-md p-6 ${theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"} border`}>
          <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
            <input
              onChange={changeHandler}
              type="type"
              id="title"
              className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
              placeholder="Title"
            />
            
            <div className="flex md:flex-row flex-col justify-between gap-3">
              <input
                onChange={fileChangeHandler}
                type="file"
                accept="image/*"
                className={`rounded-md py-3 px-4 grow border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
              />
              <button
                onClick={uploadImageHandler}
                className={`bg-[#1877F2] hover:bg-[#166FE5] rounded-md px-4 py-2 text-white font-medium transition-all transform hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50 ${waiting && "pointer-events-none"}`}
              >
                {imgUplaoding ? (
                  <div className="flex justify-center items-center">
                    <ThreeDots
                      height="24"
                      width="60"
                      color="white"
                      ariaLabel="loading"
                    />
                  </div>
                ) : (
                  "Upload Image"
                )}
              </button>
            </div>
            
            {waiting && <p className="text-green-600 text-sm font-medium">{waiting}</p>}
            {imgUplaodingError && (
              <p className="text-red-500 text-sm font-medium">{imgUplaodingError}</p>
            )}
            
            {formData?.image && (
              <img
                src={formData.image}
                className="w-full h-[300px] object-contain border border-gray-300 dark:border-gray-700 self-center rounded-md"
                alt="Post image"
              />
            )}

            <textarea
              onChange={changeHandler}
              id="content"
              className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
              rows={10}
              placeholder="Write your post..."
            />
            
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button
              className={`bg-[#1877F2] hover:bg-[#166FE5] rounded-md text-white py-3 font-medium transition-all transform hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50 ${imgUplaoding && "pointer-events-none"}`}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <ThreeDots
                    height="24"
                    width="60"
                    color="white"
                    ariaLabel="loading"
                  />
                </div>
              ) : (
                "Publish"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
