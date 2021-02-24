import React, { FC } from "react";
import { Article as ArticleType } from "types";
import "./styles.scss";
import moment from "moment";

export interface ArticleProps {
  article: ArticleType;
}

export const Article: FC<ArticleProps> = ({ article }: ArticleProps) => {
  const { webUrl, webTitle, fields, webPublicationDate } = article;
  const {
    thumbnail = "https://via.placeholder.com/150x150",
    trailText,
    byline,
  } = fields;

  return (
    <a
      className="ArticleContainer"
      href={webUrl}
      target="_blank"
      rel="noreferrer"
    >
      <div className="left">
        <div className="imageWrapper">
          <img src={thumbnail} alt="" className="thumbnail" />
        </div>
      </div>
      <div className="right">
        <span className="title">{webTitle}</span>
        <span className="byline">
          {byline}{" "}
          <span className="date">
            {moment(webPublicationDate).format("MM/DD/YYYY h:mm a")}
          </span>
        </span>
        <span
          className="trailText"
          dangerouslySetInnerHTML={{ __html: trailText }}
        />
      </div>
    </a>
  );
};
