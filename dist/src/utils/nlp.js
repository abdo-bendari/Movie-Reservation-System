"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const natural_1 = __importDefault(require("natural"));
const processMessage = (message) => {
    const tokenizer = new natural_1.default.WordTokenizer();
    const tokens = tokenizer.tokenize(message.toLowerCase());
    if (tokens.includes("refund") || tokens.includes("money") || tokens.includes("payment")) {
        return "I see you have a query about refunds or payments. Let me connect you to an agent.";
    }
    else if (tokens.includes("help") || tokens.includes("support") || tokens.includes("assist")) {
        return "How can I assist you further? Please provide more details.";
    }
    else if (tokens.includes("cancel") || tokens.includes("booking") || tokens.includes("reservation")) {
        return "Are you trying to cancel or manage a reservation? Let me assist you with that.";
    }
    else if (tokens.includes("movie") || tokens.includes("show") || tokens.includes("schedule")) {
        return "Looking for movie schedules or show details? Please specify the movie or date.";
    }
    else if (tokens.includes("seat") || tokens.includes("availability") || tokens.includes("reserve")) {
        return "Are you inquiring about seat availability or reservations? Let me check that for you.";
    }
    else if (tokens.includes("account") || tokens.includes("profile") || tokens.includes("login")) {
        return "Is this related to your account or login issues? Let me assist you with that.";
    }
    else if (tokens.includes("thank") || tokens.includes("thanks")) {
        return "You're welcome! If you have more questions, feel free to ask.";
    }
    else if (tokens.includes("complain") || tokens.includes("issue") || tokens.includes("problem")) {
        return "I am sorry to hear you are having an issue. Please provide more details so we can resolve it.";
    }
    else if (tokens.includes("price") || tokens.includes("cost") || tokens.includes("discount")) {
        return "Are you asking about ticket prices or discounts? Let me provide you with the information.";
    }
    else if (tokens.includes("location") || tokens.includes("address") || tokens.includes("theater")) {
        return "Looking for theater locations or addresses? Please specify the theater name.";
    }
    return "Thank you for your message. Our team will get back to you shortly.";
};
exports.default = processMessage;
