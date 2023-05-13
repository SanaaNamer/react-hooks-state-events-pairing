import {
  useState
} from "react";
import video from "../data/video.js";

function App() {
  const {
    title,
    embedUrl,
    views,
    createdAt,
    downvotes,
    upvotes,
    comments
  } =
  video;

  const [myComments, setComments] = useState(comments);
  const [input, setInput] = useState("");
  const [like, setLike] = useState(upvotes);
  const [disLike, setDisLike] = useState(downvotes);
  const [toggleComments, setToggle] = useState(true);

  const onLike = (commentId) => {
    const likedComments = myComments.map((item) => {
      if (commentId === item.id) {
        item.like++;
      }
      return item;
    });

    setComments(likedComments);
  };

  const onDelete = (commentId) => {
    const newData = myComments.filter((i) => i.id !== commentId);
    setComments(newData);
  };

  const dislikeComment = (commentId) => {
    const updated = myComments.map((item) => {
      if (commentId === item.id) {
        item.dislike++;
      }
      return item;
    });

    setComments(updated);
  };
  const onSearch = () => {
    if (input !== "") {
      const updated = myComments.filter((comment) =>
        comment.user.includes(input)
      );
      setComments(updated);
      // } else {
      //   setComments(comments);
    }
  };
  const onSort = () => {
    function compare(a, b) {
      if (a.user < b.user) {
        return -1;
      }
      if (a.user > b.user) {
        return 1;
      }
      return 0;
    }

    myComments.sort(compare);
    setComments(myComments);
  };

  return ( <
    div className = "App" >
    <
    iframe width = "719"
    height = "425"
    src = {
      embedUrl
    }
    frameborder = "0"
    allowfullscreen title = "Thinking in React" /
    >
    <
    h1 > {
      title
    } < /h1> <
    p > {
      `${views} Views | Uploaded at ${createdAt}`
    } < /p> <
    div >
    <
    button onClick = {
      () => setLike((perv) => perv + 1)
    } > {
      like + " "
    }👍 <
    /button>

    <
    button onClick = {
      () => setDisLike((perv) => perv + 1)
    } > {
      disLike + " "
    }👎 <
    /button> <
    /div>

    <
    button onClick = {
      () => setToggle(!toggleComments)
    }
    style = {
      {
        marginTop: "10px"
      }
    } > {
      !toggleComments ? "Show Comments" : "Hide Comments"
    } <
    /button> <
    hr / > {
      toggleComments && ( <
        div >
        <
        h1 > {
          myComments.length > 1 ?
          myComments.length + " Comments" :
            myComments.length + " Comment"
        } <
        /h1> <
        span >
        <
        input onChange = {
          (e) => {
            setInput(e.target.value);
            if (e.target.value === "") setComments(comments);
          }
        }
        /> <
        button onClick = {
          onSearch
        } > Search < /button> <
        button onClick = {
          onSort
        } > Sort < /button> <
        /span>

        {
          myComments &&
            myComments.map((comment, i) => ( <
              div key = {
                i
              } >
              <
              h4 > {
                comment.user
              } < /h4> <
              p > {
                comment.comment
              } <
              button onClick = {
                () => onLike(comment.id)
              } > {
                comment.like
              }👍 <
              /button> <
              button onClick = {
                () => dislikeComment(comment.id)
              } > {
                comment.dislike
              }👎 <
              /button> <
              button onClick = {
                () => onDelete(comment.id)
              } > ❌ < /button> <
              /p> <
              /div>
            ))
        } <
        /div>
      )
    } <
    /div>
  );
}

export default App;