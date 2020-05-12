// Query Selectors
const bookmarks = document.getElementsByTagName('li');
const bookmarkList = document.querySelector('.bookmarks-list');
const deleteButtons = document.querySelectorAll('.delete-icon');
const input = document.querySelector('.search-input');

const getNextElement = y => {
  const draggableElements = [...bookmarkList.querySelectorAll('li:not(.dragging)')];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return {offset: offset, element: child};
      } else {
        return closest;
      }
    },
    {offset: Number.NEGATIVE_INFINITY}
  ).element;
};

// Event Handlers
const onKeyupEventHandler = e => {
  let query, i, txtValue;
  query = e.target.value.toLowerCase();

  for (i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i]) {
      txtValue = bookmarks[i].textContent || bookmarks[i].innerText;
      if (txtValue.toLowerCase().indexOf(query) > -1) {
        bookmarks[i].style.display = '';
      } else {
        bookmarks[i].style.display = 'none';
      }
    }
  }
};

const dragStartEventHandler = e => {
  e.target.classList.add('dragging');
};

const dragEndEventHandler = e => {
  e.target.classList.remove('dragging');
};

const dragOverEventHandler = e => {
  e.preventDefault();
  const nextElement = getNextElement(e.clientY);
  const draggable = document.querySelector('.dragging');
  if (nextElement) {
    bookmarkList.insertBefore(draggable, nextElement);
  } else {
    bookmarkList.appendChild(draggable);
  }
};

const clickEventHandler = e => {
  e.preventDefault();
  e.target.parentNode.remove();
};

// attach EventHandlers
input.addEventListener('keyup', onKeyupEventHandler);

bookmarkList.addEventListener('dragover', dragOverEventHandler);

[...bookmarks].forEach(draggable => {
  draggable.addEventListener('dragstart', dragStartEventHandler);
  draggable.addEventListener('dragend', dragEndEventHandler);
});

deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', clickEventHandler);
});
