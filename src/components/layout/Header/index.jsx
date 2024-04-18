import React from "react";

const Header = () => {
  return (
    <header className="sticky m-auto min-w-full">
      <div className="flex max-w-7xl bg-yellow p-5 m-0 rounded-b-25 gap-2 items-center justify-between">
        <h1 className="text-orange uppercase text-2xl">Havens</h1>
        <div className="flex gap-2">
          <button className="btn-revert">Register</button>
          <button className="btn-revert">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
