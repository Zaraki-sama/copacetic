export default function Welcome(props) {
  console.log(props);
  const { name, setName, handleCreateAccount } = props;

  return (
    <section id="welcome">
      <h3 className="text-large special-shadow">
        365 days.
        <br />
        365 words.
      </h3>
      <h6>
        Build your lexicon. <br />
        Start the Challenge today!
      </h6>
      <div>
        <input
          value={name}
          onChange={(evt) => {
            setName(evt.target.value);
          }}
          type="text"
          placeholder="Enter your name..."
        />
        <button disabled={!name} onClick={handleCreateAccount}>
          <h6>Start &rarr;</h6>
        </button>
      </div>
    </section>
  );
}
