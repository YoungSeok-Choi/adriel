
interface ITooltip {
    time: Date;
}

const Tooltip = (props: ITooltip) => {
    const { time } = props;

    return <div>
        {time.toLocaleString()}
    </div>;
};

export default Tooltip;