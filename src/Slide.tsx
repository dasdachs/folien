import React, {useEffect} from "react";

interface SlideProps {
  title: string;
  content: string;
}

export default ({title, content}: SlideProps): JSX.Element => {
  useEffect(() => {
    console.log(`Mounted ${title}`);

    return () => {
      console.log(`Unmounted ${title}`);
    };
  });
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
