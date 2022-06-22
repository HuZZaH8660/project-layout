import Content from "./Content";

function Main(props) {
  return (
    <main className="content">
      <Content contentType={props.boolMusic} searchString={props.search} />
    </main>
  );
}

export default Main;
