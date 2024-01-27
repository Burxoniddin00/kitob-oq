"use client";
import { Loading } from "@/components/loading/lading";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Pasword() {
  const { data, setData } = useStore();
  const [t, setT] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setT(true);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setT(false);
  };

  const addPasswordOne = () => {
    setT(true);
    if (data.password) {
      if (data.password.length > 7) {
        router.push("/password2");
      } else {
        toast.error(
          "Parolni to'liq to'ldiring, kamida 8 ta belgidan iborat bo'lishi lozim!"
        );
      }
    } else {
      toast.warning("Parolni qo'shing");
    }
    setT(false);
  };

  return (
    <div className="rela  tive flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <Loading setTrue={t} />
      <ToastContainer />
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Parol</h1>
        <div className="mt-6">
          <div className="mb-4">
            <input
              placeholder="Parol yarating"
              onChange={handleChange}
              value={data.password}
              id="password"
              name="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <button
              onClick={() => addPasswordOne()}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Davom etish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
