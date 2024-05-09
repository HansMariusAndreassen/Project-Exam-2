import React from "react";

const Profile = () => {
  const token = localStorage.getItem("accessToken");
  return (
    <div className="bg-background p-5 mt-20 flex flex-col">
      <div>
        <img src={""} alt={"Profile Banner"} />
      </div>
      <div>
        <img src="" alt="Profile Avatar picture" />
        <button className="btn">Edit Profile</button>
      </div>
      <h1>User name</h1>
      <div>
        <h2>Bio</h2>
        <p>Some bio text</p>
      </div>

      {token && (
        <div>
          <div>
            <h2>Venue Manager</h2>
            <p></p>
          </div>
          <button className="btn">Add Venue</button>
          <div>
            <h2>My Venues</h2>
            <p></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
