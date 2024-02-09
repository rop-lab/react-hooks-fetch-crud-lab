// QuestionList.js

import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const handleDeleteQuestion = (id) => {
    // Send DELETE request to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If successful, update state to remove the deleted question
          setQuestions(questions.filter((question) => question.id !== id));
        } else {
          // Handle error if the delete request fails
          console.error("Failed to delete question:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion} // Pass the handleDeleteQuestion function as a prop
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
