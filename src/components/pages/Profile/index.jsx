import React, { useEffect, useState } from "react";
import useFetch from "../../API/auth/FetchHook";
import { userUrl } from "../../../utils/constants";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../Dropdown";
import CreateVenue from "../../forms/CreateVenue";
import UpdateProfile from "../../forms/UpdateUserProfile";

const Profile = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

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

  const refreshUser = () => {
    setTimeout(() => {
      performFetch();
      setShowCreateForm(false);
      setShowUpdateForm(false);
    }, 500);
  };

  useEffect(() => {
    if (userName) {
      console.log("Initiating profile fetch");
      performFetch();
    }
  }, [userName, performFetch]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;
  if (!data) return <p className="text-white">No data found</p>;
  const isVenueManager = data.data.venueManager;

  const handleBtnClick = () => {
    if (showUpdateForm) {
      toggleUpdateForm();
      return;
    }

    if (showCreateForm) {
      toggleCreateForm();
    } else if (!isVenueManager) {
      toggleUpdateForm();
    } else {
      toggleCreateForm();
    }
  };

  const handleDelete = (bookingId) => {
    console.log("Delete triggered!", bookingId);
  };

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  const toggleUpdateForm = () => {
    setShowUpdateForm((prev) => !prev);
  };

  const userDetail = data.data;

  return (
    <div className="flex flex-col max-w-[600px] m-auto bg-background g-5">
      <div className="h-[100px] max-w-[600px] bg-primary">
        <img
          className="max-w-full"
          src={userDetail.banner.url}
          alt={"Profile Banner"}
        />
      </div>
      <div className="p-5">
        <div className="flex">
          <div className="w-full">
            <img
              className="rounded-full w-40 h-auto object-cover"
              src={userDetail.avatar.url}
              alt={"Profile Avatar"}
            />
          </div>
          <div>
            <div className=" flex gap-2 p-1 rounded-full w-full hover:text-primary translate-y-20 hover:cursor-pointer">
              <DropdownMenu
                className={"hover:cursor-pointer"}
                listItem="Edit Profile"
                onActivate={() => toggleUpdateForm()}
              />
            </div>
          </div>
        </div>
        <h1 className="text-center mt-5">{userDetail.name}</h1>
        <div className="mt-5">
          <h2>Bio</h2>
          <p className="mx-3">
            {userDetail.bio ? userDetail.bio : "No bio yet"}
          </p>
        </div>
        {token && isVenueManager && (
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
          {token && isVenueManager && (
            <button className="btn my-5" onClick={() => handleBtnClick()}>
              {showCreateForm || showUpdateForm
                ? "Close"
                : isVenueManager
                  ? "Add Venue"
                  : "Become a Venue Manager"}
            </button>
          )}
        </div>
        <div>{showCreateForm && <CreateVenue />}</div>
        <div>
          {showUpdateForm && (
            <UpdateProfile isUser={userName} onClose={refreshUser} />
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
    </div>
  );
};

export default Profile;
