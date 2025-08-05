import React, { useState } from "react";
import "../css/ContactPage.css";
import { Button, Card, Form, TextInput } from "../components/ui";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para enviar el mensaje al backend
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page grid cols-1">
      <h1>Contacto</h1>
      <p>
        Si deseas más información, contáctanos a través del correo:{" "}
        <a href="mailto:info@replasticos.com">info@replasticos.com</a> o llama
        al <a href="tel:+11234567890">(123) 456-7890</a>.
      </p>
      <Card className="contact-form-container">
        <h2>Envíanos un mensaje</h2>
        {success && (
          <p className="success-message">Mensaje enviado con éxito!</p>
        )}
        <Form onSubmit={handleSubmit} className="contact-form">
          <TextInput
            label="Nombre:"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Correo electrónico:"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <Button type="submit" className="submit-button">
            Enviar Mensaje
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ContactPage;
