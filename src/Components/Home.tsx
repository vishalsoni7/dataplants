import { useState } from "react";

import { FiPlusCircle } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import Modal from "./Modal";

import "../Components/table.css";

const Home = () => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal((modal) => !modal);
  };

  return (
    <div className="home-div">
      <div className="side-bar"></div>
      <div className="top-heading-div">
        {" "}
        <div>
          <div className="input-div">
            <input placeholder="Search" />
            <button onClick={handleModal}>
              <FiPlusCircle className="add-svg" /> Add{" "}
            </button>
          </div>

          <>
            <table>
              <thead>
                <tr className="t-row">
                  <th className="check-box-th">Title</th>
                  <th className="th-order"> Description</th>
                  <th>Subject</th>
                  <th>Schedule</th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-id"> #281209 </td>
                  <td> 7 July, 2023 </td>
                  <td className="td-amount"> ₹1,278.23 </td>
                  <td className="td-right"> ₹22 </td>
                  <td>
                    <FaPen className="edit" />
                    <FaRegTrashAlt className="trash" />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        </div>
      </div>
      {modal && (
        <div onClick={handleModal} className="modal_outer_div">
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal_outer_container"
          >
            <Modal />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
