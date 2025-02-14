// react-typing-animation 패키지 설치
// npm config set legacy-peer-deps true
// npm i
// npm i --save react-typing-animation

import { useEffect, useState } from "react";
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
  const handleEndTyping = (id) => {
    // state를 활용하여 상태 업데이트를 진행
    // 메세지 관리 
    // id값을 기준으로 (id를 파라미터로 받아와)
    // --> message의 상태를 업데이트
    // --> 상태 업데이트에는 다음의 코드를 추가 
    // msg: 받아온 메세지에 대해 구분할 때 map함수를 이용해서 msg라는 단위로 나눔
    // msg.id === id ? {...msg, isTyping: false} : msg
    setMessages((prevMessagges) =>
      prevMessagges.map((msg) => (
        msg.id === id ? { ...msg, isTyping: false } : { ...msg }
      ))
    );

    // currentTypingId값을 초기화
    setCurrentTypingId(null);

    // alert(id);
  };

  // useEffect는 랜더링 후에 부작용을 확인하기 위해 쓰는 훅 --> 랜더링 후 side effect를 실행하는 훅
  // side effect : 랜더링 후 비동기로 처리할 부수적인 효과들 --> React식 콜백모음(모든 작업이 끝난 후 실행할 수 있는 콜백모음집)
  // 화면에 랜더링해줄거 다 해주고 실질적인 데이터는 비동기로 처리
  // 화면에 부를거 다 부르고 처리해야할거 같으면 추가해주면 됨
  // 필요한 이유 : 순차적 실행이 필요할 때 
  //                --> currentTypingId가 null일수도 있다
  //                --> 조건을 만족하는 메세지를 찾아서 다시 타이핑하도록 코드를 작성
  // 여기서는 이벤트 조정을 위해 사용했지만 useEffect는 실행순서 때문에 데이터 로딩이 안될 경우 
  useEffect(() => {
    // ai가 입력하는 것처럼 이벤트 만들거임
    // ai가 입력하는 이벤트는 모든 창에 적용인가?
    // --> user가 입력한 내용은 바로 렌더링하고 ai가 입력한 내용만 텍스트 효과를 부여

    // ai가 어떻게 입력했느냐 아니냐를 구분할까?
    if (currentTypingId === null) { // 현재 타이핑 중인 메세지가 있느냐 없는가를 확인
      // 어쨌든 user는 채팅을 입력할 것임
      // 입력한 채팅은 화면에 랜더링 되어야함
      // user와 ai의 채팅내용이 각자 따로따로 한번씩 불러와지는가? 
      // 같이 랜더링되기 때문에 
      // 우선 user / ai의 채팅 내용을 구분하고자 처리

      // 우선 user의 내용을 처리
      // messages 배열(상태)에는 입력한 내용들이 들어가 있을 것
      //  --> 단순히 방금 입력한 내용만 있는 것이 아니라 이전에 입력했던 내용들도 보관하고 있음
      const aiTypingMessage = messages.find((msg) => !msg.isUser && msg.isTyping);  // ai 메세지를 먼저 messages 배열에서 찾는다
      if (aiTypingMessage) {
        setCurrentTypingId(aiTypingMessage.id); // ai 메세지를 찾으면 현재타이핑하고 있는 id의 값을 ai 메세지의 id로 넣어준다
      };
    };
    // console.log("test");
  }, [messages, currentTypingId]);  // 종속성 배열 선언 ==> 중복 실행 방지


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

/* 타이핑 애니메이션의 적용은 AI에만 적용되야함 --> 구분을 하는 가장 편한 방법 : 데이터 비교 */
// 랜더링을 처리하는 컴포넌트 
const MessageList = ({ onShowMessages, onEndTyping, currentTypingId }) => {
  return (
    <>
      <div className="messages-list">
        {onShowMessages && onShowMessages.map((message, index) =>
          message.isTyping && message.id === currentTypingId ?
            (
              <Typing key={`typing-${message.id || index}`} speed={110} onFinishedTyping={() => onEndTyping(message.id)}>
                <div className={message.isUser ? "user-message" : "ai-message"}>
                  {message.text}
                </div>
              </Typing>
            ) : (
              <div key={`message-${message.id || index}`} className={message.isUser ? "user-message" : "ai-message"}>
                {message.text}
              </div>
            )
        )}
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
  };

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