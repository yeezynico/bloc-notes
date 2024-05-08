import 'antd/dist/antd.css';
import './App.css';
import MarkdownInput from './components/MarkdownInput';
// import NoteDisplay from './components/NoteDisplay';
import Menu from './components/sidebar';
import Appe from './components/test'

const App = () => {
  return (
    <div className="app-container">
      <div className="menu">
        {/* <Menu /> */}
        <Appe />
      </div>
      <div className="content">
       
        {/* <MarkdownInput /> */}

      </div>
    </div>
  );
};

export default App;
