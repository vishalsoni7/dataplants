import { useState, useContext, ChangeEvent, FC } from "react";

import { days } from "../Utils/staticdata";
import { ModalProps } from "../Utils/types";
import { addSchedule, handleModal, updateSchedule } from "../Utils/actions";
import { ScheduleContext } from "../Context/ScheduleContext";

import "../Components/modal.css";

const Modal: FC<ModalProps> = ({ id }) => {
  // @ts-ignore
  const { scheduleState, dispatch, setSelectedId } =
    useContext(ScheduleContext);

  const [selectedDay, setSelectedDay] = useState([]);

  const findSchedule =
    // @ts-ignore
    scheduleState.schedule.find((item) => item._id === id) || {};

  const [input, setInput] = useState({
    title: "",
    description: "",
    subject: "",
    frequency: "",
    repeat: [],
    time: "",
    ...findSchedule,
  });

  const isDoneButtonDisabled = !input.title || !input.description;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // @ts-ignore
    setInput((pre) => {
      if (name === "frequency" && pre.frequency === "Monthly") {
        return { ...pre, frequency: value, repeat: [] };
      }

      return {
        ...pre,
        [name]:
          name === "repeat" && pre.frequency === "Weekly"
            ? pre.repeat
              ? pre.repeat.includes(value)
                ? // @ts-ignore
                  pre.repeat.filter((day) => day !== value)
                : [...pre.repeat, value]
              : [value]
            : value,
      };
    });
  };

  const handleNewData = () => {
    if (id) {
      // @ts-ignore
      updateSchedule(dispatch, id, input);
    } else {
      addSchedule(dispatch, input);
      setInput({
        title: "",
        description: "",
        subject: "",
        frequency: "",
        repeat: [],
        time: "",
      });
    }
    handleModal(dispatch);
  };

  const handleCancel = () => {
    handleModal(dispatch);
    setSelectedId(null);
  };

  const handleActive = (day: any) => {
    // @ts-ignore
    setSelectedDay((prevSelectedDays) => {
      // @ts-ignore
      if (prevSelectedDays.includes(day)) {
        // @ts-ignore
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  return (
    <div className="modal-div">
      <div>
        <p> Add Shedule </p>
        <div className="modal-input-div">
          <span> Title </span>
          <input
            type="text"
            placeholder="Sample Subject"
            name="title"
            value={input?.title}
            onChange={handleChange}
          />
        </div>

        <div className="modal-input-div">
          <span> Description </span>
          <input
            type="text"
            placeholder="Sample Description"
            name="description"
            value={input?.description}
            onChange={handleChange}
          />
        </div>

        <div className="modal-input-div">
          <span> Subject </span>
          <input
            type="text"
            placeholder="Sample Subject"
            name="subject"
            value={input?.subject}
            onChange={handleChange}
          />
        </div>

        <div className="modal-input-div">
          <span> Frequency </span>
          <select
            name="frequency"
            value={input?.frequency}
            onChange={handleChange}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        {input?.frequency === "Monthly" && (
          <div className="modal-input-div">
            <span> Repeat </span>
            <select name="repeat" value={input?.repeat} onChange={handleChange}>
              <option value="First Monday">First Monday</option>
              <option value="Last Friday">Last Friday</option>
            </select>
          </div>
        )}

        {input?.frequency === "Weekly" && (
          <div className="modal-input-div">
            <span> Repeat </span>
            <div className="day-initial">
              {days.map((day) => (
                <span
                  // @ts-ignore
                  className={selectedDay.includes(day?.value) ? "active" : ""}
                  key={day.name}
                  // @ts-ignore
                  multiple={true}
                  onClick={() => {
                    handleActive(day.value);
                    handleChange({
                      // @ts-ignore
                      target: { name: "repeat", value: day.value },
                    });
                  }}
                >
                  {day.name.charAt(0)}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="modal-input-div ">
          <span> Time </span>
          <input
            type="time"
            name="time"
            value={input?.time}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="btn-div">
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="done-btn"
          onClick={handleNewData}
          disabled={isDoneButtonDisabled}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Modal;
