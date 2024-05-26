import React, { useEffect, useState } from "react";
import { PiImage, PiTextAUnderline, PiUser } from "react-icons/pi";
import useFetch from "../../API/auth/FetchHook";
import PropTypes from "prop-types";
import Modal from "../../Modal";

/**
 * UpdateProfile component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.isUser - The user ID.
 * @param {Function} props.onClose - The function to close the modal.
 * @returns {JSX.Element} The UpdateProfile component.
 */
const UpdateProfile = ({ isUser, onClose }) => {
  const { performFetch, data, error, loading, isSuccess } = useFetch(
    `https://v2.api.noroff.dev/holidaze/profiles/${isUser}`
  );
  const [formData, setFormData] = useState({
    bio: "",
    avatar: {
      url: "",
      alt: "",
    },
    banner: {
      url: "",
      alt: "",
    },
    venueManager: false,
  });
  const [showModal, setShowModal] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    performFetch();
  }, [performFetch]);

  useEffect(() => {
    if (data) {
      setFormData({
        bio: data.data.bio || "No bio",
        avatar: {
          url: data.data.avatar?.url || "",
          alt: data.data.avatar?.alt || "",
        },
        banner: {
          url: data.data.banner?.url || "",
          alt: data.data.banner?.alt || "",
        },
        venueManager: data.data.venueManager || false,
      });
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      avatar: {
        ...formData.avatar,
        [name]: value,
      },
    });
  };

  const handleBannerChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      banner: {
        ...formData.banner,
        [name]: value,
      },
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
    performFetch({
      method: "PUT",
      body: JSON.stringify(formData),
    });
  };

  const closeModal = () => {
    setShowModal(false);

    if (onClose) onClose();
  };

  return (
    <div>
      <Modal isOpen={showModal} onClose={closeModal} isSuccess={isSuccess}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && isSuccess && <p>Success! Profile updated.</p>}
      </Modal>
      <form
        onSubmit={handleSubmit}
        className="flex-col align-middle p-4 rounded-25"
      >
        <div className="border-b pb-12">
          <h2 className="leading-7 text-gray-900">Update Profile</h2>
          <div className="text-left mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-4">
            <div className="sm:col-span-4">
              <div className="flex">
                <PiUser className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bio
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  onChange={handleChange}
                  name="bio"
                  id="bio"
                  value={formData.bio}
                  className="indent-2 font-text lock w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your bio"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="flex">
                <PiImage className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="avatarUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Avatar URL
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleAvatarChange}
                  type="text"
                  name="url"
                  value={formData.avatar.url}
                  id="avatarUrl"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Valid image address goes here"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="flex">
                <PiTextAUnderline className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="avatarAlt"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Avatar Alt Text
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleAvatarChange}
                  type="text"
                  name="alt"
                  value={formData.avatar.alt}
                  id="avatarAlt"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Avatar alt text"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="flex">
                <PiImage className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="bannerUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Banner URL
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleBannerChange}
                  type="text"
                  name="url"
                  value={formData.banner.url}
                  id="bannerUrl"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Valid image address goes here"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="flex">
                <PiTextAUnderline className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="bannerAlt"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Banner Alt Text
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleBannerChange}
                  type="text"
                  name="alt"
                  value={formData.banner.alt}
                  id="bannerAlt"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Banner alt text"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Venue Manager
              </label>
              <div className="mt-2">
                <input
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  name="venueManager"
                  id="venueManager"
                  checked={formData.venueManager}
                  className="h-4 w-4 border-gray-300  align-middle"
                />
                <label htmlFor="venueManager" className="ml-2 align-middle">
                  {formData.venueManager
                    ? "Remove Venue Manager"
                    : "Become Venue Manager"}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="submit" className="btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateProfile.propTypes = {
  isUser: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateProfile;
