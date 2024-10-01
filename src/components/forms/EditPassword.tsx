"use client";

import Button from "../ui/button";

export default function EditPassword() {
  return (
    <div>
      <form action="">
        <div className="form-group flex flex-col mt-6">
          <input
            type="text"
            className="form-control auth__input focus:outline-none"
            placeholder="PASSWORD*"
          />
        </div>

        <div className="form-group flex flex-col mt-8">
          <input
            type="email"
            className="form-control auth__input focus:outline-none"
            placeholder="NEW PASSWORD*"
          />
        </div>

        <div className="form-group flex flex-col mt-8">
          <input
            type="text"
            className="form-control auth__input focus:outline-none"
            placeholder="CONFIRM PASSWORD*"
          />
        </div>

        <div className="mt-9">
          <Button width="full" title="Save New Password" />
        </div>
      </form>
    </div>
  );
}
