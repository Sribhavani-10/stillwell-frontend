
import { useState } from "react";
import "./Assessment.css";

type Option = {
  id: string;
  text: string;
};

type Question = {
  question: string;
  description: string;
  options: Option[];
};

const questions: Question[] = [
  {
    question: "How have you been feeling emotionally recently?",
    description: "Choose what feels closest to your experience.",
    options: [
      { id: "a", text: "I often feel emotionally overwhelmed." },
      { id: "b", text: "Certain situations affect me strongly." },
      { id: "c", text: "I experience difficult feelings sometimes." },
      { id: "d", text: "I have struggled before, but things have improved." }
    ]
  },
  {
    question: "When you feel overwhelmed, what do you usually notice?",
    description: "There is no right or wrong answer.",
    options: [
      { id: "a", text: "My thoughts become difficult to manage." },
      { id: "b", text: "I notice physical tension or discomfort." },
      { id: "c", text: "I prefer to withdraw from others." },
      { id: "d", text: "I find it difficult to identify what I feel." }
    ]
  },
  {
    question: "What helps you feel emotionally comfortable?",
    description: "Think about what feels supportive.",
    options: [
      { id: "a", text: "Spending quiet time alone." },
      { id: "b", text: "Talking to someone I trust." },
      { id: "c", text: "Doing something relaxing." },
      { id: "d", text: "I am still figuring that out." }
    ]
  },
  {
    question: "How comfortable are you expressing your feelings?",
    description: "Consider your experiences with others.",
    options: [
      { id: "a", text: "I express my feelings openly." },
      { id: "b", text: "I share them with selected people." },
      { id: "c", text: "I usually keep them to myself." },
      { id: "d", text: "It depends on the situation." }
    ]
  },
  {
    question: "How do difficult emotions affect your daily routine?",
    description: "Choose the closest description.",
    options: [
      { id: "a", text: "They sometimes make daily tasks difficult." },
      { id: "b", text: "They affect my concentration." },
      { id: "c", text: "They rarely affect my routine." },
      { id: "d", text: "Their impact changes from day to day." }
    ]
  },
  {
    question: "How supported do you feel by people around you?",
    description: "Think about the support available to you.",
    options: [
      { id: "a", text: "I feel understood and supported." },
      { id: "b", text: "I have a few people I can trust." },
      { id: "c", text: "I sometimes feel misunderstood." },
      { id: "d", text: "I am unsure who I can approach." }
    ]
  },
  {
    question: "When an unexpected situation occurs, how do you respond?",
    description: "Think about your usual reactions.",
    options: [
      { id: "a", text: "I can usually adapt." },
      { id: "b", text: "I need some time to settle." },
      { id: "c", text: "I sometimes feel overwhelmed." },
      { id: "d", text: "My response varies." }
    ]
  },
  {
    question: "How would you describe your relationship with yourself?",
    description: "Take your time with this reflection.",
    options: [
      { id: "a", text: "I generally feel comfortable with myself." },
      { id: "b", text: "I am learning to accept myself." },
      { id: "c", text: "I am often critical of myself." },
      { id: "d", text: "I find this difficult to describe." }
    ]
  },
  {
    question: "What would you most like to understand about your emotions?",
    description: "Choose what matters most right now.",
    options: [
      { id: "a", text: "Why certain situations affect me." },
      { id: "b", text: "How to manage overwhelming feelings." },
      { id: "c", text: "How to communicate my feelings." },
      { id: "d", text: "How to recognise my emotional needs." }
    ]
  },
  {
    question: "What would you like to gain from this journey?",
    description: "There is no pressure to choose a perfect answer.",
    options: [
      { id: "a", text: "A better understanding of myself." },
      { id: "b", text: "Healthy ways to manage my feelings." },
      { id: "c", text: "Confidence in expressing myself." },
      { id: "d", text: "A starting point for seeking support." }
    ]
  }
];

type SavedAnswer = {
  question: string;
  answer: string;
  skipped: boolean;
};

