"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/loading/lading";

export default function Register() {
  const { data, setData } = useStore();
  const [t, setT] = useState(false);

  const handleChange = (e) => {
    setT(true);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setT(false);
  };
  const router = useRouter();

  const onClickBtn = () => {
    setT(true);

    if (data.name && data.lastName && data.email && data.phone) {
      let r = data.phone.length == 9;
      if (r) {
        setT(true);
        router.push("/password");
      } else {
        toast.error("Siz telefon raqamini qo'shmadingiz");
      }
    } else {
      toast.warning("Siz hamma ma'lumotlarni to'ldirmadingiz");
    }

    setT(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <ToastContainer />
      <Loading setTrue={t} />
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Ro'yxatdan o'tish
        </h1>
        <div className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Ismingiz
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-800"
            >
              Familyangiz
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="lastName"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-800"
            >
              Telefon raqamingiz
            </label>
            <div className="flex items-center w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40">
              <p>+998</p>
              <input
                onChange={handleChange}
                name="phone"
                type="number"
                className="ml-2 outline-none "
              />
            </div>
          </div>
          <div className="mt-2">
            <button
              onClick={onClickBtn}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
