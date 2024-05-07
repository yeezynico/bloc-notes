import 'antd/dist/antd.css';
import './App.css';
import MarkdownInput from './components/MarkdownInput';
import NoteDisplay from './components/NoteDisplay';
import Menu from './components/sidebar';

const App = () => {
  return (
    <div className="app-container">
      <div className="menu">
        <Menu />
      </div>
      <div className="content">
        <NoteDisplay />
        <MarkdownInput />
      </div>
    </div>
  );
};

export default App;
