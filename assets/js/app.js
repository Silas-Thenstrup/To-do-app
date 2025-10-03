class TodoApp {
    constructor() {
        this.currentScreen = 'start';
        this.isDarkMode = false;
        this.todos = [
            { id: 1, title: 'Dine kategorier', content: 'Navn', category: 'Opret Kategori', completed: false },
            { id: 2, title: 'Træning', content: 'Navn', category: 'Træning', completed: false },
            { id: 3, title: 'Guide', content: '', category: 'Guide', completed: false },
            { id: 4, title: 'Dine kategorier', content: 'Træning', category: 'Update front', completed: false },
            { id: 5, title: 'BEN', content: 'Navn', category: 'Træning', completed: false }
        ];
        this.init();
    }

    init() {
        this.render();
        this.showScreen('start');
    }

    render() {
        const app = document.getElementById('app');
        app.innerHTML = this.getScreensHTML();
    }

    getScreensHTML() {
        return `
            ${this.getStartScreen()}
            ${this.getColorPickerScreen()}
            ${this.getTodoScreen()}
            ${this.getSettingsScreen()}
        `;
    }

    getStartScreen() {
        return `
            <div class="screen start-screen" id="startScreen">
                <h1 class="start-title">Start</h1>
                <button class="continue-btn" onclick="app.showScreen('colorPicker')">
                    Fortsæt
                </button>
            </div>
        `;
    }

    getColorPickerScreen() {
        return `
            <div class="screen color-picker-screen" id="colorPickerScreen">
                <div class="welcome-text">
                    <strong>Velkommen.</strong><br>
                    Vælg vælg dit tema
                </div>
                
                <button class="dark-mode-toggle" onclick="app.toggleDarkMode()">
                    🌙 ${this.isDarkMode ? 'Light' : 'Dark'} Theme
                </button>
                
                <button class="settings-btn" onclick="app.showScreen('home')">
                    ⚙️ Start App
                </button>
            </div>
        `;
    }

    getTodoScreen() {
        return `
            <div class="screen todo-screen" id="homeScreen">
                <div class="add-todo-form" id="addTodoForm">
                    <input type="text" class="form-input" id="todoTitle" placeholder="Kategori titel">
                    <input type="text" class="form-input" id="todoContent" placeholder="Indhold">
                    <button class="form-btn" onclick="app.addTodo()">Tilføj</button>
                    <button class="form-btn cancel" onclick="app.toggleAddForm()">Annuller</button>
                </div>
                
                <div class="todo-grid" id="todoGrid">
                    ${this.getTodosHTML()}
                </div>
                
                <button class="form-btn" onclick="app.toggleAddForm()" style="width: 100%; margin-top: 10px;">
                    + Tilføj Ny Opgave
                </button>
            </div>
        `;
    }

    getTodosHTML() {
        return this.todos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" onclick="app.editTodo(${todo.id})">
                <div class="todo-header">${todo.category}</div>
                <div class="todo-content">${todo.content || 'Navn'}</div>
                <div class="todo-actions">
                    <button class="action-btn delete-btn" onclick="event.stopPropagation(); app.deleteTodo(${todo.id})">
                        ❌
                    </button>
                    <button class="action-btn complete-btn" onclick="event.stopPropagation(); app.toggleComplete(${todo.id})">
                        ${todo.completed ? '✅' : '⭕'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    getSettingsScreen() {
        return `
            <div class="screen settings-screen" id="settingsScreen">
                <div class="settings-header">Indstillinger</div>
                
                <button class="form-btn" onclick="app.toggleDarkMode()" style="width: 100%; margin-bottom: 15px;">
                    ${this.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
                
                <button class="form-btn" onclick="app.clearAllTodos()" style="width: 100%; margin-bottom: 15px; background: #ff4757;">
                    🗑️ Slet Alle Opgaver
                </button>
                
                <button class="form-btn" onclick="app.resetApp()" style="width: 100%; background: #666;">
                    🔄 Nulstil App
                </button>
                
                <div style="margin-top: 30px; color: #666; font-size: 12px;">
                    Total opgaver: ${this.todos.length}<br>
                    Færdige: ${this.todos.filter(t => t.completed).length}
                </div>
            </div>
        `;
    }

    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show target screen
        let targetScreen;
        switch(screenName) {
            case 'start':
                targetScreen = document.getElementById('startScreen');
                break;
            case 'colorPicker':
                targetScreen = document.getElementById('colorPickerScreen');
                break;
            case 'home':
                targetScreen = document.getElementById('homeScreen');
                document.getElementById('homeNav')?.classList.add('active');
                break;
            case 'calendar':
                // For now, show todo screen with calendar view
                targetScreen = document.getElementById('homeScreen');
                document.getElementById('calendarNav')?.classList.add('active');
                break;
            case 'settings':
                targetScreen = document.getElementById('settingsScreen');
                document.getElementById('settingsNav')?.classList.add('active');
                break;
        }

        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        this.currentScreen = screenName;
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        const container = document.getElementById('phoneContainer');
        const body = document.body;
        
        if (this.isDarkMode) {
            container.classList.add('dark');
            body.classList.add('dark');
        } else {
            container.classList.remove('dark');
            body.classList.remove('dark');
        }
        
        // Re-render to update button text
        this.render();
        this.showScreen(this.currentScreen);
    }
}
// Fortsættelse af TodoApp class - Todo Functions
TodoApp.prototype.addTodo = function() {
    const titleInput = document.getElementById('todoTitle');
    const contentInput = document.getElementById('todoContent');
    
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    if (!title) {
        alert('Indtast venligst en kategori titel!');
        return;
    }
    
    const newTodo = {
        id: Date.now(),
        title: title,
        content: content || 'Navn',
        category: title,
        completed: false
    };
    
    this.todos.push(newTodo);
    
    // Clear inputs
    titleInput.value = '';
    contentInput.value = '';
    
    // Hide form and refresh
    this.toggleAddForm();
    this.refreshTodoGrid();
};

TodoApp.prototype.deleteTodo = function(id) {
    if (confirm('Er du sikker på du vil slette denne opgave?')) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.refreshTodoGrid();
    }
};

