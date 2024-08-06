import { useState, useCallback } from "react";
import { sendEmail } from "../services/emailService";
import { EmailModel } from "../models/EmailModel";
import { getToken } from "../api/authApi";

export const useForm = (onClose: () => void) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [combinedError, setCombinedError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetForm = () => {
    setFullname("");
    setEmail("");
    setSubject("");
    setMessage("");
    setEmailError("");
    setCombinedError("");
  };

  const handleReCaptchaVerify = useCallback(async (executeRecaptcha: any) => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("submit_form");
    setCaptchaToken(token);
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    executeRecaptcha: any
  ) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    let errorMessages = "";

    if (!captchaToken) {
      errorMessages += "Click again to complete the CAPTCHA validation. ";
    }

    if (errorMessages) {
      setCombinedError(errorMessages.trim());
      return;
    }

    setCombinedError("");
    setSending(true);

    const emailModel: EmailModel = {
      toEmail: process.env.REACT_APP_SUPPORT_EMAIL!,
      fromEmail: process.env.REACT_APP_SUPPORT_EMAIL!,
      subject: "You have received an inquiry from " + fullname,
      body: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #4CAF50;">New Inquiry from <i>cortanatechsolutions.com</i></h2>
      <p>You have received a new inquiry through the website. Below are the details:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f2f2f2;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${fullname}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr style="background-color: #f2f2f2;">
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Subject:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">Please respond to this inquiry promptly.</p>
      <p>Best regards,<br/>CortanaTech Solutions Team</p>
    </div>
  `,
      isHtml: true,
      ccEmails: [],
      bccEmails: [],
      attachments: [],
    };

    try {
      const token = await getToken(
        process.env.REACT_APP_AUTH_USERNAME!,
        process.env.REACT_APP_AUTH_PASSWORD!
      );

      if (!token) {
        throw new Error("Token is not defined.");
      }

      localStorage.setItem("token", token);
      console.log("Token received:", token);

      await sendEmail(emailModel);
      console.log("Email sent successfully");
      resetForm();
      onClose();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.log(error);
      setCombinedError("Failed to send email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return {
    fullname,
    setFullname,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    emailError,
    combinedError,
    sending,
    showToast,
    handleReCaptchaVerify,
    handleSubmit,
  };
};
