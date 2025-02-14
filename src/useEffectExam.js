import { useEffect, useState } from "react";

export default function Test() {
    const [count, setCount] = useState(0);

    // 이 경우는 모든 렌더링 후 실행되는 구조
    // 가볍고, 랜더링 후에 무조건 실행하고 싶다면 뭐든지
    // useEffect(() => {
    //     setCount((count) => count + 1);
    // });

    // 컴포넌트가 처음 랜더링 됐을 때만 실행
    // 데이터 한 번만 로딩하거나 컴포넌트 첫 로딩시에만 실행하고 싶을 때 활용
    // useEffect(() => {
    //     setCount((count) => count + 1);
    // }, []);

    // 첫 랜더링도 하고, cout 상태값이 변할 때만 실행
    // useEffect(() => {
    //     setCount((count) => count + 1);
    // });

    return (
        <>
            <h1>{count}</h1>
        </>
    );
}