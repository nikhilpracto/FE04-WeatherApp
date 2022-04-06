import './SelectedWeatherCard.css';

const SelectedWeatherCard = (props) => {
    return (
        <div className="threeHourTemp">
            <div className="hourState">
                {/* {props.} */}
            </div>
            <div className="hourState">
                1 hour
            </div>
            <div className="hourState">
                1 hour
            </div>
            <div className="hourState">
                1 hour
            </div>
        </div>
    );
};

export default SelectedWeatherCard;