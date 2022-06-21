function SmallCard(props) {
  return (
    <details className="small__card">
      <summary className="card__summary">{props.name}</summary>
      <ul className="card__list">
        <li>Количество слушателей: {props.listeners}</li>
        {props.url && (
          <a
            className="card__link"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Ссылка на Last FM</li>
          </a>
        )}
      </ul>
    </details>
  );
}

export default SmallCard;
