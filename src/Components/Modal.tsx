import "../Components/modal.css";

const Modal = (prop: any) => {
  // @ts-ignore
  const findSchedule = prop.data.find((schedule) => schedule._id === prop.id);

  const { title, description, frequency, repeat, subject, time } = findSchedule;

  return (
    <div className="modal-div">
      <div>
        <p> Add Shedule </p>
        <div className="modal-input-div ">
          <span> Title </span>{" "}
          <input
            placeholder="Sample Subject"
            name="Title"
            defaultValue={title}
          />
        </div>

        <div className="modal-input-div ">
          <span> Description </span>{" "}
          <input
            placeholder="Sample Description"
            name="Description"
            defaultValue={description}
          />
        </div>

        <div className="modal-input-div ">
          <span> Subject </span>{" "}
          <input
            placeholder="Sample Subject"
            name="Subject"
            defaultValue={subject}
          />
        </div>

        <div className="modal-input-div ">
          <span> Frequency </span>{" "}
          <select name="Frequency" defaultValue={frequency}>
            <option value="Daily"> Daily </option>
            <option value="Weekly"> Weekly </option>
            <option value="Monthly"> Monthly </option>
          </select>
        </div>

        <div className="modal-input-div ">
          <span> Repeat </span>
        </div>

        <div className="modal-input-div ">
          <span> Time </span>
          <input type="date" name="Date" defaultValue={time} />
        </div>
      </div>
      <div className="btn-div">
        {" "}
        <button className="cancel-btn"> Cancel </button>
        <button className="done-btn"> Done </button>
      </div>
    </div>
  );
};

export default Modal;
