import React, { useState } from "react";
import { Button, Form, TextInput } from "../ui";

const JoinUsForm = () => {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setData({ name: "", email: "", message: "" });
  };

  return (
    <Form onSubmit={handleSubmit} className="joinus-form">
      <TextInput
        label="Nombre:"
        id="join-name"
        name="name"
        type="text"
        value={data.name}
        onChange={handleChange}
        required
      />
      <TextInput
        label="Correo electrónico:"
        id="join-email"
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <div className="form-group">
        <label htmlFor="join-message">Mensaje:</label>
        <textarea
          id="join-message"
          name="message"
          rows="4"
          value={data.message}
          onChange={handleChange}
        ></textarea>
      </div>
      <Button type="submit">Enviar</Button>
      {sent && <p className="success-message">Gracias por tu interés!</p>}
    </Form>
  );
};

export default JoinUsForm;
