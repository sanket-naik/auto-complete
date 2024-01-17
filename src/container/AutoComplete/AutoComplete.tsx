import React, { useRef, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import "./AutoComplete.styles.css";
import Card from "./components/Card/Card";
import Loading from "./components/Loading/Loading";
import useOutsideAlerter from "./hooks/useOutsideClickAlert";
import { AutoCompletePropType, RecordType } from "./AutoComplete.types";

export default function AutoComplete({
  fetchWithQuery,
  value,
  debounceDelay = 500,
  placeholder = "Type to perform search...",
  onSelect,
}: AutoCompletePropType) {
  const { label = "" } = value || {};

  const [searchText, setSearchText] = useState<string>(label);
  const [showDropdown, setShowDropdown] = useState(false);
  const [records, setRecords] = useState<RecordType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, sethasResults] = useState(true);
  const containerRef = useRef(null);

  /* Custom hook to determine bubbled event outside of autocomplete */
  useOutsideAlerter(containerRef, () => {
    if (showDropdown) {
      setShowDropdown(false);
    }
  });

  const handleOnFocus = () => {
    setShowDropdown(true);
  };

  /* Custom hook which callbacks the function after declared timeout */
  const handleSearch = useDebounce(async (searchQuery: string) => {
    if (searchQuery === "") {
      return setRecords([]);
    }
    setIsLoading(true);
    const data = await fetchWithQuery(searchQuery);
    setIsLoading(false);
    setRecords(data);
    sethasResults(data.length > 0);
  }, debounceDelay);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value = "" } = event.target;
    setSearchText(value);
    /* Debounces the search function */
    handleSearch(value);
  };

  /* When a record is selected */
  const handleCardClick = (record: RecordType) => {
    onSelect(record);
    setSearchText(record.label);
    setShowDropdown(false);
  };

  return (
    <div className="input-container" ref={containerRef}>
      <input
        list="searchList"
        className="text-input"
        type="text"
        value={searchText}
        onFocus={handleOnFocus}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />

      {showDropdown && (
        <div className="suggestions-container">
          {/* When a record is in fetching state */}
          {isLoading && <Loading label="Fetching data" />}

          {!isLoading && (
            <>
              {/* State before search */}
              {records.length === 0 && !searchText && (
                <div className="row-item">Start typing to find results..</div>
              )}
              {/* When no results are found from api */}
              {searchText && !hasResults && (
                <div className="row-item">No results found !</div>
              )}

              {records.length > 0 &&
                records.map((record, index) => (
                  <Card
                    key={index}
                    record={record}
                    search={searchText}
                    onclick={handleCardClick}
                  />
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
