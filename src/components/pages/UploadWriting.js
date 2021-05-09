import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { isLoggedIn } from '../../helper.js'


const apiURL = (process.env.NODE_ENV === 'production') ? 'https://cscloud7-201.lnu.se/api' : 'http://localhost:7003'

export default function UploadWriting() {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [active, setActive] = useState(true)

  const submitHandler = async (e) => {
    e.preventDefault()

    console.log('Text: ' + text)
    console.log('Title: ' + title)
    // console.log('Category: ' + category)
    console.log('Checked: ' + active)

    const writingObject = {
      title: title,
      text: text,
      active: active

    };

    try {
      const response = await axios.post(
        `${apiURL}/writings/create`,
        writingObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      )
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return isLoggedIn() ? (
    <div className="sm:container mx-auto px-4 pt-8 flex flex-col sm:flex-row justify-center">
      <div id="text-group" className="w-full mb-4 lg:max-w-2xl flex flex-col">
        <label for="textarea" className="text-4xl mb-4 text-center">Enter your text</label>
        <textarea
          id="textarea"
          onChange={(e) => setText(e.target.value)}
          className="rounded border-2 w-full h-96 focus:border-primary focus:ring-primary">
        </textarea>
      </div>

      <div id="menu" className="sm:ml-6 sm:pt-14 sm:mt-0 font-mono">

        <div id="title-group" className="block">
          <label htmlFor="categories" className="block">Title/Type</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="inline-block max-w-full border-2 rounded focus:border-primary focus:ring-primary" />
        </div>

        {/* <div id="select-menu" className="block mt-3">
            <label htmlFor="categories" className="block">Choose a category:</label>
            <select
              id="categories"
              onChange={(e) => setCategory(e.target.value)}
              className="block border-2 pl-5 pr-8 py-3 rounded-full focus:border-primary focus:ring-primary">
              <option value="general">General</option>
              <option value="personal-letter">Personal letter</option>
              <option value="cv">CV</option>
            </select>
          </div> */}

        <div id="checkbox-group" className="block space-x-2 mt-3">
          <span className="inline-block">Set test active</span>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="inline-block rounded text-primary focus:border-primary focus:ring-primary" />
        </div>

        <button onClick={submitHandler} className="block bg-primary text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 py-2 px-10 mt-6">Submit</button>

      </div>
    </div>

  ) : (
      <Redirect to="/" />
    )
}
