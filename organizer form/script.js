document.getElementById('add-category').addEventListener('click', function () {
    const container = document.getElementById('ticket-container');

    // Create a new ticket category row
    const newCategory = document.createElement('div');
    newCategory.classList.add('ticket-category');
    newCategory.setAttribute('draggable', 'true');
    newCategory.innerHTML = `
        <span class="drag-handle">☰</span>
        <input type="text" name="ticket_categories[]" placeholder="Category Name" required>
        <input type="text" placeholder="Category Includes" required>
        <input type="number" name="ticket_prices[]" placeholder="Price ($)" required>
        <button type="button" class="delete-category">Delete</button>
    `;

    // Add event listeners for dragging
    addDragEvents(newCategory);

    // Append the new category row to the container
    container.appendChild(newCategory);
});

document.getElementById('ticket-container').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-category')) {
        e.target.parentElement.remove();
    }
});

// Drag and Drop Logic
function addDragEvents(category) {
    category.addEventListener('dragstart', function () {
        category.classList.add('dragging');
    });

    category.addEventListener('dragend', function () {
        category.classList.remove('dragging');
    });
}

const container = document.getElementById('ticket-container');
container.addEventListener('dragover', function (e) {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(container, e.clientY);
    if (afterElement == null) {
        container.appendChild(dragging);
    } else {
        container.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.ticket-category:not(.dragging)')];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

// Add initial drag events
document.querySelectorAll('.ticket-category').forEach(addDragEvents);

document.getElementById('file-upload').addEventListener('change', function(event) {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';  // Clear any previous list
    
    const files = event.target.files;
    if (files.length > 0) {
        const ul = document.createElement('ul'); // Create a new list to hold file names

        // Loop through the selected files and add them to the list
        for (let i = 0; i < files.length; i++) {
            const li = document.createElement('li');
            li.textContent = files[i].name; // Display file name
            ul.appendChild(li);
        }

        fileList.appendChild(ul); // Append the list to the file-list div
    } else {
        fileList.innerHTML = 'No files selected'; // Display message if no files are selected
    }
});