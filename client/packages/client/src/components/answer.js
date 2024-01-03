const Answer = ({ answer }) => {
  return (
    <li>
      <p>{answer.text}</p>
      <div>
        <strong>Upvotes:</strong> {answer.upvotes} <strong>Downvotes:</strong>{" "}
        {answer.downvotes}
      </div>
    </li>
  );
};

export default Answer;
