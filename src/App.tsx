import { useState } from "react";
import "./App.css";
import AutoComplete from "./container/AutoComplete/AutoComplete";
import { feetchGithubUserAPI } from "./endpoints/endpoints";
import Card from "./container/AutoComplete/components/Card/Card";
import {
  GithubUserItemType,
  RecordType,
} from "./container/AutoComplete/AutoComplete.types";

function App() {
  const [selectedRecords, setSelectedRecord] = useState<RecordType>();

  /* Handler to search username from github user */
  const fetchNewRecords = async (value: string) => {
    try {
      const response = await feetchGithubUserAPI(value);
      if (response?.message) {
        throw response.message;
      }
      const { items = [] } = response;
      return items?.map(
        ({ login, id, url, avatar_url }: GithubUserItemType) => {
          return {
            label: login,
            value: id,
            profileUrl: url,
            avatar: avatar_url,
          };
        }
      );
    } catch (errResponse) {
      /* place to show proper error in a snackbar & log a sentry for the same */
      console.log(errResponse);
      return [];
    }
  };

  return (
    <div className="parentWrapper">
      {selectedRecords && (
        <div className="card-spacing">
          <Card record={selectedRecords} />
        </div>
      )}
      <div className="heading">Search for github users</div>
      <AutoComplete
        value={selectedRecords}
        fetchWithQuery={fetchNewRecords}
        onSelect={setSelectedRecord}
        debounceDelay={300}
      />
    </div>
  );
}

export default App;
