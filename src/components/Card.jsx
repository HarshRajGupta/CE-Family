import React from "react";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <img className="circle-img" src={props.img} alt="avatar_img" />
      </div>
      <div className="bottom">
        <p className="info">{props.tel}</p>
        <p className="info">{props.email}</p>
        <div className="links">
          <a href={props.insta} className="icon insta"><img src="https://img.icons8.com/color/48/000000/instagram-new--v2.png" alt="instagram-icon" /></a>
          <a href={props.linkedin} className="icon in"><img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" width="200" alt="linkedin-logo" /></a>
          <a href={props.github} className="icon git"><img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="github-icon" /></a>
        </div>
      </div>
    </div>
  );
}

export default Card;
