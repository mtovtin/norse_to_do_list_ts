function Task(props) {
  return (
    <div
      className={
        props.complete === true
          ? props.theme === true
            ? "complete_item"
            : "complete_itemW"
          : props.theme === true
          ? "incomplete_item"
          : "incomplete_itemW"
      }
    >
      {props.complete === true ? (
        <span>
          {" "}
          <span
            style={{
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
            }}
          >
            {" "}
            <button
              className="finishTaskButton"
              onClick={props.handleComplete}
            />{" "}
            <span className="text1">{props.value}</span>{" "}
          </span>
          <span>
            {" "}
            <button
              className={
                props.theme === true ? "deleteTaskButton" : "deleteTaskButtonW"
              }
              onClick={props.handleDelete}
            ></button>{" "}
          </span>{" "}
        </span>
      ) : (
        <span>
          <span>
            <button
              className="finishTaskButton"
              onClick={props.handleComplete}
            />
            <span className="text1">{props.value}</span>
          </span>
          <span>
            <button
              className={
                props.theme === true ? "deleteTaskButton" : "deleteTaskButtonW"
              }
              onClick={props.handleDelete}
            ></button>{" "}
          </span>
        </span>
      )}
    </div>
  );
}

export default Task;
