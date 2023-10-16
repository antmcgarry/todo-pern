interface ListHeaderProps {
  listName: string;
}

const onSignOut = () => {
  console.log("Sign out");
};

const ListHeader = ({ listName }: ListHeaderProps) => {
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div></div>
      <div className="button-container">
        <button className="btn btn-primary">Add New</button>
        <button className="btn btn-secondary" onClick={onSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ListHeader;
