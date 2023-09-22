import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => (new Date(evtB.date) < new Date(evtA.date) ? -1 : 1) // inversee les evtA et evtB
  );
  /* setIndex((index + 1) % byDateDesc.length) */
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < 2 ? index + 1 : byDateDesc.length - 3),
      2500
    ); //
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* sortie le pagination container du map de slidecard */}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.date}
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // change idx pour index
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
