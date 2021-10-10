import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import resume from "../img/resume.jpg";
import PrimaryButton from "./PrimaryButton";
import avatar from '../img/avatar.png';

function ImageSection() {
  const [reveal, setReveal] = useState(false);
  const handleclick = () => {
    if (reveal) {
      setReveal(false);
    } else {
      setReveal(true);
    }
  };
  return (
    <ImageSectionStyled>
      <div className="left-content">
        <img  src={avatar} alt="" />
      </div>
      <div className="right-content">
        <h4>
          I am <span>Mohamed Cherif</span>
        </h4>
        <p className="paragraph">
          I'm a passionate programmer i mean even if someone asks me what's your
          hobby that's my answer i develop websites and mobile apps from scratch
          from the database to the webservices till i perfect my app with a
          modern frontend using top notch Technologies and it always depends on
          the custommer needs and what the app actually requires also to finish
          my words here let me do it with a joke ,{" "}
          <Button onClick={handleclick}>Click to reveal the joke </Button>
          <Dialog
            open={reveal}
            onClose={handleclick}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
         
            <DialogContent>
              <DialogContentText style={{color:'red'}} id="alert-dialog-description">
                I don't joke about my passion sorry
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button  style={{color:'green', fontSize:'10px'}} onClick={handleclick} autoFocus>
                I understand
              </Button>
            </DialogActions>
          </Dialog>
        </p>
        <div className="about-info">
          <div className="info-title">
            <p>Full Name</p>
            <p>Age</p>
            <p>Nationality </p>
            <p>Languages </p>
            <p>Location</p>
            <p>Service</p>
          </div>
          <div className="info">
            <p>: Cherif Mohamed</p>
            <p>: { new Date().getFullYear()-1999} </p>
            <p>: Tunisian </p>
            <p>: English, French, Arabic </p>
            <p>: Tunisia, Bizerte</p>
            <p>: Freelance</p>
          </div>
        </div>
        <a href={'/CV-Cherif-EN.pdf'} download="/CV-Cherif-EN.pdf" target='_blank' >
        <PrimaryButton  title={"Download Cv"} />
        </a>
      </div>
    </ImageSectionStyled>
  );
}

const ImageSectionStyled = styled.div`
  margin-top: 5rem;
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    .left-content {
      margin-bottom: 2rem;
    }
  }
  .left-content {
    width: 100%;
    img {
      width: 77%;
      object-fit: cover;
    }
  }
  .right-content {
    width: 100%;
    h4 {
      font-size: 2rem;
      color: var(--white-color);
      span {
        font-size: 2rem;
      }
    }
    .paragraph {
      padding: 1rem 0;
    }
    .about-info {
      display: flex;
      padding-bottom: 1.4rem;
      .info-title {
        padding-right: 3rem;
        p {
          font-weight: 600;
        }
      }
      .info-title,
      .info {
        p {
          padding: 0.3rem 0;
        }
      }
    }
  }
`;
export default ImageSection;
