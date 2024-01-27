"use client";
import { API } from "@/api/api";
import { Loading } from "@/components/loading/lading";
import React, { useEffect, useState } from "react";
import "ldrs/waveform";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const [t, setT] = useState(false);
  const [data, setData] = useState("");
  const [page, setPage] = useState("Oylik");
  const [users, setUsers] = useState("");
  const router = useRouter();
  useEffect(() => {
    setT(true);
    let token = localStorage.getItem("token");
    fetch(`${API}reyting`, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status <= 202) {
          setData(data.data);
        } else {
          toast.warning("Kechirasiz nimadur xato");
        }
      });
    if (page === "Oylik") {
      fetch(`${API}reyting/today`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status <= 202) {
            setData(data.data);
          } else {
            toast.warning("Kechirasiz nimadur xato");
          }
        });
    } else if (page === "Kunlik") {
    }
    fetch(`${API}users/my`, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status <= 202) {
          setUsers(data.users[0]);
        } else {
          localStorage.clear("token");
          router.push("/login");
        }
      });
    setT(false);
  }, [page,router]);

  const changeBtn = () => {
    let token = localStorage.getItem("token");
    setT(true);
    if (page === "Oylik") {
      fetch(`${API}reyting`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status <= 202) {
            setData(data.data);
          } else {
            toast.warning("Kechirasiz nimadur xato");
          }
        });

      setPage("Kunlik");
    } else if (page === "Kunlik") {
      fetch(`${API}reyting/today`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status <= 202) {
            setData(data.data);
          } else {
            toast.warning("Kechirasiz nimadur xato");
          }
        });
      setPage("Oylik");
    }
    setT(false);
  };

  return (
    <div>
      <ToastContainer />
      <Loading setTrue={t} />
      <div>
        <button
          onClick={() => changeBtn()}
          className="bg-[#202d36] text-white mt-2 p-1 rounded-lg"
        >
          {page}
        </button>
      </div>
      {data
        ? data.map((e, i) => (
            <ol key={i} className="list-inside grid gap-3">
              <li
                className={
                  e.usersId === users._id
                    ? "flex mt-2 rounded-xl justify-between p-3 hover:bg-[#506370]  bg-[#3d9be7] text-white shadow-xl "
                    : "flex mt-2 rounded-xl justify-between p-3 hover:bg-[#435461]  bg-[#202d36] text-white shadow-xl "
                }
              >
                <div className="flex gap-2 items-center">
                  <p className="text-2xl">{i + 1}.</p>
                  <h2>
                    {e.Name} {e.LastName}
                  </h2>
                </div>
                <p>{e.booksPage} bet</p>
              </li>
            </ol>
          ))
        : ""}
    </div>
  );
};

export default Page;
