// Remove all authentication code and keep only the essential functionality
// This file can be removed if no other functionality is needed 

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements
const authModal = document.getElementById('authModal');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const closeModal = document.querySelector('.close-modal');
const authForm = document.getElementById('authForm');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authSwitchBtn = document.getElementById('authSwitchBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

let isSignIn = true;

// Event Listeners
signInBtn.addEventListener('click', () => {
    isSignIn = true;
    showAuthModal();
});

signUpBtn.addEventListener('click', () => {
    isSignIn = false;
    showAuthModal();
});

closeModal.addEventListener('click', hideAuthModal);
authSwitchBtn.addEventListener('click', toggleAuthMode);
authForm.addEventListener('submit', handleAuthSubmit);

// Functions
function showAuthModal() {
    authModal.style.display = 'block';
    updateAuthForm();
}

function hideAuthModal() {
    authModal.style.display = 'none';
    clearMessages();
    authForm.reset();
}

function toggleAuthMode() {
    isSignIn = !isSignIn;
    updateAuthForm();
}

function updateAuthForm() {
    const title = document.getElementById('authTitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const switchText = document.getElementById('authSwitchText');
    const switchBtn = document.getElementById('authSwitchBtn');

    if (isSignIn) {
        title.textContent = 'Sign In';
        submitBtn.textContent = 'Sign In';
        switchText.textContent = "Don't have an account?";
        switchBtn.textContent = 'Sign Up';
    } else {
        title.textContent = 'Sign Up';
        submitBtn.textContent = 'Sign Up';
        switchText.textContent = 'Already have an account?';
        switchBtn.textContent = 'Sign In';
    }
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    clearMessages();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        setLoading(true);
        
        if (isSignIn) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            handleSuccessfulAuth(data.user);
        } else {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });
            
            if (error) throw error;
            showSuccessMessage('Account created successfully! Please check your email to verify your account.');
            setTimeout(hideAuthModal, 2000);
        }
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        setLoading(false);
    }
}

function handleSuccessfulAuth(user) {
    updateUIForAuthenticatedUser(user);
    hideAuthModal();
}

function updateUIForAuthenticatedUser(user) {
    const navAuth = document.querySelector('.nav-auth');
    navAuth.innerHTML = `
        <div class="user-profile">
            <img src="${user.user_metadata.avatar_url || 'default-avatar.png'}" alt="Profile" class="profile-img">
            <span class="user-name">${user.email}</span>
            <button id="signOutBtn" class="sign-out-btn">Sign Out</button>
        </div>
    `;

    document.getElementById('signOutBtn').addEventListener('click', handleSignOut);
}

async function handleSignOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        updateUIForUnauthenticatedUser();
    } catch (error) {
        showErrorMessage('Error signing out: ' + error.message);
    }
}

function updateUIForUnauthenticatedUser() {
    const navAuth = document.querySelector('.nav-auth');
    navAuth.innerHTML = `
        <button id="signInBtn" class="auth-btn sign-in-btn">Sign In</button>
        <button id="signUpBtn" class="auth-btn sign-up-btn">Sign Up</button>
    `;

    document.getElementById('signInBtn').addEventListener('click', () => {
        isSignIn = true;
        showAuthModal();
    });

    document.getElementById('signUpBtn').addEventListener('click', () => {
        isSignIn = false;
        showAuthModal();
    });
}

function setLoading(isLoading) {
    if (isLoading) {
        authSubmitBtn.classList.add('loading');
        authSubmitBtn.disabled = true;
    } else {
        authSubmitBtn.classList.remove('loading');
        authSubmitBtn.disabled = false;
    }
}

function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function showSuccessMessage(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
}

function clearMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Check initial auth state
supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
        updateUIForAuthenticatedUser(session.user);
    } else {
        updateUIForUnauthenticatedUser();
    }
});

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        updateUIForAuthenticatedUser(session.user);
    } else if (event === 'SIGNED_OUT') {
        updateUIForUnauthenticatedUser();
    }
});

// Tweet Engagement Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all reply buttons
    const replyButtons = document.querySelectorAll('.engagement-action.reply');
    
    // Add click event to each reply button
    replyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent default action
            e.preventDefault();
            
            // Get the tweet element
            const tweet = button.closest('.tweet');
            
            // Get tweet content
            const tweetContent = tweet.querySelector('.tweet-text').textContent;
            const tweetUsername = tweet.querySelector('.tweet-username').textContent;
            
            // Create reply modal
            createReplyModal(tweetUsername, tweetContent);
        });
    });
});

function createReplyModal(username, tweetContent) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'reply-modal';
    modal.innerHTML = `
        <div class="reply-modal-content">
            <span class="close-modal">&times;</span>
            <div class="reply-header">
                <h3>Reply to ${username}</h3>
                <div class="original-tweet">
                    <p>${tweetContent}</p>
                </div>
            </div>
            <form id="replyForm">
                <div class="form-group">
                    <textarea id="replyText" placeholder="Write your reply..." required></textarea>
                </div>
                <button type="submit" class="reply-submit-btn">Reply</button>
            </form>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Show modal
    modal.style.display = 'block';
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    const replyForm = modal.querySelector('#replyForm');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    replyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const replyText = document.getElementById('replyText').value;
        
        // Here you would typically send the reply to your backend
        console.log('Replying to tweet:', {
            username,
            originalContent: tweetContent,
            reply: replyText
        });
        
        // Close modal after submission
        modal.remove();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Function to get random profile image
function getRandomProfileImage() {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${randomNumber}.jpg`;
}

// Function to update all profile images
function updateProfileImages() {
    const profileImages = document.querySelectorAll('.tweet-profile-pic');
    profileImages.forEach(img => {
        img.src = getRandomProfileImage();
    });
}

// Mutation Observer to detect changes in the tweet feed
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            updateProfileImages();
        }
    });
});

// Start observing the tweet feed
const tweetFeed = document.querySelector('.tweet-feed');
if (tweetFeed) {
    observer.observe(tweetFeed, {
        childList: true,
        subtree: true
    });
}

// Initial update of profile images
updateProfileImages(); 