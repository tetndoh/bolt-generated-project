import React, { useState } from 'react';
    import axios from 'axios';

    function HomePage() {
      const [text, setText] = useState('');
      const [mood, setMood] = useState('');
      const [image, setImage] = useState(null);

      const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('text', text);
        formData.append('mood', mood);
        formData.append('image', image);

        try {
          const response = await axios.post('/api/entries', formData);
          console.log('Entry saved:', response.data);
          // Clear form fields after successful submission
          setText('');
          setMood('');
          setImage(null);
        } catch (error) {
          console.error('Error saving entry:', error);
        }
      };

      return (
        <div>
          <h1>My Diary</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="text">Thoughts of the Day:</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <label htmlFor="mood">Mood:</label>
            <select id="mood" value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="">Select Mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="tired">Tired</option>
              {/* Add more mood options as needed */}
            </select>

            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button type="submit">Save Entry</button>
          </form>
        </div>
      );
    }

    export default HomePage;
