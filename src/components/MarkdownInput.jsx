import React, { useState } from 'react';
import Showdown from 'showdown'; // Importez Showdown

const MarkdownInput = () => {
  const [markdownContent, setMarkdownContent] = useState(''); // État pour stocker le contenu Markdown
  const [title, setTitle] = useState(''); // État pour stocker le titre

  const converter = new Showdown.Converter(); // Initialisez un objet Showdown

  // Fonction pour mettre à jour le contenu Markdown lorsqu'il y a des changements dans le textarea
  const handleMarkdownChange = (event) => {
    setMarkdownContent(event.target.value);
  };

  // Fonction pour mettre à jour le titre lorsqu'il y a des changements dans le textarea du titre
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className='column-input'>
      <div>{title}</div> {/* Affiche le contenu du titre */} 
      <div className='markdown-preview' dangerouslySetInnerHTML={{ __html: converter.makeHtml(markdownContent) }}></div>
      <textarea
        className='input-field'
        placeholder="Titre"
        value={title} // Liaison de la valeur du textarea du titre à l'état title
        onChange={handleTitleChange} // Événement onChange pour mettre à jour le titre
      />
      <textarea
        className='input-field'
        placeholder="Saisir le Markdown..."
        value={markdownContent} // Liaison de la valeur du textarea à l'état markdownContent
        onChange={handleMarkdownChange} // Événement onChange pour mettre à jour le contenu Markdown
      />
      <button className='input-button'>Enregistrer</button>
    </div>
  );
}

export default MarkdownInput;
