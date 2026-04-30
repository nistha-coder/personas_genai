const API_BASE_URL = "http://localhost:5000";

const personas = {
  anshuman: {
    label: "Anshuman Singh",
    suggestions: [
      "How do I become industry-ready as an engineer?",
      "I feel stuck in DSA. What should I optimize first?",
      "How can peer learning improve my outcomes?"
    ]
  },
  abhimanyu: {
    label: "Abhimanyu Saxena",
    suggestions: [
      "How do I build real skills instead of just theory?",
      "What should I ship in my next 7 days?",
      "How can I create a strong portfolio quickly?"
    ]
  },
  kshitij: {
    label: "Kshitij Mishra",
    suggestions: [
      "I am weak in coding fundamentals. Where should I start?",
      "How do I stay consistent for long preparation?",
      "How can I avoid resource hopping and confusion?"
    ]
  }
};

let activePersona = "anshuman";

const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const typingIndicator = document.getElementById("typingIndicator");
const personaButtons = document.querySelectorAll(".persona-btn");
const activePersonaLabel = document.getElementById("activePersonaLabel");
const suggestionChips = document.getElementById("suggestionChips");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, type = "bot") {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function renderSuggestions() {
  const personaData = personas[activePersona];
  suggestionChips.innerHTML = "";

  personaData.suggestions.forEach((question) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = question;
    btn.addEventListener("click", () => {
      userInput.value = question;
      userInput.focus();
    });
    suggestionChips.appendChild(btn);
  });
}

function resetConversation() {
  chatBox.innerHTML = "";
  addMessage(`You are now chatting with ${personas[activePersona].label}. Ask your question.`);
}

function setActivePersona(personaKey) {
  activePersona = personaKey;
  activePersonaLabel.textContent = personas[personaKey].label;

  personaButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.persona === personaKey);
  });

  renderSuggestions();
  resetConversation();
}

personaButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setActivePersona(btn.dataset.persona);
  });
});

async function sendMessage(message) {
  addMessage(message, "user");
  typingIndicator.classList.remove("hidden");
  sendBtn.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        persona: activePersona
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.reply || "Request failed");
    }

    addMessage(data.reply, "bot");
  } catch (error) {
    addMessage(
      error.message || "Something went wrong. Please check if backend is running.",
      "error"
    );
  } finally {
    typingIndicator.classList.add("hidden");
    sendBtn.disabled = false;
  }
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  userInput.value = "";
  await sendMessage(message);
});

setActivePersona(activePersona);
