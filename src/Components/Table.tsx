import { FC } from "react";

import { ScheduleTableProps } from "../Utils/types";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";

const ScheduleTable: FC<ScheduleTableProps> = ({
  scheduleState,
  setSelectedId,
  handleModal,
  deleteSchedule,
  dispatch,
}) => {
  return (
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
        {scheduleState?.schedule?.map((schedule) => (
          <tr key={schedule._id}>
            <td className="td-id">{schedule.title}</td>
            <td>{schedule.description}</td>
            <td className="td-amount">{schedule.subject}</td>
            <td className="td-right">
              {new Date(schedule.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </td>
            <td>
              <FaPen
                className="edit"
                onClick={() => {
                  setSelectedId(schedule?._id);
                  handleModal(dispatch);
                }}
              />
              <FaRegTrashAlt
                className="trash"
                onClick={() => deleteSchedule(dispatch, schedule?._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
