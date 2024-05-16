import React, { useState } from "react";
import {
  PiAt,
  PiImage,
  PiTextAUnderline,
  PiTag,
  PiCurrencyDollar,
  PiUsers,
  PiStar,
  PiMapPin,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import useFetch from "../../API/auth/FetchHook";
import { createVenueUrl } from "../../../utils/constants";
import Modal from "../../Modal";

const CreateVenue = () => {
  const { performFetch, data, error, loading } = useFetch(createVenueUrl);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [
      {
        url: "",
        alt: "",
      },
    ],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "price" || name === "maxGuests" || name === "rating") {
      setFormData({
        ...formData,
        [name]: parseFloat(value), // Convert value to a number
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleMediaChange = (index, event) => {
    const { name, value } = event.target;
    const updatedMedia = formData.media.map((media, mediaIndex) => {
      if (index === mediaIndex) {
        return { ...media, [name]: value };
      }
      return media;
    });
    setFormData({
      ...formData,
      media: updatedMedia,
    });
  };

  const handleMetaChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      meta: { ...formData.meta, [name]: checked },
    });
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      location: { ...formData.location, [name]: value },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    performFetch({
      method: "POST",
      body: JSON.stringify(formData),
    });
  };

  const addMedia = () => {
    setFormData({
      ...formData,
      media: [...formData.media, { url: "", alt: "" }],
    });
  };

  const removeMedia = (index) => {
    const updatedMedia = formData.media.filter(
      (_, mediaIndex) => mediaIndex !== index
    );
    setFormData({
      ...formData,
      media: updatedMedia,
    });
  };

  return (
    <div>
      <Modal isOpen={showModal} onClose={closeModal}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}. Please Try Again with updated form!</p>}
        {data && <p>Success! Venue created.</p>}
      </Modal>
      <form
        onSubmit={handleSubmit}
        className="flex-col align-middle p-4 rounded-25"
      >
        <div className="border-b pb-12">
          <h2 className="leading-7 text-gray-900">Create a New Venue</h2>

          <div className="text-left mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-4">
            <div className="sm:col-span-4">
              <div className="flex">
                <PiTag className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Venue Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Venue name"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="flex">
                <PiTextAUnderline className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  onChange={handleChange}
                  name="description"
                  id="description"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Venue description"
                  required
                />
              </div>
            </div>

            {formData.media.map((media, index) => (
              <div key={index} className="sm:col-span-4">
                <div className="flex">
                  <PiImage className="mr-2 h-6 w-6 text-gray-900" />
                  <label
                    htmlFor={`mediaUrl-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Media URL
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => handleMediaChange(index, e)}
                    type="text"
                    name="url"
                    id={`mediaUrl-${index}`}
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Media URL"
                    value={media.url}
                  />
                </div>
                <div className="flex mt-2">
                  <PiTextAUnderline className="mr-2 h-6 w-6 text-gray-900" />
                  <label
                    htmlFor={`mediaAlt-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Media Alt Text
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => handleMediaChange(index, e)}
                    type="text"
                    name="alt"
                    id={`mediaAlt-${index}`}
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Media description"
                    value={media.alt}
                  />
                </div>
                {formData.media.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="btn-revert mt-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="sm:col-span-4 flex justify-center w-full">
              <button type="button" onClick={addMedia} className="btn">
                Add More Media
              </button>
            </div>
            <div className="sm:col-span-2">
              <div className="flex">
                <PiCurrencyDollar className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  type="number"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Price"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex">
                <PiUsers className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="maxGuests"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Max Guests
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  type="number"
                  name="maxGuests"
                  id="maxGuests"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Max guests"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="flex">
                <PiStar className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rating
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  type="number"
                  name="rating"
                  id="rating"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Rating"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Amenities
              </label>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-6">
                {["wifi", "parking", "breakfast", "pets"].map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      onChange={handleMetaChange}
                      type="checkbox"
                      name={amenity}
                      id={amenity}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 align-middle"
                    />
                    <label htmlFor={amenity} className="ml-2">
                      {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="flex">
                <PiMapPin className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleLocationChange}
                  type="text"
                  name="address"
                  id="address"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Address"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex">
                <PiAt className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleLocationChange}
                  type="text"
                  name="city"
                  id="city"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="City"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex">
                <PiMapPin className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP Code
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleLocationChange}
                  type="text"
                  name="zip"
                  id="zip"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="ZIP Code"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex">
                <PiMapPin className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleLocationChange}
                  type="text"
                  name="country"
                  id="country"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex">
                <PiMapPin className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="continent"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Continent
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleLocationChange}
                  type="text"
                  name="continent"
                  id="continent"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Continent"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex">
                <PiMapPin className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="lat"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Latitude
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleLocationChange}
                  type="number"
                  name="lat"
                  id="lat"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Latitude"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex">
                <PiMapPin className="mr-2 h-6 w-6 text-gray-900" />
                <label
                  htmlFor="lng"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Longitude
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleLocationChange}
                  type="number"
                  name="lng"
                  id="lng"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Longitude"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="btn-revert text-sm font-semibold leading-6 text-gray-900"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button onClick={openModal} type="submit" className="btn">
            {!showModal && <p>Send</p>}
            {loading && <p>Loading...</p>}
            {error && <p>Try again</p>}
            {showModal && <p>Please wait</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVenue;
