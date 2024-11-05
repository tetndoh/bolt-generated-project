import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    function DiaryPage() {
      const [entries, setEntries] = useState([]);

      useEffect(() => {
        const fetchEntries = async () => {
          try {
            const response = await axios.get('/api/entries');
            setEntries(response.data);
          } catch (error) {
            console.error('Error fetching entries:', error);
          }
        };

        fetchEntries();
      }, []);

      return (
        <div>
          <h1>My Diary Entries</h1>
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <p>Date: {entry.date}</p>
                <p>Time: {entry.time}</p>
                <p>Mood: {entry.mood}</p>
                <p>{entry.text}</p>
                {entry.image && <img src={entry.image} alt="Diary Entry Image" />}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default DiaryPage;
