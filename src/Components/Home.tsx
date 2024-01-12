import { useState, useContext, FC, ChangeEvent } from "react";

import { ScheduleContextProps } from "../Utils/types";
import { ScheduleContext } from "../Context/ScheduleContext";
import {
  deleteSchedule,
  handleModal,
  handleSearchChange,
} from "../Utils/actions";

import Modal from "./Modal";
import ScheduleTable from "./Table";

import { FiPlusCircle } from "react-icons/fi";

import "../Components/table.css";
import User from "./User";

const Home: FC = () => {
  // @ts-ignore
  const { scheduleState, dispatch } = useContext<ScheduleContextProps | null>(
    ScheduleContext
  );

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newSearchValue = event.target.value;
    handleSearchChange(dispatch, newSearchValue);
  };

  const [selectedId, setSelectedId] = useState<string | null>(null);

  console.log(scheduleState.schedule);

  return (
    <div className="home-div">
      <div className="side-bar"> </div>
      <div className="top-heading-div">
        <User />

        <div className="input-div">
          <input
            placeholder="Search"
            onChange={onChangeHandler}
            value={scheduleState.input}
          />
          <button onClick={() => handleModal(dispatch)}>
            <FiPlusCircle className="add-svg" /> Add
          </button>
        </div>
        <>
          <ScheduleTable
            scheduleState={scheduleState}
            setSelectedId={setSelectedId}
            handleModal={handleModal}
            deleteSchedule={deleteSchedule}
            dispatch={dispatch}
          />
        </>
      </div>
      {scheduleState.modal && (
        <div
          onClick={() => {
            setSelectedId(null);
            handleModal(dispatch);
          }}
          className="modal_outer_div"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal_outer_container"
          >
            <Modal id={selectedId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
