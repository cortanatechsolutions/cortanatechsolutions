import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { sendEmail } from "../../services/emailService";
import { EmailModel } from "../../models/EmailModel";
import { getToken } from "../../services/authService";
import ReCAPTCHA from "react-google-recaptcha";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
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

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    setCombinedError(""); // Clear errors on successful captcha completion
  };

  const resetForm = () => {
    setFullname("");
    setEmail("");
    setSubject("");
    setMessage("");
    setEmailError("");
    setCombinedError("");
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    let errorMessages = "";

    if (!captchaToken) {
      errorMessages += "Please complete the CAPTCHA. ";
    }

    if (errorMessages) {
      setCombinedError(errorMessages.trim());
      return;
    }

    setCombinedError("");
    setSending(true);

    const emailModel: EmailModel = {
      toEmail: "customers@cortanatechsolutions.com",
      fromEmail: "customers@cortanatechsolutions.com",
      subject: "You have received an inquiry from the website",
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
      isHtml: true, // Set to true if the message is HTML
      ccEmails: [],
      bccEmails: [],
      attachments: [],
    };

    try {
      const token = await getToken("faithful.coronel", "Password@1");
      localStorage.setItem("token", token);
      console.log("Token received:", token);

      await sendEmail(emailModel);
      console.log("Email sent successfully");
      resetForm();
      onClose();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000); // Hide toast after 3 seconds
    } catch (error) {
      console.log(error);
      setCombinedError("Failed to send email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="My Modal">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Hello there, We want to hear from you!
        </h1>
        <p className="py-5 text-gray-600">
          Do you want to find out more about our services or just say hello?
          Send us a message below. Let’s connect!
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            id="fullname"
            autoComplete="fullname"
            className="input"
            placeholder="Your Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            className={`input ${emailError ? "border-danger" : ""}`}
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            name="subject"
            id="subject"
            autoComplete="subject"
            className="input"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            className="textarea resize-none"
            placeholder="Message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>{" "}
          {combinedError ? (
            <p className="text-red-500 text-sm">{combinedError}</p>
          ) : (
            <p className="text-transparent text-sm">Placeholder</p>
          )}
          <ReCAPTCHA
            sitekey="6Le5giAqAAAAABIpaEOe1mk4UUQONZs-lunMavx9"
            onChange={handleCaptchaChange}
          />
          <button
            type="submit"
            disabled={sending}
            className="inline btn btn-primary text-center w-full"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </Modal>

      {showToast && (
        <div
          id="toast-simple"
          className="fixed bottom-4 right-4 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
          role="alert"
        >
          <svg
            className="w-5 h-5 text-theme-royalBlue dark:text-blue-500 rotate-45"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
            />
          </svg>
          <div className="ps-4 text-sm font-normal">
            Message sent successfully.
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;
