import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || '');
      setBio(authUser.bio || '');
      setPreview(authUser.profilePic || assets.avatar_icon);
    }
  }, [authUser]);

  const handleImageChange = (file) => {
    if (!file) return;
    setSelectedImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);

    reader.onload = async () => {
      await updateProfile({
        profilePic: reader.result,
        fullName: name,
        bio
      });
      navigate('/');
    };
  };

  return (
    <div className="min-h-screen bg-[#111b21] flex items-center justify-center px-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-3xl bg-[#202c33] rounded-xl shadow-lg flex max-md:flex-col overflow-hidden">

        {/* LEFT - PROFILE PREVIEW */}
        <div className="flex flex-col items-center justify-center p-6 border-r border-[#2a3942] max-md:border-r-0 max-md:border-b">

          <img
            src={preview}
            className="w-32 h-32 rounded-full object-cover"
            alt=""
          />

          <p className="mt-4 text-lg font-medium text-white">
            {name || "Your Name"}
          </p>

          <p className="text-sm text-gray-400 text-center mt-1 px-4">
            {bio || "Write something about yourself..."}
          </p>
        </div>

        {/* RIGHT - FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-6 flex-1"
        >
          <h2 className="text-lg font-semibold text-white">
            Edit Profile
          </h2>

          {/* Upload */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="file"
              hidden
              accept=".png, .jpg, .jpeg"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />

            <img
              src={preview}
              className="w-12 h-12 rounded-full object-cover"
            />

            <span className="text-sm text-gray-300">
              Change profile photo
            </span>
          </label>

          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-[#2a3942] p-3 rounded outline-none text-white placeholder-gray-400"
          />

          {/* Bio */}
          <textarea
            rows={4}
            placeholder="Write your bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="bg-[#2a3942] p-3 rounded outline-none text-white placeholder-gray-400"
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-[#00a884] py-3 rounded text-white font-medium hover:scale-105 transition"
          >
            Save Changes
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm text-gray-400 hover:text-white"
          >
            ← Back to chat
          </button>
        </form>

      </div>
    </div>
  );
};

export default ProfilePage;