import React from "react";

const SignupPage = () => {
  return (
    <div>
      <h2>Sign Up with Telegram</h2>
      <p>
        Click the link below to interact with the Telegram bot and get your
        verification code:
      </p>
      <a
        href="https://t.me/your_bot_name"
        target="_blank"
        rel="noopener noreferrer"
      >
        Start Verification on Telegram
      </a>
    </div>
  );
};

export default SignupPage;
