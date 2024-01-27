"use client";
import { API } from "@/api/api";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrEdit } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { MdAdd } from "react-icons/md";
import { Modal } from "@/components/modal/modal";
import { Loading } from "@/components/loading/lading";

const AddBokks = () => {
  const [addBooks, setAddBooks] = useState({
    booksName: "",
    booksPage: "",
    booksComment: "",
  });
  const [editBooks, setEditBooks] = useState({
    booksName: "",
    booksPage: "",
    booksComment: "",
    userId: "",
  });
  const [showModal, setShowModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const routers = useRouter();

  const [users, setUsers] = useState("");
  const [data, setData] = useState([]);
  const [t, setT] = useState(false);
  const [tt, setTt] = useState(false);

  useEffect(() => {
    setTt(true);
    let token = localStorage.getItem("token");
    if (data) {
      if (token) {
        fetch(`${API}userBooks/today`, {
          headers: {
            token,
          },
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data.data);
          });
      } else {
        routers.push("/login");
      }
    }
    if (token) {
      fetch(`${API}users`, {
        headers: { token },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== 201) {
            localStorage.removeItem("token");
            routers.push("/login");
          } else {
            setUsers(data.users[0]._id);
          }
        });
    } else {
      routers.push("/login");
    }
    if (data) {
      setT(true);
    }
    setTt(false);
  }, [routers,data]);

  const editBook = (id) => {
    let resp = data.filter((e) => e._id == id);
    edittext.value = resp[0].booksName;
    editnumber.value = resp[0].booksPage;
    editcomment.value = resp[0].booksComment;
    setEditBooks({
      booksName: resp[0].booksName,
      booksPage: resp[0].booksPage,
      booksComment: resp[0].booksComment,
      userId: id,
    });
    setTt(false);
  };

  const editBookclik = () => {
    setTt(true);
    let token = localStorage.getItem("token");
    if (editBooks && token) {
      fetch(`${API}userBooks/${editBooks.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          booksName: editBooks.booksName,
          booksPage: editBooks.booksPage,
          booksComment: editBooks.booksComment,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status <= 202) {
            setData(data.data);
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        });
    } else {
      routers.push("/login");
    }
    setAddBooks({
      booksName: "",
      booksPage: "",
      booksComment: "",
      userId: "",
    });
    setTt(false);
  };

  const addBook = () => {
    setTt(true);
    if (data.length !== 3) {
      let token = localStorage.getItem("token");
      if (token) {
        fetch(`${API}userBooks`, {
          headers: {
            "Content-Type": "application/json",
            token,
          },
          method: "POST",
          body: JSON.stringify({
            booksName: addBooks.booksName,
            booksPage: addBooks.booksPage,
            booksComment: addBooks.booksComment,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status <= 202) {
              setData(data.data);
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          });
        text.value = "";
        number.value = "";
        comment.value = "";
     
      } else {
        routers.push("/login");
      }
    } else {
      toast.warning(
        "Siz 1 kunda 3 tagacha kitob ma'lumotini qo'sha olasiz,siz bundan foydalanib bo'ldingiz"
      );
    }
    text.value = "";
    number.value = "";
    comment.value = "";
    setTt(false);
  };

  return (
    <>
      <Loading setTrue={tt} />

      <div className="mt-10 flex  h-[500px]  max-sm:flow-root  sm:flow-root  max-lg:flex  max-md:flex md:flex 2xl:flex  max-2xl:flex  max-xl:flex">
        <ToastContainer />
        <div
          onClick={() => setShowModal(true)}
          className="flex w-full gap-3 text-white cursor-pointer bg-[#42555fe0] h-[50px] sm:h-[30px] max-sm:h-[30px] items-center justify-center rounded-xl  max-2xl:hidden 2xl:hidden  max-xl:hidden  max-lg:hidden  max-md:hidden  md:hidden max-sm:flex sm:flex"
        >
          <MdAdd size={20} />
          <button className="text-base" type="button">
            Qo'shish
          </button>
        </div>
        <div className="flex flex-col w-[50%] sm:hidden  max-sm:hidden  max-lg:flex  max-2xl:flex 2xl:flex max-xl:flex md:flex  max-md:flex ">
          <div className=" w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center text-gray-700">
              Kitob ma'lumotlarini kiriting
            </h1>
            <div className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Kitob nomi
                </label>
                <input
                  onChange={(e) =>
                    setAddBooks({ ...addBooks, booksName: e.target.value })
                  }
                  id="text"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="number"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Kitob beti
                </label>
                <input
                  onChange={(e) =>
                    setAddBooks({ ...addBooks, booksPage: e.target.value })
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 3);
                  }}
                  id="number"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="comment"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Izoh kiriting
                </label>
                <textarea
                  className="resize-none w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) =>
                    setAddBooks({ ...addBooks, booksComment: e.target.value })
                  }
                  color="10"
                  rows="5"
                  id="comment"
                ></textarea>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => addBook()}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Qo'shish
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex flex-col gap-5 overflow-y-scroll max-sm:overflow-auto  sm:overflow-auto  max-sm:w-full sm:w-full md:w-[50%]">
          {t > 0 ? (
            data ? (
              data.map((i) => (
                <ul
                  key={i._id}
                  className="relative max-md:mt-4 md:ml-5 p-6 pb-10 break-words bg-white rounded-md shadow-md lg:max-w-xl"
                >
                  <li className="absolute right-5  ">
                    <p className="absolute right-4">
                      {dayjs(i.created_at).format("HH:mm")}
                    </p>
                  </li>
                  <li className="mt-7 text-2xl border-solid border-b-2 pb-2 lg:text-4xl md:text-xs sm:text-base	max-sm:text-sm">
                    {i.booksName}
                  </li>
                  <li className="text-xl mt-2 mb-2 lg:text-2xl md:text-lg sm:text-sm max-sm:text-xs">
                    <b>{i.booksPage}</b> bet
                  </li>
                  <li className="mb-3 text-sm lg:text-lg md:text-base sm:text-sm	max-sm:text-xs	">
                    {i.booksComment}
                  </li>
                  <li
                    className=" absolute right-5"
                    onClick={() => {
                      editBook(i._id), setEditModal(true);
                    }}
                  >
                    <div className="hidden lg:flex  gap-5">
                      <GrEdit color="green" size={25} cursor={"pointer"} />
                    </div>
                    <div className="flex lg:hidden sm:hidden  gap-5">
                      <GrEdit color="green" size={20} cursor={"pointer"} />
                    </div>
                    <div className="hidden lg:hidden sm:flex  gap-5">
                      <GrEdit color="green" size={15} cursor={"pointer"} />
                    </div>
                  </li>
                </ul>
              ))
            ) : (
              <h2>Sizda hozircha qo'shilgan ma'lumotlar yo'q</h2>
            )
          ) : (
            <h2>Sizda hozircha qo'shilgan ma'lumotlar yo'q</h2>
          )}
        </div>
      </div>
      <Modal setModal={setShowModal} modal={showModal}>
        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-semibold text-gray-800"
          >
            Kitob nomi
          </label>
          <input
            onChange={(e) =>
              setAddBooks({ ...addBooks, booksName: e.target.value })
            }
            id="text"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="number"
            className="block text-sm font-semibold text-gray-800"
          >
            Kitob beti
          </label>
          <input
            onChange={(e) =>
              setAddBooks({ ...addBooks, booksPage: e.target.value })
            }
            id="number"
            type="number"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="comment"
            className="block text-sm font-semibold text-gray-800"
          >
            Izoh kiriting
          </label>
          <textarea
            className="resize-none w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={(e) =>
              setAddBooks({ ...addBooks, booksComment: e.target.value })
            }
            color="10"
            rows="5"
            id="comment"
          ></textarea>
        </div>
        <div className="mt-2">
          <button
            onClick={() => {
              addBook(), setModal(false);
            }}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Qo'shish
          </button>
        </div>
      </Modal>
      <Modal setModal={setEditModal} modal={editModal}>
        <div className="mb-4">
          <label
            htmlFor="edittext"
            className="block text-sm font-semibold text-gray-800"
          >
            Kitob nomi
          </label>
          <input
            onChange={(e) =>
              setEditBooks({ ...editBooks, booksName: e.target.value })
            }
            id="edittext"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="editnumber"
            className="block text-sm font-semibold text-gray-800"
          >
            Kitob beti
          </label>
          <input
            onChange={(e) =>
              setEditBooks({ ...editBooks, booksPage: e.target.value })
            }
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 3);
            }}
            id="editnumber"
            type="number"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="editcomment"
            className="block text-sm font-semibold text-gray-800"
          >
            Izoh kiriting
          </label>
          <textarea
            className="resize-none w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={(e) =>
              setEditBooks({ ...editBooks, booksComment: e.target.value })
            }
            color="10"
            rows="5"
            id="editcomment"
          ></textarea>
        </div>
        <div className="mt-2">
          <button
            onClick={() => {
              editBookclik(), setEditModal(false);
            }}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            O'zgartirish
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddBokks;
