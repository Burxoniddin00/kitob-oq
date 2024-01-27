"use client"
import { API } from "@/api/api";
import { Loading } from "@/components/loading/lading";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Password2 = () => { 
  const { data, setData } = useStore();
  const [pass, setPass] = useState('');
  const router = useRouter(); 
  const [t, setT] = useState(false);
  const addPasswordTwo = () => {
    setT(true);
    if(pass){
      if (data.password == pass) {
        fetch(`${API}register`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: data.password,
          }),
        })
          .then((res) => res.json())
          .then((res2) => {
            console.log(res2);
            if (res2.status == 201) {
              localStorage.setItem("token", res2.Token);
              router.push("/");
              localStorage.removeItem("userData");
            } else {
              toast.error(res2.message);
            }
          });
      } else {
        toast.warning("Parolni xato kiritdingiz");
      }

    }else{
      toast.warning("Parolni qaytadan yozmadingiz");

    }
    setT(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <ToastContainer />
      <Loading setTrue={t} />
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Parolni takrorlang
        </h1>
        <div className="mt-6">
          <div className="mb-4">
            <input
              placeholder="Parolni takrorlang"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              id="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-2">
            <button
              onClick={addPasswordTwo}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Kirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password2;