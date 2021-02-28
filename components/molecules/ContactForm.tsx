import { FC, useState } from 'react'

const ContactForm:FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted!')
  }

  return (
    <form
      name="Gofakeshop contact form"
      onSubmit={handleSubmit}
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name..."
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <small>Invalid name</small>
      </div>
      <div>
        <label htmlFor="email">
          E-mail
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email address..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <small>Invalid e-mail</small>
      </div>
      <div>
        <label htmlFor="text">
          Message
          <textarea
            name="text"
            id="text"
            placeholder="Enter your message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </label>
        <small>Invalid message</small>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ContactForm
