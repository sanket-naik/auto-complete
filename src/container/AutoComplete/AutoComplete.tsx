import React, { useEffect, useRef, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import "./AutoComplete.styles.css";
import Card from "./components/Card/Card";
import Loading from "./components/Loading/Loading";
import useOutsideAlerter from "./hooks/useOutsideClickAlert";
import { AutoCompletePropType, RecordType } from "./AutoComplete.types";
import useKeyPress from "./hooks/useKeyPress";

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

  /* Key press events */
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const escapePress = useKeyPress("Escape");
  const [cursor, setCursor] = useState<any>(0);
  const selectRef = useRef<HTMLDivElement | null>(null);

  /* Updates the state when the key events are triggred */
  useEffect(() => {
    if (records.length && cursor !== null) {
      if (upPress) {
        setCursor((prevState: number) =>
          prevState > 0 ? prevState - 1 : prevState
        );
      } else if (downPress) {
        setCursor((prevState: number) =>
          prevState < records.length - 1 ? prevState + 1 : prevState
        );
      } else if (enterPress) {
        const recordItem = records[cursor];
        onSelect(recordItem);
        setSearchText(recordItem.label);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upPress, downPress, enterPress]);

  /* Trigger scroll to view the cursor is moved */
  useEffect(() => {
    if (upPress || downPress) {
      setChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);

  /* Close the dropdown when esc is clicked */
  useEffect(() => {
    if (escapePress) {
      setShowDropdown(false);
    }
  }, [escapePress]);

  /* Custom hook to determine bubbled event outside of autocomplete */
  useOutsideAlerter(containerRef, () => {
    if (showDropdown) {
      setShowDropdown(false);
    }
  });

  const handleOnFocus = () => {
    setShowDropdown(true);
  };

  /* Function to scroll list to the viewpoint */
  function setChange() {
    const selected = selectRef?.current?.querySelector(".active");
    if (selected) {
      selected?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  /* Custom hook which callbacks the function after declared timeout */
  const handleSearch = useDebounce(async (searchQuery: string) => {
    if (searchQuery === "") {
      return setRecords([]);
    }
    setShowDropdown(true);
    setIsLoading(true);
    const data = await fetchWithQuery(searchQuery);
    setIsLoading(false);
    setRecords(data);
    sethasResults(data.length > 0);
    setCursor(0);
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
        <div className="suggestions-container" ref={selectRef}>
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
                    onHovered={(value) => setCursor(value ? index : null)}
                    active={index === cursor}
                  />
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
