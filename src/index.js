import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Chat/App.js';
import ReactTyping from "./reactTyping.js";
import Review from "./useEffectReview.js";
import Exam from "./useEffectExam.js";
import Connection from "./Conn/App.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// root.render(<ReactTyping />);
// root.render(<Review />);
// root.render(<Exam />);
// root.render(
//     <React.StrictMode>
//         <Connection />
//     </React.StrictMode>
// );