// typing-animation의 경우는 babel을 요구함
// npm i --save-dev babel-runtime

import Typing from "react-typing-animation";

// 타이핑 라이브러리 관련 props
// speed
// delay
// backspace
// loop
// 스타일 커스텀
// 이벤트 핸들링 추가

const TypingExam = () => {
    return (
        // <Typing speed={100}>
        //     <h1>이게 무슨일이야?</h1>
        //     <Typing.Delay ms={2000} />
        //     <h1>두번째 내용</h1>

        //     <h1>GunchimSSak</h1>
        //     <Typing.Backspace count={5} />
        //     {/* backspace는 아래에 선언해야하는 특징 */}
        // </Typing>
        <Typing onFinishedTyping={() => console.log("Typing completed")} >
            <h1>Typing With CallBack</h1>
        </Typing>
    );
};

export default TypingExam;