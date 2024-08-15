import { useState } from "react";
import MessageBoxComponent, {
  MessageBoxType,
} from "../core/modal/MessageBoxComponent";
import { addNewEmailSubscriber } from "../../services/emailSubscriber";

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBoxProps, setMessageBoxProps] = useState({
    type: "info" as MessageBoxType,
    title: "",
    message: "",
    onConfirm: () => setShowMessageBox(false),
    onCancel: () => setShowMessageBox(false),
    confirmText: "",
    cancelText: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageBoxProps({
      type: "question",
      title: "Confirm Subscription",
      message: "Are you sure you want to subscribe with this email?",
      onConfirm: () => {
        setShowMessageBox(false);
        subscribe();
      },
      onCancel: () => setShowMessageBox(false),
      confirmText: "Yes, I'm Ready",
      cancelText: "Maybe Later",
    });
    setShowMessageBox(true);
  };

  const subscribe = async () => {
    try {
      await addNewEmailSubscriber(email);
      setMessageBoxProps({
        type: "success",
        title: "Success!",
        message:
          "Subscription successful! Check your email for further instructions.",
        onConfirm: () => setShowMessageBox(false),
        onCancel: () => setShowMessageBox(false),
        confirmText: "OK",
        cancelText: "",
      });
    } catch (error: any) {
      setMessageBoxProps({
        type: "error",
        title: "Error!",
        message: error.message || "An error occurred. Please try again.",
        onConfirm: () => setShowMessageBox(false),
        onCancel: () => setShowMessageBox(false),
        confirmText: "OK",
        cancelText: "",
      });
    } finally {
      setShowMessageBox(true); // Ensure the message box is shown
    }
  };

  return (
    <>
      <section
        id="CallToAction"
        className="relative isolate overflow-hidden py-24 sm:py-32"
      >
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/images/calltoaction.png`}
          className="absolute inset-0 -z-10 opacity-5 h-full w-full object-cover object-left sm:object-left md:object-center"
        />
        <div className="absolute inset-0 bg-theme-darkBlue opacity-80 -z-10"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mx-auto max-w-[720px] lg:mx-0 overflow-hidden">
            <h1 className="text-5xl font-bold text-white">
              Get started with us today
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              We can help you create a digital solution to your business and
              advocacy needs. Sign up with us today to find out how.
            </p>
          </div>
          <form className="input input-lg" onSubmit={handleSubmit}>
            <input
              className="border-none focus:outline-none focus:ring-0"
              placeholder="Enter your work email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {showMessageBox && (
        <MessageBoxComponent
          type={messageBoxProps.type}
          title={messageBoxProps.title}
          message={messageBoxProps.message}
          onConfirm={messageBoxProps.onConfirm}
          onCancel={messageBoxProps.onCancel}
          confirmText={messageBoxProps.confirmText}
          cancelText={messageBoxProps.cancelText}
        />
      )}
    </>
  );
}