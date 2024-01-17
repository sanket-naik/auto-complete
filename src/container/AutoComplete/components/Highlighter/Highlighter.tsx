/* Used to highlight given text from a whole string */
import { COLORS } from "../../AutoComplete.constants";

const Highlighter = ({ search = "", children = "" }) => {
  /* Splits the whole string into pieces with union of search string */
  const splits = children.split(new RegExp(`(${search})`, "gi"));

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

export default Highlighter;
