function BigCard(props) {
  return (
    <details className="big__card">
      <summary className="card__summary">{props.name}</summary>
      <ul className="card__list">
        {props.artist && (
          <a
            className="card__link"
            href={props.artisturl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>{props.artist}</li>
          </a>
        )}
        <li>Количество прослушиваний: {props.playcount}</li>
        <li>Количество слушателей: {props.listeners}</li>
        {
          <a
            className="card__link"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Ссылка на Last FM</li>
          </a>
        }
      </ul>
    </details>
  );
}

export default BigCard;
