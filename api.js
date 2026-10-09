
// ==========================================
//// SkillSwap - Frontend API Layer
// ==========================================

// Backend base URL
// Change this when Ganesh gives us the actual backend URL.
const API_BASE_URL = "http://localhost:8080/api";


// ==========================================
// Generic API Request Function
// ==========================================

async function apiRequest(endpoint, options = {}) {

    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    // Add JWT automatically when available
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
        API_BASE_URL + endpoint,
        {
            ...options,
            headers: headers
        }
    );

    if (!response.ok) {

        let errorMessage = `API Error: ${response.status}`;

        try {
            const errorData = await response.json();

           if (errorData.error) {
    errorMessage = errorData.error;
} else if (errorData.message) {
    errorMessage = errorData.message;
}
        } catch (error) {
            // Response may not contain JSON
        }

        throw new Error(errorMessage);
    }

    // Some APIs may return an empty response
    if (response.status === 204) {
        return null;
    }

    return await response.json();
}



// ==========================================
// Authentication
// ==========================================

async function loginUser(email, password) {

    return await apiRequest(
        "/auth/login",
        {
            method: "POST",

            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );
} 

 async function registerUser(name, email, password) {

    return await apiRequest(
        "/auth/register",
        {
            method: "POST",

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }
    );
} 


// ==========================================
// User / Profile
// ==========================================

async function getCurrentUser() {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        throw new Error("User ID not found. Please login again.");
    }

    return await apiRequest(
        `/users/${userId}`
    );
}


// ==========================================
// Skills
// ==========================================

async function getSkills() {

    return await apiRequest(
        "/skills"
    );
} 

async function getUserSkills(userId) {

    return await apiRequest(
        `/user-skills/user/${userId}`
    );
} 

async function addUserSkill(skillId, skillType) {

    return await apiRequest(
        `/user-skills?skillId=${skillId}&skillType=${skillType}`,
        {
            method: "POST"
        }
    );
}


// ==========================================
// Discover Users
// ==========================================

async function getUsers() {

    return await apiRequest(
        "/users"
    );
}


// ==========================================
// Skill Requests
// ==========================================

// ==========================================
// Skill Requests
// ==========================================

async function getSentRequests() {

    return await apiRequest(
        "/requests/sent"
    );
}

async function getReceivedRequests() {

    return await apiRequest(
        "/requests/received"
    );
}

async function sendSkillRequest(receiverId, skillId) {

    return await apiRequest(
        `/requests?receiverId=${receiverId}&skillId=${skillId}`,
        {
            method: "POST"
        }
    );
}

async function acceptSkillRequest(requestId) {

    return await apiRequest(
        `/requests/${requestId}/accept`,
        {
            method: "PUT"
        }
    );
}

async function rejectSkillRequest(requestId) {

    return await apiRequest(
        `/requests/${requestId}/reject`,
        {
            method: "PUT"
        }
    );
}

// ==========================================
// Notifications
// ==========================================

// ==========================================
// Notifications
// ==========================================

async function getNotifications() {

    return await apiRequest(
        "/notifications"
    );
}

async function getUnreadNotifications() {

    return await apiRequest(
        "/notifications/unread"
    );
}

async function markNotificationRead(notificationId) {

    return await apiRequest(
        `/notifications/${notificationId}/read`,
        {
            method: "PUT"
        }
    );
}

// ==========================================
// Demo Data
// ==========================================

const demoUsers = [
    {
        name: "Rahul Sharma",
        course: "CSE • 2nd Year",
        skills: ["Java", "Python", "DSA"],
        rating: 4.9,
        sessions: 18,
        online: true
    },

    {
        name: "Priya Patil",
        course: "IT • 2nd Year",
        skills: ["Web Development", "UI/UX"],
        rating: 4.8,
        sessions: 24,
        online: true
    },

    {
        name: "Aman Khan",
        course: "CSE • 3rd Year",
        skills: ["C / C++", "Java", "DSA"],
        rating: 4.7,
        sessions: 31,
        online: false
    },

    {
        name: "Sneha Joshi",
        course: "CSE • 3rd Year",
        skills: ["Python", "Data Science"],
        rating: 4.9,
        sessions: 27,
        online: true
    },

    {
        name: "Aditya Mehta",
        course: "CSE • 2nd Year",
        skills: ["Web Development", "Java"],
        rating: 4.6,
        sessions: 15,
        online: true
    },

    {
        name: "Neha Kulkarni",
        course: "AI & DS • 2nd Year",
        skills: ["UI/UX Design", "Python"],
        rating: 4.8,
        sessions: 21,
        online: false
    }
];


// ==========================================
// Demo API - Discover Users
// ==========================================

async function getDemoUsers() {
    return demoUsers;
} 




// ==========================================
// Chat
// ==========================================

async function getChats() {

    return await apiRequest(
        "/chats"
    );
}

async function createChat(user2Id) {

    return await apiRequest(
        `/chats?user2Id=${user2Id}`,
        {
            method: "POST"
        }
    );
}

async function getChatMessages(chatId) {

    return await apiRequest(
        `/chats/${chatId}/messages`
    );
}

async function sendChatMessage(chatId, content) {

    return await apiRequest(
        `/chats/${chatId}/messages?content=${encodeURIComponent(content)}`,
        {
            method: "POST"
        }
    );
} 




// ==========================================
// Sessions
// ==========================================

async function createSession(requestId, guestUserId, scheduledAt) {

    return await apiRequest(
        `/sessions?requestId=${requestId}&guestUserId=${guestUserId}&scheduledAt=${encodeURIComponent(scheduledAt)}`,
        {
            method: "POST"
        }
    );
}

async function getSessions() {

    return await apiRequest(
        "/sessions"
    );
}

async function updateSessionStatus(sessionId, status) {

    return await apiRequest(
        `/sessions/${sessionId}/status?status=${status}`,
        {
            method: "PUT"
        }
    );
} 




// ==========================================
// Reviews
// ==========================================

async function createReview(
    sessionId,
    reviewedUserId,
    rating,
    comment
) {

    return await apiRequest(
        `/reviews?sessionId=${sessionId}&reviewedUserId=${reviewedUserId}&rating=${rating}&comment=${encodeURIComponent(comment)}`,
        {
            method: "POST"
        }
    );
}

async function getUserReviews(userId) {

    return await apiRequest(
        `/reviews/user/${userId}`
    );
}

async function getReviewerReviews(userId) {

    return await apiRequest(
        `/reviews/reviewer/${userId}`
    );
}