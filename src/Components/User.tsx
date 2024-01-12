import { PiUserCircleMinusDuotone } from "react-icons/pi";
import { PiGithubLogoDuotone } from "react-icons/pi";
import { SiGithubactions } from "react-icons/si";

const User = () => {
  return (
    <div className="user-div">
      <span>
        <a
          href="https://vishalsoni.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <PiUserCircleMinusDuotone />{" "}
        </a>
      </span>{" "}
      <span>
        <a
          href="https://github.com/vishalsoni7/dataplants.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <PiGithubLogoDuotone />{" "}
        </a>
      </span>
      <span>
        <a
          href="https://replit.com/@vishalsoni7/dataplant#index.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <SiGithubactions />
        </a>
      </span>
    </div>
  );
};

export default User;
