import React, { useState } from "react";
import Navbar from "../Navbar";
import TeamNav from '../TeamNav';
import "../styles/Reporting.css";
import "../styles/Global.css";

const Reporting: React.FC = () => {
  const [channelsToPost, setChannelsToPost] = useState("");
  const [selectedChannels, setSelectedChannels] = useState("");
  const [activityTracking, setActivityTracking] = useState(false);
  const [responsesVisibility, setResponsesVisibility] = useState("owner");
  const [editPermissions, setEditPermissions] = useState("owner");
  const [anonymousResponses, setAnonymousResponses] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      channelsToPost,
      selectedChannels,
      activityTracking,
      responsesVisibility,
      editPermissions,
      anonymousResponses,
    };
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="page-container reporting-container">
    <div>
      <Navbar />
      <TeamNav />
      <div className="reporting-container">
        <h1>Reporting Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Channels to post responses - Enter the channels where responses will be posted:
              <input
                type="text"
                value={channelsToPost}
                onChange={(e) => setChannelsToPost(e.target.value)}
                placeholder="Enter channel names..."
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Find and select up to 3 channels - Specify the channels to post:
              <input
                type="text"
                value={selectedChannels}
                onChange={(e) => setSelectedChannels(e.target.value)}
                placeholder="Select up to 3 channels..."
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Activity tracking - Include a summary of each participant’s activity in an external tool:
              <div>
                <label>
                  <input
                    type="radio"
                    name="activityTracking"
                    value="true"
                    checked={activityTracking === true}
                    onChange={() => setActivityTracking(true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="activityTracking"
                    value="false"
                    checked={activityTracking === false}
                    onChange={() => setActivityTracking(false)}
                  />
                  No
                </label>
              </div>
            </label>
          </div>

          <div className="form-group">
            <label>
              Responses visibility in the web app - Choose who can view responses:
              <select
                value={responsesVisibility}
                onChange={(e) => setResponsesVisibility(e.target.value)}
                required
              >
                <option value="owner">Owner</option>
                <option value="editors">Editors</option>
                <option value="participants">Participants</option>
                <option value="org-admins">Org Admins</option>
                <option value="managers">Managers</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Who can edit Permissions to edit check-in - Specify who can edit:
              <select
                value={editPermissions}
                onChange={(e) => setEditPermissions(e.target.value)}
                required
              >
                <option value="owner">Owner</option>
                <option value="editors">Editors</option>
                <option value="org-admins">Org Admins</option>
                <option value="managers">Managers</option>
                <option value="team-admins">Team Admins</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Collect anonymous responses - Allow participants to submit responses anonymously:
              <div>
                <label>
                  <input
                    type="radio"
                    name="anonymousResponses"
                    value="true"
                    checked={anonymousResponses === true}
                    onChange={() => setAnonymousResponses(true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="anonymousResponses"
                    value="false"
                    checked={anonymousResponses === false}
                    onChange={() => setAnonymousResponses(false)}
                  />
                  No
                </label>
              </div>
            </label>
          </div>

          <button type="submit">Save Settings</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Reporting;
