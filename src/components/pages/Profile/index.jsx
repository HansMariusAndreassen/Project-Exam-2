import React, { useEffect, useRef, useState } from "react";
import useFetch from "../../API/auth/FetchHook";
import { bookingsUrl, userUrl, venuesUrl } from "../../../utils/constants";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../Dropdown";
import CreateVenue from "../../forms/CreateVenue";
import UpdateProfile from "../../forms/UpdateUserProfile";
import useDeleteFetch from "../../API/fetch/Delete";
import VenueBanner from "../../API/fetch/MyVenues";

const Profile = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef(null);

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

  const { submitDelete } = useDeleteFetch();

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

  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => {
        window.scrollBy(0, 50);
      }, 200);
    }
  };

  const handleEditVenue = (venue) => {
    setCurrentVenue(venue);
    setIsEdit(true);
    setShowCreateForm(true);
    handleScrollToForm();
  };

  const handleEditProfile = () => {
    setShowUpdateForm(true);
    handleScrollToForm();
  };

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
      setCurrentVenue(null);
      setIsEdit(false);
      toggleCreateForm();
    }
  };

  const handleDelete = (bookingId) => {
    console.log("Delete triggered!", bookingId);
    if (window.confirm("Are you sure you want to delete this booking?")) {
      console.log("Delete confirmed");
      submitDelete(bookingsUrl, bookingId);
      refreshUser();
    } else {
      console.log("Delete cancelled");
    }
  };

  const handleDeleteVenue = (venueId) => {
    console.log("Delete venue triggered!", venueId);
    if (window.confirm("Are you sure you want to delete this venue?")) {
      console.log("Delete confirmed");
      submitDelete(venuesUrl, venueId);
      refreshUser();
    } else {
      console.log("Delete cancelled");
    }
  };

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  const toggleUpdateForm = () => {
    setShowUpdateForm((prev) => !prev);
  };

  const handleActivate = (value) => {
    switch (value) {
      case "edit_profile":
        handleEditProfile();
        break;
      case "edit_venue":
        handleEditVenue(currentVenue); // Assuming currentVenue is set when editing
        break;
      case "delete_booking":
        // Handle delete booking action
        break;
      case "delete_venue":
        // Handle delete venue action
        handleDeleteVenue(currentVenue.id);
        break;
      case "view_bookings":
        // Handle view bookings action
        break;
      default:
        console.log("Unknown action:", value);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;
  if (!data) return <p className="text-white">No data found</p>;
  const isVenueManager = data.data.venueManager;
  const userDetail = data.data;

  const profileMenuItems = [{ label: "Edit Profile", value: "edit_profile" }];
  const venueMenuItems = [
    { label: "Edit Venue", value: "edit_venue" },
    { label: "Delete Venue", value: "delete_venue" },
  ];
  const bookingMenuItems = [{ label: "Delete", value: "delete_booking" }];

  return (
    <div className="flex flex-col m-auto bg-background g-5">
      <div className="h-[300px] max-w-[600px] bg-primary overflow-hidden">
        <img
          className="relative w-full h-full object-cover"
          src={userDetail.banner.url}
          alt={"Profile Banner"}
        />
      </div>
      <div className="relative p-5">
        <div className="flex">
          <div className="relative -mt-16">
            <img
              className="rounded-full w-40 h-auto object-cover"
              src={userDetail.avatar.url}
              alt={"Profile Avatar"}
            />
          </div>
          <div className="w-full">
            <div className="flex justify-end gap-2 px-3 rounded-full w-full hover:text-primary hover:cursor-pointer">
              <DropdownMenu
                className={"hover:cursor-pointer"}
                listItems={profileMenuItems}
                onActivate={handleActivate}
              />
            </div>
          </div>
        </div>
        <h1 className="text-center mt-5">{userDetail.name}</h1>
        <div className="mt-5">
          <h2>Bio</h2>
          <p className="mx-3 mb-5">
            {userDetail.bio ? userDetail.bio : "No bio yet"}
          </p>
        </div>
        {token && isVenueManager && (
          <div className="mt-5">
            <div>
              <h2 className="mb-4">My Venues ({userDetail._count.venues})</h2>
              <div className="flex-col justify-around">
                <div className="mx-3">
                  <ul className="">
                    {userDetail.venues.map((venue) => (
                      <li
                        className="flex justify-between mx-1 font-bold "
                        key={venue.id}
                      >
                        <VenueBanner venueId={venue.id} />{" "}
                        <DropdownMenu
                          className={"hover:cursor-pointer"}
                          listItems={venueMenuItems}
                          onActivate={(value) => {
                            if (value === "edit_venue") handleEditVenue(venue);
                            if (value === "delete_venue")
                              handleDeleteVenue(venue.id);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
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
        <div ref={formRef}>
          {showCreateForm && (
            <CreateVenue
              venue={currentVenue}
              isEdit={isEdit}
              onClose={() => {
                setShowCreateForm(false);
                setCurrentVenue(null);
                setIsEdit(false);
              }}
            />
          )}
          {showUpdateForm && (
            <UpdateProfile isUser={userName} onClose={refreshUser} />
          )}
        </div>
        <div className="mt-5">
          <h2>My Upcoming Bookings</h2>
          <div>
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Details</th>
                  <th className="px-3 py-2"></th>
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
                    <td className="px-4 py-2">
                      <div className="flex flex-col sm:flex-row">
                        <span className="block sm:inline">{`From: ${formatDate(booking.dateFrom)}`}</span>
                        <span className="block sm:inline sm:ml-4">{`To: ${formatDate(booking.dateTo)}`}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 hover:cursor-pointer">
                      <DropdownMenu
                        listItems={bookingMenuItems}
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
    </div>
  );
};

export default Profile;
