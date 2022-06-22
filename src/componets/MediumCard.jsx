function MediumCard(props) {
  return (
    <details className="medium__card">
      <summary className="card__summary">{props.name}</summary>
      <ul className="card__list">
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

export default MediumCard;
