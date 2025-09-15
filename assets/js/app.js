    const app = document.getElementById('app');
    console.log(app);
    // Button container
    const container = document.createElement('div');
    container.className = 'container';
    app.appendChild(container);

    // Buttons
    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn';
    homeBtn.textContent = '🏠';

    const addBtn = document.createElement('button');
    addBtn.className = 'btn';
    addBtn.textContent = '➕';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn';
    saveBtn.textContent = '🔖';

    container.appendChild(homeBtn);
    container.appendChild(addBtn);
    container.appendChild(saveBtn);

    // Input container (hidden initially)
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container hidden';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter name';

    const saveNameBtn = document.createElement('button');
    saveNameBtn.textContent = 'Save';
    saveNameBtn.className = 'action-btn';

    inputContainer.appendChild(nameInput);
    inputContainer.appendChild(saveNameBtn);
    app.appendChild(inputContainer);

    // Name list
    const nameList = document.createElement('div');
    nameList.className = 'name-list';
    app.appendChild(nameList);

    // Events
    addBtn.addEventListener('click', () => {
      inputContainer.classList.remove('hidden');
      nameInput.focus();
    });

    saveNameBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (name) {
        addNameToList(name);
        nameInput.value = '';
        inputContainer.classList.add('hidden');
      }
    });

    function addNameToList(name) {
      const item = document.createElement('div');
      item.className = 'name-item';

      const span = document.createElement('span');
      span.textContent = name;

      const actions = document.createElement('div');
      actions.className = 'name-actions';

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.className = 'action-btn';
      editBtn.onclick = () => editName(item, span, editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'action-btn';
      deleteBtn.onclick = () => item.remove();

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      item.appendChild(span);
      item.appendChild(actions);

      nameList.appendChild(item);
    }

    function editName(item, span, editBtn) {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;

      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      saveBtn.className = 'action-btn';
      saveBtn.onclick = () => {
        span.textContent = input.value.trim() || span.textContent;
        item.replaceChild(span, input);
        item.querySelector('.name-actions').replaceChild(editBtn, saveBtn);
      };

      item.replaceChild(input, span);
      item.querySelector('.name-actions').replaceChild(saveBtn, editBtn);
      input.focus();
    }