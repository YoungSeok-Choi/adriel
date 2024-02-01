import { useMemo, useState } from 'react';
import "./Clock.css";
import ClockStore, { CountryCode, Point } from './ClockStore';
import Tooltip from './tooltip/Tooltip';

interface IClock {
    countryCode: CountryCode;
}

const Clock = ({ countryCode }: IClock) => {

    const { time, calcTime } = ClockStore.use();
    const [isHover, setIsHover] = useState<boolean>(false);
    const [mousePoint, setMousePoint] = useState<Point>({ x: 0, y: 0 });

    const timeObj = useMemo(() => {
        const newTime = calcTime(countryCode);
        const seconds = newTime.getSeconds() / 60;
        const minutes = (seconds + newTime.getMinutes()) / 60;
        const hours = (minutes + newTime.getHours()) / 12;

        return { hours, minutes, seconds };

    }, [time, countryCode]);


    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        mousePoint.x = event.clientX;
        mousePoint.y = event.clientY - 30;
        setMousePoint({ ...mousePoint });

        if (!isHover) {
            setIsHover(true);
        }
    };


    return (
        <div className="clock" onMouseMove={handleMouseMove} onMouseLeave={() => setIsHover(false)}>
            <div className="hand hour" style={{ transform: `rotate(${timeObj.hours * 360}deg)` }} />
            <div className="hand minute" style={{ transform: `rotate(${timeObj.minutes * 360}deg)` }} />
            <div className="hand second" style={{ transform: `rotate(${timeObj.seconds * 360}deg)` }} />
            {isHover && <div className='tooltip' style={{ left: mousePoint.x, top: mousePoint.y }} >
                <Tooltip time={calcTime(countryCode)} />
            </div>}
        </div>
    );
};

export default Clock;