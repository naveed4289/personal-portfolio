const express = require("express");
require("dotenv").config();
const Contact = require("../models/contact-model");
const nodemailer = require("nodemailer");

const contactForm = async (req, res) => {
    try {
      const response = req.body; 
      console.log("Received form data:", response);
  
      // Save the contact form submission to the database
      await Contact.create(response);
      console.log("Data saved to the database");
  
      // Create a transporter object using Gmail's SMTP server
      let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
      });
  
      // Set up the email data
      let mailOptions = {
        from: response.email, 
        to: process.env.GMAIL_USER, 
        subject: "New Contact Form Submission",
        text: `You have received a new message from ${response.username} (${response.email}):\n\n${response.message}`,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
  
      // Respond with success
      return res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error in contact form processing:", error);
      return res.status(500).json({ message: "Message not delivered", error: error.message });
    }
  };


  const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedContact = await Contact.deleteOne({ _id: id });

        if (deletedContact.deletedCount === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }

        return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        next(error);
    }
};
const getAllContacts=async(req,res)=>{
  try {
      const contacts=await Contact.find();
      if(!contacts || contacts.length===0){
          res.status(404).json({message:"No contact Found"});
      }
      res.status(200).json(contacts);
  } catch (error) {
      next(error);
  }
}
module.exports = {contactForm,getAllContacts,deleteContactById}
