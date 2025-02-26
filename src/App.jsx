import { useState } from "react";

export default function BookReviewApp() {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [sentiment, setSentiment] = useState("Sentiment: Neutral");
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(null);

  const positiveWords = ["amazing", "great", "loved", "fantastic", "excellent", "best"];
  const negativeWords = ["bad", "worst", "boring", "terrible", "disappointed", "poor"];

  const rateBook = (stars) => {
    setSelectedRating(stars);
  };

  const analyzeSentiment = (text) => {
    setReviewText(text);
    let lowerCaseText = text.toLowerCase();
    let sentimentText = "Sentiment: Neutral";
    if (positiveWords.some(word => lowerCaseText.includes(word))) {
      sentimentText = "Sentiment: Positive 😊";
    } else if (negativeWords.some(word => lowerCaseText.includes(word))) {
      sentimentText = "Sentiment: Negative 😢";
    }
    setSentiment(sentimentText);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const submitReview = () => {
    if (selectedRating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
    if (reviewText.trim() === "") {
      alert("Please write a review before submitting.");
      return;
    }
    setSubmitted(true);
  };

  const restartReview = () => {
    setSelectedRating(0);
    setReviewText("");
    setSentiment("Sentiment: Neutral");
    setSubmitted(false);
    setImage(null);
  };

  return (
    <div className="app">
      {!submitted ? (
        <>
          <h1>📖 AI-Powered Book Reviews</h1>
          <h2>The Great Gatsby</h2>
          <p>by F. Scott Fitzgerald</p>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= selectedRating ? "active" : ""}
                onClick={() => rateBook(star)}
              >
                ★
              </span>
            ))}
          </div>
          <p>Rating: {selectedRating ? `${selectedRating} Stars` : "Not Rated"}</p>

          <textarea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => analyzeSentiment(e.target.value)}
          />
          <p className="sentiment">{sentiment}</p>

          <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
          {image && <img src={image} alt="Uploaded" className="preview-image" />}

          <button onClick={submitReview} className="submit-btn">
            Submit Review
          </button>
        </>
      ) : (
        <>
          <h1>🎉 Thank You for Your Review!</h1>
          <p>We appreciate your feedback.</p>
          {image && <img src={image} alt="Uploaded Screenshot" className="preview-image" />}
          <button onClick={restartReview} className="restart-btn">
            Back to Home
          </button>
        </>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html {
          width: 100%;
          height: 100%;
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: white;
        }

        .stars span {
          font-size: 40px;
          cursor: pointer;
          color: lightgray;
          transition: color 0.2s ease-in-out;
        }

        .stars span.active {
          color: gold;
        }

        textarea {
          width: 50%;
          height: 100px;
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 5px;
          margin-top: 10px;
          transition: all 0.3s;
          font-size: 18px;
        }

        textarea:focus {
          border-color: #ff4e50;
          outline: none;
          box-shadow: 0 0 8px rgba(255, 78, 80, 0.5);
        }

        .sentiment {
          font-weight: bold;
          margin-top: 10px;
          font-size: 20px;
        }

        .file-input {
          display: block;
          margin: 10px auto;
          padding: 8px;
          border: 2px solid #ff4e50;
          border-radius: 5px;
          cursor: pointer;
          font-size: 18px;
        }

        .preview-image {
          width: 50%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 5px;
          margin-top: 10px;
        }

        button {
          width: 20%;
          padding: 12px;
          font-size: 18px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
          background: #ff4e50;
          color: white;
          transition: all 0.3s;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}
