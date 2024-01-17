/* Used to highlight given text from a whole string */
import { memo } from "react";
import { COLORS } from "../../AutoComplete.constants";
import { replaceSpecialChar } from "../../AutoComplete.utils";

const Highlighter = ({ search = "", children = "" }) => {
  const replaceString = replaceSpecialChar(search);

  /* Splits the whole string into pieces with union of search string */
  const splits = children.split(new RegExp(`(${replaceString})`, "gi"));

  /* Use inline style to color the item which matches the search query */
  const getStyle = (key: string) => {
    if (key.toLowerCase() === search.toLowerCase()) {
      return { backgroundColor: COLORS.YELLOW };
    }
    return {};
  };

  return (
    <span>
      {splits.map((key, index) => (
        <span key={index} style={getStyle(key)}>
          {key}
        </span>
      ))}
    </span>
  );
};

export default memo(Highlighter);
