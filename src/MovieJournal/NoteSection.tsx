import React, { useState } from "react";
import { GenerateQuestionIcon } from "../icons/GenerateQuestionIcon";
import { useOpenAI } from "../hooks/useOpenAI";
import { Movie } from "../types";

interface NoteSectionProps {
  note: string;
  setNote: (val: string) => void;
  loading: boolean;
  movie: Movie;
}

const NoteSection: React.FC<NoteSectionProps> = ({
  note,
  setNote,
  loading,
  movie,
}) => {
  const [questions, setQuestions] = useState<string[] | null>(null);
  const { generateWithRetry, isGenerating } = useOpenAI();

  const handleGenerateQuestions = async () => {
    const { questions } = await generateWithRetry(
      movie,
      3,
      "zh-TW",
      "gpt-4o-mini-search-preview"
    );
    if (questions) {
      setQuestions(questions);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 370,
          margin: "0 auto",
          padding: "32px 16px 48px 16px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px #0001",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#222",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Write down your thoughts.
          <button
            onClick={handleGenerateQuestions}
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <GenerateQuestionIcon />
          </button>
        </div>
        <div
          style={{
            color: "#888",
            fontSize: 13,
            marginBottom: 12,
            textAlign: "center",
            width: "100%",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          Describe your feelings while watching the film, things or people you
          thought of, or anything you want to record.
        </div>
        {isGenerating && (
          <div style={{ width: "100%", color: "#FABD6F" }}>
            <div>Generating...</div>
          </div>
        )}
        {!isGenerating && questions && questions.length > 0 && (
          <div style={{ width: "100%" }}>
            <div
              style={{
                fontSize: 14,
                color: "#FABD6F",
                marginBottom: 12,
                borderRadius: 12,
                padding: 16,
                background: "#FFECD1",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 8,
              }}
            >
              Reflection
              {questions?.map((question) => (
                <div style={{ color: "black" }} key={question}>
                  {question}
                </div>
              ))}
            </div>
          </div>
        )}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            width: "100%",
            minHeight: 120,
            borderRadius: 12,
            border: "1.5px solid #eee",
            fontSize: 16,
            padding: 16,
            marginTop: 12,
            background: "#fafafa",
            color: "#333",
            resize: "none",
          }}
          placeholder="What do you feel about this movie?"
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default NoteSection;
