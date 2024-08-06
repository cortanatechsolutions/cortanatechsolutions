import React, { useEffect } from "react";
import Modal from "./modal";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "../../hooks/useForm";
import Toast from "../../core/controls/Toast";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
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
    toastMessage,
    handleReCaptchaVerify,
    handleSubmit,
    setShowToast,
  } = useForm(onClose);

  useEffect(() => {
    if (!isOpen) {
      // Reset form values when modal is closed
      setFullname("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  }, [isOpen, setFullname, setEmail, setSubject, setMessage]);

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

        <form
          className="space-y-4"
          onSubmit={(e) => handleSubmit(e, executeRecaptcha)}
        >
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
            className={`input ${emailError ? "border-red-500" : ""}`}
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
          ></textarea>
          {combinedError && (
            <p className="text-red-500 text-sm">{combinedError}</p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="inline btn btn-primary text-center w-full"
            onClick={() => handleReCaptchaVerify(executeRecaptcha)}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </Modal>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default ModalForm;
