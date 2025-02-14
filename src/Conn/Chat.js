// useEffect
// 사용자에게 내용을 표시하는동안 연결을 유지해야한다면?
// createConnection이라는 API를 사용하면됨

// 이거 개량하면 우리가 흔히 알고있는 API화도 가능함

// 그런데 우리는 처음 이 컴포넌트가 로딩되고 나면 connect가 2회 호출되는 것을 확인할 수 있음
// 그리하여 chat.js에 있는 connect 메서드가 2번 호출(컴포넌트가 2회 마운트)
// 언마운트시 어떻게 처리되느냐 차이
export function createConnection() {
    return {
        connect() {
            console.log("연결 완료");
        },
        disconnect() {
            console.log("연결 해제");
        },
    }
}