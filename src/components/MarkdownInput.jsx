import React, { useState, useEffect } from 'react';
import Showdown from 'showdown'; // Importez Showdown

const MarkdownInput = () => {
  const [markdownContent, setMarkdownContent] = useState(''); // État pour stocker le contenu Markdown
  const [title, setTitle] = useState(''); // État pour stocker le titre
  const [savedEntries, setSavedEntries] = useState([]); // État pour stocker les entrées sauvegardées
  const converter = new Showdown.Converter({ simpleLineBreaks: true });

  // Effet pour charger les entrées sauvegardées lors du chargement de la page
  useEffect(() => {
    const savedEntriesJson = localStorage.getItem('savedEntries');
    if (savedEntriesJson) {
      setSavedEntries(JSON.parse(savedEntriesJson));
    }
  }, []);

  // Fonction pour mettre à jour le contenu Markdown lorsqu'il y a des changements dans le textarea
  const handleMarkdownChange = (event) => {
    setMarkdownContent(event.target.value);
  };

  // Fonction pour mettre à jour le titre lorsqu'il y a des changements dans le textarea du titre
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Fonction pour enregistrer l'entrée dans le stockage local et mettre à jour l'affichage
  const handleSave = () => {
    // Créez une nouvelle entrée avec le titre et le contenu Markdown actuels
    const newEntry = { title, markdownContent };
    // Ajoutez la nouvelle entrée à la liste des entrées sauvegardées
    const newEntries = [...savedEntries, newEntry];
    // Enregistrez la liste mise à jour dans le stockage local
    localStorage.setItem('savedEntries', JSON.stringify(newEntries));
    // Mettez à jour l'état avec la nouvelle liste des entrées sauvegardées
    setSavedEntries(newEntries);
  };

  // Fonction pour supprimer une entrée sauvegardée
  const handleDelete = (index) => {
    const updatedEntries = [...savedEntries];
    updatedEntries.splice(index, 1); // Supprime l'entrée à l'index spécifié
    localStorage.setItem('savedEntries', JSON.stringify(updatedEntries)); // Met à jour le localStorage
    setSavedEntries(updatedEntries); // Met à jour l'état savedEntries
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
      {/* Afficher les entrées sauvegardées */}
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
