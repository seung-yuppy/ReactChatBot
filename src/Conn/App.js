import { useEffect } from "react";
import { createConnection } from "./Chat";

// 예를들어 다른페이지가 있다 가정하고
// 사용자가 다른페이지로 이동했을 경우를 생각
// OpenChatRoom 컴포넌트는 unmount가 되고 그 다른 페이지를 띄우는 컴포넌트가 로딩
// 만약 사용자가 그 페이지에서 뒤로가기를 누른다면 --> 다시 OpenChatRoom 컴포넌트가 마운트
// 문제는 사실 연결 자체는 제거되지 않았다라는 점(두번째 연결 설정)
// 이런 문제점을 빠르게 발견할 수 있도록 처음 마운트가 된 후에 모든 컴포넌들을 한번씩 더 로딩(마운트)하는 것이 리액트의 습성

// 그렇다면 두 번 실행 자체를 아예 방어하는 것은 strict 추가 삭제만 있는가?
//  --> 한 번만 실행에 초점을 두는 것이 아니라 내가 설정한 effect를 리마운트 이후에도 정상적으로 동작하는가를 확인
//  --> 종속성 배열을 통한 제어, 그게 아니라면 next.js 등 프레임워크의 힘을 빌리는 법
//  --> React Query, Router를 활용

// Effect가 확실히 필요한가 아닌가를 구분하는 법
// Effect와 라이프사이클
// Event / Effect 분리법
// Effect 종속성 제거
// 커스텀 훅
export default function OpenChatRoom() {

    useEffect(() => {
        const connection = createConnection();
        connection.connect();

        // 아래와 같은 함수를 정리함수(cleanUpFunction) --> 수행한 작업 중단 or RollBack
        return () => connection.disconnect();
    }, []); // 종속성 배열을 추가한 이유?

    const getOut = () => {
        const connection = createConnection();
        connection.disconnect();
    };

    return (
        <>
            <h1>채팅방에 오신 것을 환영합니다.</h1>
            <button onClick={getOut}>나가기</button>
        </>
    );
}