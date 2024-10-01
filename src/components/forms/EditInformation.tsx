"use client";

import Button from "../ui/button";

export default function EditInformation() {
  return (
    <div>
      <form action="">
        <div className="form-group flex flex-col mt-6">
          <input
            type="text"
            className="form-control auth__input focus:outline-none"
            placeholder="FULL NAME*"
          />
        </div>

        <div className="form-group flex flex-col mt-8">
          <input
            type="email"
            className="form-control auth__input focus:outline-none"
            placeholder="EMAIL ADDRESS*"
          />
        </div>

        <div className="form-group flex flex-col mt-8">
          <input
            type="text"
            className="form-control auth__input focus:outline-none"
            placeholder="PHONE NUMBER*"
          />
        </div>

        <div className="mt-9">
          <Button width="full" title="Save Changes" />
        </div>
      </form>
    </div>
  );
}
