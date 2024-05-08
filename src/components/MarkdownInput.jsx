import React, { useState, useEffect } from 'react';
import Showdown from 'showdown';

const MarkdownInput = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [title, setTitle] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);
  const converter = new Showdown.Converter({ simpleLineBreaks: true });

  useEffect(() => {
    const savedEntriesJson = localStorage.getItem('savedEntries');
    if (savedEntriesJson) {
      setSavedEntries(JSON.parse(savedEntriesJson));
    }
  }, []);

  const handleMarkdownChange = (event) => {
    setMarkdownContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    const newEntry = { title, markdownContent };
    const newEntries = [...savedEntries, newEntry];
    localStorage.setItem('savedEntries', JSON.stringify(newEntries));
    setSavedEntries(newEntries);
  };

  const handleDelete = (index) => {
    const updatedEntries = [...savedEntries];
    updatedEntries.splice(index, 1);
    localStorage.setItem('savedEntries', JSON.stringify(updatedEntries));
    setSavedEntries(updatedEntries);
  };

  return (
    <div>
      <p>contenu :</p>
      <div className='column-input'>
        <textarea
          placeholder="Titre"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Saisir le Markdown..."
          value={markdownContent}
          onChange={handleMarkdownChange}
        />
        <button onClick={handleSave}>Enregistrer</button>
      </div>
      <div>
        {savedEntries.map((entry, index) => (
          <div key={index}>
            <div className='title_red'>{entry.title}</div>
            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(entry.markdownContent) }}></div>
            <button onClick={() => handleDelete(index)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarkdownInput;
