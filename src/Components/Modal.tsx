import { useState, useContext, ChangeEvent, FC } from "react";

import { days } from "../Utils/staticdata";
import { ModalProps } from "../Utils/types";
import { addSchedule, handleModal, isFieldsEmpty } from "../Utils/actions";
import { ScheduleContext } from "../Context/ScheduleContext";

import "../Components/modal.css";

const Modal: FC<ModalProps> = ({ id }) => {
  // @ts-ignore
  const { dispatch } = useContext(ScheduleContext);
  const [input, setInput] = useState({
    title: "",
    description: "",
    subject: "",
    frequency: "",
    repeat: "",
    time: "",
  });

  const handleFrequencyChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // @ts-ignore
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const addNewSchedule = () => {
    addSchedule(dispatch, input);
    setInput({
      title: "",
      description: "",
      subject: "",
      frequency: "",
      repeat: "",
      time: "",
    });
  };

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
            value={input?.title}
            onChange={handleFrequencyChange}
          />
        </div>

        <div className="modal-input-div ">
          <span> Description </span>
          <input
            type="text"
            placeholder="Sample Description"
            name="description"
            value={input?.description}
            onChange={handleFrequencyChange}
          />
        </div>

        <div className="modal-input-div ">
          <span> Subject </span>
          <input
            type="text"
            placeholder="Sample Subject"
            name="subject"
            value={input?.subject}
            onChange={handleFrequencyChange}
          />
        </div>

        <div className="modal-input-div">
          <span> Frequency </span>
          <select
            name="frequency"
            value={input.frequency}
            onChange={handleFrequencyChange}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        {input.frequency === "Monthly" && (
          <div className="modal-input-div">
            <span> Repeat </span>
            <select
              name="repeat"
              value={input?.repeat}
              onChange={handleFrequencyChange}
            >
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
            value={input?.time}
            onChange={handleFrequencyChange}
          />
        </div>
      </div>
      <div className="btn-div">
        <button className="cancel-btn" onClick={() => handleModal(dispatch)}>
          Cancel
        </button>
        <button
          className="done-btn"
          onClick={() => {
            addNewSchedule();
            handleModal(dispatch);
          }}
          disabled={isFieldsEmpty(input)}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Modal;