TodoApp.prototype.toggleComplete = function(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        this.refreshTodoGrid();
    }
};

TodoApp.prototype.editTodo = function(id) {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) return;
    
    const newContent = prompt('Rediger indhold:', todo.content);
    if (newContent !== null) {
        todo.content = newContent.trim() || 'Navn';
        this.refreshTodoGrid();
    }
};

TodoApp.prototype.toggleAddForm = function() {
    const form = document.getElementById('addTodoForm');
    if (form) {
        form.classList.toggle('active');
        
        // Focus on first input when form opens
        if (form.classList.contains('active')) {
            setTimeout(() => {
                const titleInput = document.getElementById('todoTitle');
                if (titleInput) titleInput.focus();
            }, 100);
        }
    }
};

TodoApp.prototype.refreshTodoGrid = function() {
    const todoGrid = document.getElementById('todoGrid');
    if (todoGrid) {
        todoGrid.innerHTML = this.getTodosHTML();
    }
    
    // Also refresh settings screen if it shows todo count
    if (this.currentScreen === 'settings') {
        this.render();
        this.showScreen('settings');
    }
};

TodoApp.prototype.clearAllTodos = function() {
    if (confirm('Er du sikker på du vil slette ALLE opgaver? Dette kan ikke fortrydes.')) {
        this.todos = [];
        this.refreshTodoGrid();
    }
};

TodoApp.prototype.resetApp = function() {
    if (confirm('Dette vil nulstille appen og slette alle dine data. Fortsæt?')) {
        // Reset to default todos
        this.todos = [
            { id: 1, title: 'Dine kategorier', content: 'Navn', category: 'Opret Kategori', completed: false },
            { id: 2, title: 'Træning', content: 'Navn', category: 'Træning', completed: false },
            { id: 3, title: 'Guide', content: '', category: 'Guide', completed: false },
            { id: 4, title: 'Dine kategorier', content: 'Træning', category: 'Update front', completed: false },
            { id: 5, title: 'BEN', content: 'Navn', category: 'Træning', completed: false }
        ];
        
        // Reset theme
        this.isDarkMode = false;
        document.getElementById('phoneContainer').classList.remove('dark');
        document.body.classList.remove('dark');
        
        // Go back to start
        this.render();
        this.showScreen('start');
    }
};

// Utility functions
TodoApp.prototype.getCompletedCount = function() {
    return this.todos.filter(todo => todo.completed).length;
};

TodoApp.prototype.getTotalCount = function() {
    return this.todos.length;
};

TodoApp.prototype.getCategories = function() {
    const categories = [...new Set(this.todos.map(todo => todo.category))];
    return categories;
};

TodoApp.prototype.getTodosByCategory = function(category) {
    return this.todos.filter(todo => todo.category === category);
};

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (!window.app) return;
    
    // ESC key to close add form
    if (e.key === 'Escape') {
        const form = document.getElementById('addTodoForm');
        if (form && form.classList.contains('active')) {
            app.toggleAddForm();
        }
    }
    
    // Enter key to submit form
    if (e.key === 'Enter' && e.target.classList.contains('form-input')) {
        const form = document.getElementById('addTodoForm');
        if (form && form.classList.contains('active')) {
            app.addTodo();
        }
    }
    
    // Number keys for navigation (1-3)
    if (e.key >= '1' && e.key <= '3') {
        const screens = ['home', 'calendar', 'settings'];
        app.showScreen(screens[parseInt(e.key) - 1]);
    }
});

// Touch/swipe support for mobile
let startX, startY, distX, distY;

document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

document.addEventListener('touchend', function(e) {
    if (!startX || !startY) return;
    
    const touch = e.changedTouches[0];
    distX = touch.clientX - startX;
    distY = touch.clientY - startY;
    
    // Only handle horizontal swipes
    if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > 50) {
        if (!window.app) return;
        
        const screens = ['home', 'calendar', 'settings'];
        const currentIndex = screens.indexOf(app.currentScreen);
        
        if (distX > 0 && currentIndex > 0) {
            // Swipe right - go to previous screen
            app.showScreen(screens[currentIndex - 1]);
        } else if (distX < 0 && currentIndex < screens.length - 1) {
            // Swipe left - go to next screen
            app.showScreen(screens[currentIndex + 1]);
        }
    }
    
    startX = startY = null;
});

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.app = new TodoApp();
    console.log('To-Do App initialized successfully!');
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TodoApp;
}
