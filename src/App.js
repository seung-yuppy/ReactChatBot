// react-typing-animation 패키지 설치
// npm config set legacy-peer-deps true
// npm i
// npm i --save react-typing-animation

import { useState } from "react";
import "./App.css"
import Typing from "react-typing-animation";  // React Typing Animation 라이브러리 --> 타이핑 효과를 쉽게 구현할 수 있도록 제공되는 라이브러리


const App = () => {
  // useState : 클래스 컴포넌트 없이 상태와 다른 React 기능을 함수 컴포넌트에서 사용하기 위해 등장한 Hook
  //            --> 해당 컴포넌트까지만 살아있음
  // 현재 상태값은 messages와 currentTypingId가 보관을 할 것.
  // 만약 두 상태값에 대한 업데이트가 감지되면 -> setMessages, setCurrentTypingId메서드를 통해 상태값을 업데이트.

  // 모든 채팅 메세지를 저장
  const [messages, setMessages] = useState([]);

  // 현재 AI가 타이핑 하는 메세지 추적
  // null이 들어오는 이유는 AI가 처음 화면 실행됐을 때부터 타이핑 메세지를 추적할 이유는 없기 때문
  //  --> 타이핑 메세지가 입력됐을 때
  // AI가 답변할 영역을 추적하기 위해 준비한 state --> currentTypingId : 다음으로 타이핑이 필요한 메세지를 찾기위해 현재 타이핑 중인 메세지를 확인하는 상태 변수
  const [currentTypingId, setCurrentTypingId] = useState(null);

  // 파라미터 message는 MessageForm으로부터 전달 받아옴 --> 일반 유저가 입력한 문자열이다
  const handleSendMessage = (message) => {
    // 받아온 메세지의 상태를 업데이트(함수형 업데이트)
    // 함수형 업데이트를 반드시 써야하는가?
    // 1. 상태에 대한 action이 비동기적으로 처리될 수 있어서(데이터 처리가 비동기로 될 수 있기 때문)
    // 2. 함수가 실행되는 동안 최신화가 안될 수 있어서
    setMessages((prevMessages) => [
      ...prevMessages, // 이전 메세지의 기억 --> 스프레드 연산자를 사용하여 새로운 배열을 생성한 후 기존에 저장했던 메세지들을 담아둔다 --> React의 객체들이 기본적으로 불변성을 띄기 때문이다
      { text: message, isUser: true }, // 유저가 입력한 내용이 출력
      { text: `당신이 입력한 메세지는 : "${message}"`, isUser: false, isTyping: true, id: Date.now() }, // AI가 입력한 내용이 출력
    ]);
  };

  // AI 타이핑이 종료되었을 때 이 메서드를 실행
  const handleEndTyping = () => {

  };

  return (
    <>
      <div className="app">
        <div className="chat-box">
          <h1>Chat App</h1>
          {/* 
            컴포넌트 영역 MessageList, MessageForm 
            MessageList에서는 메세지의 목록을 조회
            MessageForm에서는 데이터 입력과 메세지 관리
          */}
          <MessageList onShowMessages={messages} onEndTyping={handleEndTyping} currentTypingId={currentTypingId} />
          <MessageForm onSendMessage={handleSendMessage} /> {/* onSendMessage는 새로운 메세지가 전송될 때 호출되는 props */}
        </div>
      </div>
    </>
  );
};

const MessageList = ({ onShowMessages, onEndTyping, currentTypingId }) => {
  return (
    <>
      <div className="messages-list">
        {onShowMessages && onShowMessages.map((onShowMessage, index) => (
          <div key={index} className={onShowMessage.isUser ? "user-message" : "ai-message"}>
            <Typing speed={100} onFinishedTyping={() => onEndTyping()}>
              <p>
                <b>{onShowMessage.isUser ? "User" : "AI"}</b>: {onShowMessage.text}
              </p>
            </Typing>
          </div>
        ))}
      </div>
    </>
  );
};

const MessageForm = ({ onSendMessage }) => {
  // MessageForm에서는 어차피 넘겨야할 데이터는 문자열
  //  --> 문자열 : 사용자가 입력한 값 자체를 의미
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  }

  return (
    <>
      <form className="message-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="채팅을 입력하세요~" className="message-input" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" className="send-button">Send</button>
      </form>
    </>
  );
};

export default App;