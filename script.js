// ============================================
// COOKIES & NOTIFICATIONS
// ============================================

// Initialize cookies notification
function initCookies() {
    const cookieNotification = document.getElementById('cookieNotification');
    const acceptBtn = document.getElementById('acceptCookies');
    
    // Check if user has accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        cookieNotification.classList.add('show');
    }
    
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        localStorage.setItem('cookieDate', new Date().toISOString());
        cookieNotification.classList.remove('show');
    });
}

// ============================================
// HAMBURGER MENU
// ============================================

function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    
    if (!hamburger) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header')) {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        }
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (!scrollBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// HEADER BACKGROUND CHANGE ON SCROLL
// ============================================

function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// LOGIN/REGISTER FORM VALIDATION
// ============================================

function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const toggleText = document.getElementById('toggleText');
    
    if (!toggleFormBtn) return;
    
    let isLoginMode = true;
    
    // Toggle between login and register
    toggleFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        
        if (isLoginMode) {
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            toggleText.innerHTML = "Don't have an account? <button type=\"button\" class=\"toggle-btn\" id=\"toggleFormBtn\">Sign up</button>";
            document.getElementById('toggleFormBtn').addEventListener('click', arguments.callee);
        } else {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            toggleText.innerHTML = "Already have an account? <button type=\"button\" class=\"toggle-btn\" id=\"toggleFormBtn\">Sign in</button>";
            document.getElementById('toggleFormBtn').addEventListener('click', arguments.callee);
        }
    });
    
    // Show/Hide password for login
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const loginPassword = document.getElementById('loginPassword');
    
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', (e) => {
            e.preventDefault();
            const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPassword.setAttribute('type', type);
            toggleLoginPassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Show/Hide password for register
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    const registerPassword = document.getElementById('registerPassword');
    
    if (toggleRegisterPassword) {
        toggleRegisterPassword.addEventListener('click', (e) => {
            e.preventDefault();
            const type = registerPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            registerPassword.setAttribute('type', type);
            toggleRegisterPassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Show/Hide password for confirm
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPassword = document.getElementById('registerConfirm');
    
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', (e) => {
            e.preventDefault();
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            toggleConfirmPassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear previous errors
            document.getElementById('loginEmailError').textContent = '';
            document.getElementById('loginPasswordError').textContent = '';
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            let isValid = true;
            
            // Validate email
            if (!email) {
                document.getElementById('loginEmailError').textContent = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('loginEmailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                document.getElementById('loginPasswordError').textContent = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters';
                isValid = false;
            }
            
            if (isValid) {
                // Save user data to localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    loginTime: new Date().toISOString(),
                    rememberMe: document.getElementById('rememberMe').checked
                }));
                
                showMessage('loginMessage', 'Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirm = document.getElementById('registerConfirm').value;
            const agree = document.getElementById('agreeTerms').checked;
            let isValid = true;
            
            // Validate name
            if (!name) {
                document.getElementById('registerNameError').textContent = 'Name is required';
                isValid = false;
            } else if (name.length < 3) {
                document.getElementById('registerNameError').textContent = 'Name must be at least 3 characters';
                isValid = false;
            }
            
            // Validate email
            if (!email) {
                document.getElementById('registerEmailError').textContent = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('registerEmailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                document.getElementById('registerPasswordError').textContent = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('registerPasswordError').textContent = 'Password must be at least 6 characters';
                isValid = false;
            }
            
            // Validate confirm password
            if (!confirm) {
                document.getElementById('registerConfirmError').textContent = 'Please confirm your password';
                isValid = false;
            } else if (password !== confirm) {
                document.getElementById('registerConfirmError').textContent = 'Passwords do not match';
                isValid = false;
            }
            
            // Validate terms
            if (!agree) {
                document.getElementById('termsError').textContent = 'You must agree to the terms';
                isValid = false;
            }
            
            if (isValid) {
                // Save user data to localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                users.push({
                    name: name,
                    email: email,
                    password: password, // In real app, never store plain passwords
                    registeredDate: new Date().toISOString()
                });
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify({
                    name: name,
                    email: email
                }));
                
                showMessage('registerMessage', 'Account created successfully! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';
        
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        let isValid = true;
        
        // Validate name
        if (!name) {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        // Validate message
        if (!message) {
            document.getElementById('messageError').textContent = 'Message is required';
            isValid = false;
        } else if (message.length < 10) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (isValid) {
            // Save message to localStorage
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({
                name: name,
                email: email,
                message: message,
                dateTime: new Date().toISOString()
            });
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            
            showMessage('formMessage', 'Message sent successfully! We will contact you soon.', 'success');
            contactForm.reset();
            
            setTimeout(() => {
                document.getElementById('formMessage').textContent = '';
            }, 5000);
        }
    });
}

// ============================================
// TO-DO LIST (LEARNING GOALS)
// ============================================

function initTodoList() {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    
    if (!todoInput) return;
    
    // Load todos from localStorage
    loadTodos();
    
    // Add todo on button click
    addTodoBtn.addEventListener('click', addTodo);
    
    // Add todo on Enter key
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    function addTodo() {
        const text = todoInput.value.trim();
        
        if (!text) {
            alert('Please enter a learning goal');
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            dateAdded: new Date().toISOString()
        };
        
        // Save to localStorage
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        
        // Add to DOM
        createTodoElement(todo);
        todoInput.value = '';
        todoInput.focus();
    }
    
    function createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo.id;
        
        if (todo.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="todo-delete" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        // Toggle completed
        const checkbox = li.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            updateTodo(todo.id, !todo.completed);
        });
        
        // Delete todo
        const deleteBtn = li.querySelector('.todo-delete');
        deleteBtn.addEventListener('click', () => {
            deleteTodo(todo.id);
            li.remove();
        });
        
        todoList.appendChild(li);
    }
    
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.forEach(todo => createTodoElement(todo));
    }
    
    function updateTodo(id, completed) {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = completed;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
    
    function deleteTodo(id) {
        let todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos = todos.filter(t => t.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

// ============================================
// FETCH BLOG DATA FROM API
// ============================================

async function initBlogSection() {
    const blogContainer = document.getElementById('blogContainer');
    
    if (!blogContainer) return;
    
    try {
        // Fetch posts from JSONPlaceholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
        
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }
        
        const posts = await response.json();
        
        // Fetch user info for author details
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersResponse.json();
        
        blogContainer.innerHTML = '';
        
        posts.forEach((post, index) => {
            const author = users[index % users.length];
            const article = document.createElement('article');
            article.className = 'blog-card';
            article.innerHTML = `
                <div class="blog-header">
                    <h3>${escapeHtml(post.title)}</h3>
                    <span class="blog-date">${new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
                <p class="blog-excerpt">${escapeHtml(post.body.substring(0, 120))}...</p>
                <div class="blog-footer">
                    <span class="blog-author">By ${escapeHtml(author.name)}</span>
                    <button class="blog-read-more" onclick="alert('Full article: ' + '${escapeHtml(post.title)}')">Read More</button>
                </div>
            `;
            blogContainer.appendChild(article);
        });
        
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        blogContainer.innerHTML = '<p class="error">Unable to load articles. Please try again later.</p>';
    }
}

// ============================================
// SECTION ANIMATIONS (SCROLL INTO VIEW)
// ============================================

function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = 'form-message ' + type;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// INITIALIZE ALL ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCookies();
    initHamburger();
    initScrollToTop();
    initHeaderScroll();
    initAuthForms();
    initContactForm();
    initTodoList();
    initBlogSection();
    initSectionAnimations();
});
