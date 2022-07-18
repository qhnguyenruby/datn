import Header from "../Header";

export function withHeaderHOC(Component) {
  return function HeaderHOC() {
    return (
      <>
        <Header />
        <Component />
      </>
    );
  };
}
