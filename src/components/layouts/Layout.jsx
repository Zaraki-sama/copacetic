export default function Layout(props) {
  const { children } = props; //   props.children;

  return (
    <>
      <header>
        <h1 className="text-gradient">Copacetic</h1>
      </header>
      <main>{children}</main>

      <footer>
        <small>Created By</small>
        <a target="_blank" href="https://github.com/Zaraki-sama">
          <img
            alt="pfp"
            src="https://avatars.githubusercontent.com/u/112239063?v=4"
          />
          <p> @Zaraki-sama </p>
          <i className="fa-brands fa-github"></i>
        </a>
      </footer>
    </>
  );
}
