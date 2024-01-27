"use client";
import { API } from "@/api/api";
import { Loading } from "@/components/loading/lading";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const [t, setT] = useState(false);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(0);
  const [monthOpen, setMonthOpen] = useState("");
  const [dayOpen, setDayOpen] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [obj, setObj] = useState({
    Email: "",
    LastName: "",
    Name: "",
    Password: "",
    Phone: "",
  });
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleOpenDay = (value) => setDayOpen(dayOpen === value ? 0 : value);
  const handleOpenMonth = (value) =>
    setMonthOpen(monthOpen === value ? 0 : value);

  useEffect(() => {
    setT(true);
    let token = localStorage.getItem("token");
    if (token) {
      fetch(API + "userBooks", {
        headers: { token },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status <= 202) {
            setData(data.data);
          }
        });
      fetch(API + "users/my", {
        headers: { token },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status <= 202) {
            setUsers(data.users);
          }
        });
      setT(false);
    } else {
      router.push("/login");
    }
  }, [router]);

  const changeUsers = () => setShowModal(!showModal);

  const onChangeItem = (id) => {
    let token = localStorage.getItem("token");
    if (token) {
      if (obj.Email || obj.LastName || obj.Name || obj.Password || obj.Phone) {
        if (obj.Password) {
          if (obj.Password.length > 7) {
            fetch(`${API}users/${id}`, {
              headers: {
                "Content-Type": "application/json",
                token,
              },
              method: "PUT",
              body: JSON.stringify({
                Email: obj.Email,
                LastName: obj.LastName,
                Name: obj.Name,
                Password: obj.Password,
                Phone: obj.Phone,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status !== 201) {
                  toast.error(data.message);
                } else {
                  setShowModal(false);
                  toast.success(data.message);
                  setUsers(data.data);
                }
              });
          } else {
            toast.warning("Siz parolni 8tadan ko'proq qo'yishing kerak");
          }
        } else {
          fetch(`${API}users/${id}`, {
            headers: {
              "Content-Type": "application/json",
              token,
            },
            method: "PUT",
            body: JSON.stringify({
              Email: obj.Email,
              LastName: obj.LastName,
              Name: obj.Name,
              Password: obj.Password,
              Phone: obj.Phone,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status !== 201) {
                toast.error(data.message);
              } else {
                setShowModal(false);
                toast.success(data.message);
                setUsers(data.data);
              }
            });
        }
      } else {
        toast.warning("Ma'lumot birortasini o'zgartiring");
      }
    } else {
      router.push("/login");
    }
    setObj({
      Email: "",
      LastName: "",
      Name: "",
      Password: "",
      Phone: "",
    });
  };
  return (
    <>
      <Loading setTrue={t} />
      <ToastContainer />

      <div>
        <div>
          {users
            ? users.map((u, i) => (
                <div key={i}>
                  <ul
                    className={
                      showModal
                        ? "hidden"
                        : "w-full bg-[#202d36] text-white border-solid border-2 border-sky-500 p-2 rounded-md ml-auto mr-auto mt-5 mb-5"
                    }
                  >
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg">Ismingiz:</h2>
                      <h2>{u.Name}</h2>
                    </li>
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg">Familiyangiz:</h2>
                      <h2>{u.LastName}</h2>
                    </li>
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg">Telefon raqam:</h2>
                      <h2>+998 {u.Phone}</h2>
                    </li>
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg ">Gmail:</h2>
                      <h2>{u.Email}</h2>
                    </li>
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg">Parol:</h2>
                      <h2>{u.Password}</h2>
                    </li>
                  </ul>
                  <ul
                    className={
                      showModal
                        ? "w-full bg-[#202d36] text-white border-solid border-2 border-sky-500 p-2 rounded-md ml-auto mr-auto mt-5 mb-5"
                        : "hidden"
                    }
                  >
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg">Ismingiz:</h2>
                      <input
                        onChange={(e) =>
                          setObj({ ...obj, Name: e.target.value })
                        }
                        type="text"
                        defaultValue={u.Name}
                        className="bg-transparent outline-none rounded-lg text-end border-solid border-2 border-white pl-2 pr-2"
                      />
                    </li>
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg">Familiyangiz:</h2>
                      <input
                        onChange={(e) =>
                          setObj({ ...obj, LastName: e.target.value })
                        }
                        type="text"
                        defaultValue={u.LastName}
                        className="bg-transparent outline-none rounded-lg text-end border-solid border-2 border-white pl-2 pr-2"
                      />
                    </li>
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg">Telefon raqam:</h2>
                      <div className="flex items-center border-solid border-2 gap-5 rounded-md justify-end	w-[200px] border-white pl-2 pr-2">
                        <p className="border-r-2 border-sky-500">+998</p>
                        <input
                          onChange={(e) =>
                            setObj({ ...obj, Phone: e.target.value })
                          }
                          type="number"
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 9);
                          }}
                          defaultValue={Number(u.Phone)}
                          className="bg-transparent outline-none rounded-lg text-end max-w-[90px]"
                        />
                      </div>
                    </li>
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg ">Gmail:</h2>
                      <input
                        type="text"
                        onChange={(e) =>
                          setObj({ ...obj, Email: e.target.value })
                        }
                        defaultValue={u.Email}
                        className="bg-transparent outline-none rounded-lg text-end border-solid border-2 border-white pl-2 pr-2"
                      />
                    </li>
                    <li className="flex justify-between border-b-2 border-sky-600 mb-1">
                      <h2 className="text-xl max-md:text-lg">Parol:</h2>
                      <input
                        type="text"
                        onChange={(e) =>
                          setObj({ ...obj, Password: e.target.value })
                        }
                        defaultValue={u.Password}
                        className="bg-transparent outline-none rounded-lg text-end border-solid border-2 border-white pl-2 pr-2"
                      />
                    </li>
                  </ul>
                  <div className="text-end">
                    <div className={showModal ? "" : "hidden"}>
                      <button
                        onClick={() => changeUsers()}
                        className="bg-[#202d36] rounded-xl text-white p-2"
                      >
                        Qaytish
                      </button>
                      <button
                        onClick={() => onChangeItem(u._id)}
                        className="bg-[#202d36] rounded-xl text-white p-2 ml-3"
                      >
                        O'zgartrish
                      </button>
                    </div>
                    <button
                      onClick={() => changeUsers()}
                      className={
                        showModal
                          ? "hidden"
                          : "bg-[#202d36] rounded-xl text-white p-2 "
                      }
                    >
                      Ma'lumotlarni o'zgartirish
                    </button>
                  </div>
                </div>
              ))
            : ""}
        </div>
        {data
          ? data.map((e, i) => (
              <div key={i}>
                <Accordion
                  open={open === i + 1}
                  className="bg-[#202d36]  text-white mt-2 p-2 rounded-lg border-solid border-2 border-sky-500"
                >
                  <AccordionHeader onClick={() => handleOpen(i + 1)}>
                    {e.year}
                  </AccordionHeader>
                  <AccordionBody className="text-white">
                    {e.monthn
                      ? e.monthn.map((m, k) => (
                          <div key={k}>
                            <Accordion
                              open={monthOpen === `month${k}`}
                              className="bg-[#202d36] p-2 text-white mt-2  rounded-lg "
                            >
                              <AccordionHeader
                                onClick={() => handleOpenMonth(`month${k}`)}
                              >
                                {m.month}
                              </AccordionHeader>
                              <AccordionBody>
                                {m.day
                                  ? m.day.map((d, ke) => (
                                      <div key={ke}>
                                        <Accordion
                                          open={dayOpen === `day${ke}`}
                                          className="bg-[#202d36] p-2 text-white mt-2  rounded-lg"
                                        >
                                          <AccordionHeader
                                            onClick={() =>
                                              handleOpenDay(`day${ke}`)
                                            }
                                          >
                                            {d.day}
                                          </AccordionHeader>
                                          <AccordionBody>
                                            {d.data
                                              ? d.data.map((de, key) => (
                                                  <div
                                                    key={key}
                                                    className="border-2 rounded-md mt-2 p-2"
                                                  >
                                                    <div className="flex justify-between text-white mt-3 text-xl border-b-2">
                                                      <h2>{de.booksName}</h2>
                                                      <h2>
                                                        {de.booksPage} Bet
                                                      </h2>
                                                    </div>
                                                    <p className="text-white mt-2">
                                                      {de.booksComment}
                                                    </p>
                                                  </div>
                                                ))
                                              : ""}
                                          </AccordionBody>
                                        </Accordion>
                                      </div>
                                    ))
                                  : ""}
                              </AccordionBody>
                            </Accordion>
                          </div>
                        ))
                      : ""}
                  </AccordionBody>
                </Accordion>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default Page;
