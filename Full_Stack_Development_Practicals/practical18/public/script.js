const noteForm = document.getElementById('noteForm');
const noteIdInput = document.getElementById('noteId');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const submitBtn = document.getElementById('submitBtn');
const notesList = document.getElementById('notesList');

// Fetch and display all notes
async function loadNotes() {
    try {
        const response = await fetch('/api/notes');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const notes = await response.json();
        notesList.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <small>Created: ${new Date(note.timestamp).toLocaleString()}</small>
        <div class="note-actions">
          <button class="edit-btn" onclick="editNote('${note._id}', '${note.title}', '${note.content}')">Edit</button>
          <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
        </div>
      `;
            notesList.appendChild(noteElement);
        });
    } catch (error) {
        console.error('Error loading notes:', error);
        notesList.innerHTML = '<p>Error loading notes. Please try again later.</p>';
    }
}

// Create or update a note
noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = noteIdInput.value;
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/notes/${id}` : '/api/notes';
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            noteForm.reset();
            noteIdInput.value = '';
            submitBtn.textContent = 'Add Note';
            await loadNotes();
        } else {
            const errorData = await response.json();
            alert(`Error saving note: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server error. Please check the console for details.');
    }
});

// Edit a note
function editNote(id, title, content) {
    noteIdInput.value = id;
    titleInput.value = title;
    contentInput.value = content;
    submitBtn.textContent = 'Update Note';
}

// Delete a note
async function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                await loadNotes(); // Refresh the notes list
                alert('Note deleted successfully');
            } else {
                const errorData = await response.json();
                alert(`Error deleting note: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Server error during deletion. Please check the console for details.');
        }
    }
}

// Load notes on page load
loadNotes();