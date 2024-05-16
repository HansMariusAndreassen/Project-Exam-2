import React, { useEffect, useState } from "react";
import useFetch from "../../API/auth/FetchHook";
import { userUrl } from "../../../utils/constants";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../Dropdown";

const Profile = () => {
  const [showInput, setShowInput] = useState(false);
  const [newAvatar, setNewAvatar] = useState({
    url: "",
    alt: "user profile avatar",
  });
  const params = new URLSearchParams(location.search);
  const id = params.get("name");

  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const userName = JSON.parse(user).name || {};
  const token = localStorage.getItem("accessToken");

  const url = id ? `${userUrl}${id}` : `${userUrl}${userName}`;

  const { performFetch, data, loading, error } = useFetch(
    `${url}?_venues=true&_bookings=true`
  );

  useEffect(() => {
    if (userName) {
      console.log("Initiating profile fetch");
      performFetch();
    }
  }, [userName, performFetch]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;
  if (!data) return <p className="text-white">No data found</p>;

  const handleDelete = (bookingId) => {
    console.log("Delete triggered!", bookingId);
  };

  const handleChangeAvatar = () => {
    console.log("Change avatar input triggered!");
    setShowInput(true);
  };

  const handleCancel = () => {
    console.log("Cancel triggered!");
    setShowInput(false);
    setNewAvatar("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputUrl = event.target.elements.avatar.value; // Correctly access the input value using the 'name' attribute

    if (!inputUrl) {
      console.error("No URL provided");
      return;
    }

    if (isValidHttpUrl(inputUrl)) {
      setNewAvatar({
        url: inputUrl,
        alt: "user profile avatar", // Update the 'alt' text if necessary or keep it unchanged
      });
      console.log("New avatar updated", {
        url: inputUrl,
        alt: "user profile avatar",
      });
      setShowInput(false);
    } else {
      alert("Please enter a valid image URL.");
    }
  };

  const isValidHttpUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false; // Not a valid URL
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  console.log(data);
  const userDetail = data.data;

  return (
    <div className="flex flex-col max-w-[600px] m-auto bg-background p-5 g-5">
      <div className="flex relative">
        <div>
          <img
            className="rounded-full w-40 h-40 object-cover"
            src={userDetail.avatar.url}
            alt={"Profile Banner"}
          />
        </div>
        <div>
          <div className="absolute left-[130px] top-[140px] p-1 rounded-full hover:text-primary">
            <DropdownMenu
              className={"hover:cursor-pointer"}
              listItem="Edit"
              onActivate={() => handleChangeAvatar()}
              size={16}
            />
          </div>
        </div>
      </div>
      {showInput && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-25 flex justify-between my-5"
        >
          <input
            className="mx-5 focus:border-none focus:ring-0 focus:outline-none w-full"
            type="text"
            name="avatar"
            placeholder="Enter new avatar URL"
            defaultValue={userDetail.avatar.url} // Ensure that the default value is the current URL
            onChange={(e) =>
              setNewAvatar({ ...newAvatar, url: e.target.value })
            } // Optionally handle changes if needed before submission
          />
          <button className="btn" type="submit">
            Update
          </button>
          <button onClick={handleCancel} className="btn">
            Cancel
          </button>
        </form>
      )}
      <h1 className="text-center mt-5">{userDetail.name}</h1>
      <div className="mt-5">
        <h2>Bio</h2>
        <p className="mx-3">{userDetail.bio ? userDetail.bio : "No bio yet"}</p>
      </div>
      {token && userDetail.venueManager && (
        <div className="mt-5">
          <div>
            <h2>Venue Manager</h2>
            <div className="flex-col justify-around">
              <p className="mx-3">
                Number of Venues: {userDetail._count.venues}
              </p>
              <p className="mx-3">
                Number of bookings: {userDetail._count.bookings}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex justify-end px-4">
        {token && (
          <button className="btn my-5">
            {userDetail.venueManager ? "Add Venue" : "Become Manager"}
          </button>
        )}
      </div>

      <div className="mt-5">
        <h2>My Upcoming Bookings</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">From</th>
              <th className="px-3 py-2">To</th>
            </tr>
          </thead>
          <tbody>
            {userDetail.bookings.map((booking) => (
              <tr key={booking.id}>
                <td
                  onClick={() => navigate(`/booking/${booking.venue.id}`)}
                  className="font-bold px-4 py-2 hover:underline hover:cursor-pointer hover:text-accent"
                >
                  {booking.venue.name}
                </td>
                <td className="px-4 py-2">{formatDate(booking.dateFrom)}</td>
                <td className="px-4 py-2">{formatDate(booking.dateTo)}</td>
                <td className="px-4 py-2 hover:cursor-pointer">
                  <DropdownMenu
                    listItem="Delete"
                    onActivate={() => handleDelete(booking.id)}
                    size={16}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
