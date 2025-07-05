"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function SigninModal({ deleteHandler, onClose }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { theme } = useSelector((state) => state.theme);
  
  const signinButtonHandler = () => {
    setOpen(false);
    navigate("/sign-in");
  };

  const closeModalHandler = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={closeModalHandler} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-60 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg ${theme === "dark" ? "bg-cardBg-dark" : "bg-white"} text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95`}
          >
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-[#1877F2]"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className={`text-base font-semibold leading-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    Sign in
                  </DialogTitle>
                  <div className="mt-2">
                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      If you want to continue please Sign in
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={signinButtonHandler}
                className="inline-flex w-full justify-center rounded-md bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#166FE5] transition-colors sm:ml-3 sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50"
              >
                Sign In
              </button>
              <button
                type="button"
                data-autofocus
                onClick={closeModalHandler}
                className={`mt-3 inline-flex w-full justify-center rounded-md ${theme === "dark" ? "bg-gray-800 text-white ring-gray-700 hover:bg-gray-700" : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"} px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset transition-colors sm:mt-0 sm:w-auto focus:outline-none`}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

