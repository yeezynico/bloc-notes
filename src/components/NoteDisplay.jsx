import Showdown from "showdown";
import PropTypes from 'prop-types';

const converter = new Showdown.Converter();

const NoteDisplay = ({ title, markdownContent }) => {
  const htmlContent = converter.makeHtml(markdownContent);

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(markdownContent) }}/>
    </div>
  );
}

NoteDisplay.protoTypes = {
  title: PropTypes.string.isRequired,
  markdownValue: PropTypes.string.isRequired
}

export default NoteDisplay;
