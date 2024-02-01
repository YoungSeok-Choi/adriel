import Clock from './Clock';
import { CountryCode } from './ClockStore';


// Clock 컴포넌트들이 중앙 store를 통해서 변경되는 값을 observe 하고, 
// 컴포넌트에 종속되는 국가 코드를 받아, 자동으로 국가에 해당하는 시간으로 계산되어 표현되도록 구현
// 추후 시계 컴포넌트가 여러 국가에 대해서 표현해야할 요구사항이 생긴다면, 단순히 해당 국가에 해당하는 코드와 시차를 추가한 뒤
// 컴포넌트의 prop으로 넘기면 확장 가능 
const ClockWrapper = () => {
    return (
        <>
            <Clock countryCode={CountryCode.KO} />
            {/* <Clock countryCode={CountryCode.US} /> */}
            {/* ...etc */}
        </>
    );
};

export default ClockWrapper;