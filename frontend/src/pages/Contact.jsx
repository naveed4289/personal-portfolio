import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import Testimonials from "./Testimonials";

function Contact() {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [contactInfo, setContactInfo] = useState({
        email: "",
        phone: "",
    });

    const { user } = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/form/contact", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                setContact({
                    username: "",
                    email: "",
                    message: ""
                });

                const responseData = await response.json();
                toast.success("Message sent successfully!", { autoClose: 2000 });
                console.log(responseData);
            } else {
                console.error("API Error:", response.status, response.statusText);
                toast.error("Failed to send message. Please try again.", { autoClose: 2000 });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.", { autoClose: 2000 });
        }
    };

    const userDatas = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/get/userData', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched user data:", data); // Log the fetched data
                // Assuming response is an array, extract the first user
                if (data.response && data.response.length > 0) {
                    const userData = data.response[0]; // Get the first user
                    setContactInfo({
                        email: userData.email,
                        phone: userData.phone,
                    });
                } else {
                    console.error("No user data found");
                }
            } else {
                console.error('Failed to fetch user data:', response.status);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    

    useEffect(() => {
        userDatas(); // Fetch user data when the component mounts
        if (user && user.email) {
            setContact((prevContact) => ({
                ...prevContact,
                email: user.email, // Optionally set email from auth context
            }));
        } 
    }, [user]);

    return (
        <div>
            
        <div className="contact-container">
            <div className="chat-section">
                <h2 className="chat-title">Let’s Chat</h2>
                <p className="project-description">Tell us about your project</p>
                <p className="collaboration-description">Let’s create something together!</p>
                <div className="contact-info">
                    <FaEnvelope className="contact-icon" />
                    <span className="email-address">{contactInfo.email || "Loading..."}</span> {/* Use fetched email */}
                </div>
                <div className="contact-info">
                    <FaPhone className="contact-icon" />
                    <span className="phone-number">{contactInfo.phone}</span> {/* Use fetched phone */}
                </div>
            </div>
            <div className="form-section">
                <h2 className='text-2xl text-center font-bold mb-3'>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name"
                        name="username"
                        id="username"
                        autoComplete="off"
                        value={contact.username || ""}
                        onChange={handleInput}
                        className="input-field" required />
                    <input 
                        type="email" 
                        placeholder="Email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        value={contact.email || ""} 
                        onChange={handleInput} className="input-field" required />
                    <textarea
                        placeholder="Message" rows="4" 
                        name="message"
                        id="message"
                        autoComplete="off"
                        value={contact.message || ""} 
                        onChange={handleInput} className="input-field" required></textarea>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
        <div>
                <Testimonials/>
            </div>
        </div>
    );
}

export default Contact;
