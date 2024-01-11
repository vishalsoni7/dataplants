import { useState, useEffect, useReducer } from "react";

import { FiPlusCircle } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import { reducer, initialState } from "../Utils/reducer";

import { fetchData, deleteSchedule } from "../Utils/actions";

import Modal from "./Modal";

import "../Components/table.css";

const Home = () => {
  // @ts-ignore
  const [scheduleState, dispatch] = useReducer(reducer, initialState);

  const [selectedId, setSelectedId] = useState(null);
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal((modal) => !modal);
  };

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  return (
    <div className="home-div">
      <div className="side-bar"></div>
      <div className="top-heading-div">
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
                <th className="th-order">Description</th>
                <th>Subject</th>
                <th>Schedule</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scheduleState?.schedule?.map((schedule: any) => (
                <tr key={schedule._id}>
                  <td className="td-id">{schedule.title}</td>
                  <td>{schedule.description}</td>
                  <td className="td-amount">{schedule.subject}</td>
                  <td className="td-right">
                    {new Date(schedule.time).toLocaleDateString()}
                  </td>
                  <td>
                    <FaPen
                      className="edit"
                      onClick={() => {
                        return setSelectedId(schedule._id), handleModal();
                      }}
                    />
                    <FaRegTrashAlt
                      className="trash"
                      onClick={() => deleteSchedule(dispatch, schedule._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>
      {modal && (
        <div
          onClick={() => {
            return setSelectedId(null), handleModal();
          }}
          className="modal_outer_div"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal_outer_container"
          >
            <Modal id={selectedId} data={scheduleState.schedule} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
