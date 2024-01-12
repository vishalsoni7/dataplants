import { useState, useContext, ChangeEvent, FC, useEffect } from "react";

import { days } from "../Utils/staticdata";
import { ModalProps } from "../Utils/types";
import { addSchedule, handleModal, updateSchedule } from "../Utils/actions";
import { ScheduleContext } from "../Context/ScheduleContext";

import "../Components/modal.css";

const Modal: FC<ModalProps> = ({ id }) => {
  // @ts-ignore
  const { scheduleState, dispatch } = useContext(ScheduleContext);
  const [input, setInput] = useState({
    title: "",
    description: "",
    subject: "",
    frequency: "",
    repeat: "",
    time: "",
  });

  const { title, description, subject, frequency, repeat, time } =
    // @ts-ignore
    scheduleState.schedule.find((item) => item._id === id) || {};

  const handleFrequencyChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInput((pre) => ({ ...pre, [name]: value }));
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
        repeat: "",
        time: "",
      });
    }
    handleModal(dispatch);
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div className="modal-div">
      <div>
        <p> Add Shedule </p>
        <div className="modal-input-div ">
          <span> Title </span>
          <input
            type="text"
            placeholder="Sample Subject"
            name="title"
            defaultValue={title}
            onChange={handleFrequencyChange}
          />
        </div>

        <div className="modal-input-div ">
          <span> Description </span>
          <input
            type="text"
            placeholder="Sample Description"
            name="description"
            defaultValue={description}
            onChange={handleFrequencyChange}
          />
        </div>

        <div className="modal-input-div ">
          <span> Subject </span>
          <input
            type="text"
            placeholder="Sample Subject"
            name="subject"
            defaultValue={subject}
            onChange={handleFrequencyChange}
          />
        </div>

        <div className="modal-input-div">
          <span> Frequency </span>
          <select
            name="frequency"
            defaultValue={frequency}
            onChange={handleFrequencyChange}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        {frequency === "Monthly" && (
          <div className="modal-input-div">
            <span> Repeat </span>
            <select
              name="repeat"
              defaultValue={repeat}
              onChange={handleFrequencyChange}
            >
              <option value="First Monday">First Monday</option>
              <option value="Last Friday">Last Friday</option>
            </select>
          </div>
        )}

        {frequency === "Weekly" && (
          <div className="modal-input-div">
            <span> Repeat </span>
            <div className="day-initial">
              {days.map((day) => (
                <span
                  key={day.name}
                  onClick={() =>
                    handleFrequencyChange({
                      target: { name: "repeat", value: day.value },
                    } as ChangeEvent<HTMLInputElement>)
                  }
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
            defaultValue={time}
            onChange={handleFrequencyChange}
          />
        </div>
      </div>
      <div className="btn-div">
        <button className="cancel-btn" onClick={() => handleModal(dispatch)}>
          Cancel
        </button>
        <button className="done-btn" onClick={handleNewData}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Modal;