export default function Assessment({
  onBack
}: {
  onBack: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState<SavedAnswer[]>([]);
  const [completed, setCompleted] = useState(false);
  const [paused, setPaused] = useState(false);

  const question = questions[current];
  const progress = ((current + 1) / 10) * 100;

  function nextQuestion(skip = false) {
    const option = question.options.find(
      item => item.id === selected
    );

    if (!skip && !option) return;

    const newAnswers = [
      ...answers,
      {
        question: question.question,
        answer: option?.text || "",
        skipped: skip
      }
    ];

    setAnswers(newAnswers);
    setSelected("");

    if (current === 9) {
      setCompleted(true);
    } else {
      setCurrent(current + 1);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected("");
    setAnswers([]);
    setCompleted(false);
    setPaused(false);
  }

  if (paused) {
    return (
      <div className="assessment-page">
        <div className="assessment-card result-card">
          <div className="assessment-flower">♡</div>
          <h1>Your wellbeing comes first.</h1>
          <p>You can pause this reflection whenever you need.</p>
          <button className="assessment-primary" onClick={onBack}>
            Return to Dashboard
          </button>
          <button className="assessment-secondary" onClick={restart}>
            Start again
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="assessment-page">
        <div className="assessment-card result-card">
          <div className="assessment-flower">✿</div>
          <div className="assessment-tag">REFLECTION COMPLETED</div>
          <h1>Thank you for sharing.</h1>
          <p>
            You have completed all ten reflection questions.
            Your experiences matter, and your answers do not
            define who you are.
          </p>

          <div className="assessment-summary">
            <strong>Answered</strong>
            <span>{answers.filter(a => !a.skipped).length}</span>
            <strong>Skipped</strong>
            <span>{answers.filter(a => a.skipped).length}</span>
          </div>

          <p className="assessment-disclaimer">
            This is a self-reflection exercise, not a clinical
            assessment or diagnosis.
          </p>

          <button className="assessment-primary" onClick={onBack}>
            Return to Dashboard
          </button>
          <button className="assessment-secondary" onClick={restart}>
            Start a new reflection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-page">
      <nav className="assessment-topbar">
        <div className="logo">
          ✿ stillwell<span>.</span>
        </div>
        <button
          className="assessment-exit"
          onClick={() => setPaused(true)}
        >
          Pause / Exit
        </button>
      </nav>

      <main className="assessment-container">
        <div className="assessment-tag">
          YOUR REFLECTION JOURNEY
        </div>

        <div className="assessment-progress-info">
          <span>QUESTION {String(current + 1).padStart(2, "0")}</span>
          <span>{current + 1} OF 10</span>
        </div>

        <div
          className="assessment-progress"
          role="progressbar"
          aria-valuenow={current + 1}
          aria-valuemin={1}
          aria-valuemax={10}
        >
          <div style={{ width: `${progress}%` }} />
        </div>

        <section className="assessment-card">
          <div className="assessment-flower">❀</div>

          <h1>{question.question}</h1>
          <p className="assessment-description">
            {question.description}
          </p>

          <div className="assessment-options">
            {question.options.map(option => (
              <button
                key={option.id}
                type="button"
                className={
                  selected === option.id
                    ? "assessment-option selected"
                    : "assessment-option"
                }
                onClick={() => setSelected(option.id)}
                aria-pressed={selected === option.id}
              >
                <span className="option-letter">
                  {option.id.toUpperCase()}
                </span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>

          <button
            className="assessment-primary"
            onClick={() => nextQuestion()}
            disabled={!selected}
          >
            {current === 9 ? "Complete Reflection →" : "Continue →"}
          </button>

          <button
            className="assessment-secondary"
            onClick={() => nextQuestion(true)}
          >
            Skip this question
          </button>

          <p className="assessment-footer-note">
            Take your time. You can stop whenever you need.
          </p>
        </section>

        <p className="assessment-safety">
          If this reflection feels overwhelming, pause and
          consider reaching out to someone you trust.
        </p>
      </main>
    </div>
  );
}
