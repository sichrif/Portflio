import React from 'react'
import styled from 'styled-components';
import FacebookIcon from '@material-ui/icons/Facebook';
import GithubIcon from '@material-ui/icons/GitHub';
import YoutubeIcon from '@material-ui/icons/YouTube';
import { LinkedIn } from '@material-ui/icons';
import Particle from '../Components/Particle';
import All from '../Components/Technologies/All';
import Floating from '../Components/floatingpc/Floating';

function HomePage() {
    return (
        <>
        <HomePageStyled>
            
            <div className="particle-con">
                <Particle />
            </div>
            <div className="typography">
                <h1 style={{paddingTop:"100px"}} >Hi, I'm <span>Mohamed cherif</span></h1>
                <p>
                    Welcome to my portfolio here you're going to get to know the fullstack developer 
                    you're just about to hire 😉
                </p>
                
                <div className="icons">
                    <a href="https://www.facebook.com/sichrife/" className="icon i-facebook">
                        <FacebookIcon />
                    </a>
                    <a href="https://github.com/sichrif" className="icon i-github">
                        <GithubIcon />  
                    </a>
                    <a href="https://www.linkedin.com/in/med-cherif-js/" className="icon i-linkedin">
                        <LinkedIn />
                    </a>
                   
                </div>
                <p>Here's a little tease of the computer i'm going to be working on your project  </p>
                <p>Go ahead close it you have my permission</p>
                <Floating/> 

            </div>
           

        </HomePageStyled>
        
</>
    )
}

const HomePageStyled = styled.header`
    width: 100%;
    height: 100vh;
    position: absolute;
   
    .typography{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 80%;
        height:100vh;

        .icons{
            display: flex;
            justify-content: center;
            margin-top: 1rem;
            .icon{
                border: 2px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all .4s ease-in-out;
                cursor: pointer;
                &:hover{
                    border: 2px solid var(--primary-color);
                    color: var(--primary-color);
                }
                &:not(:last-child){
                    margin-right: 1rem;
                }
                svg{
                    margin: .5rem;
                }
            }

            .i-youtube{
                &:hover{
                    border: 2px solid red;
                    color: red;
                }
            }
            .i-github{
                &:hover{
                    border: 2px solid #5F4687;
                    color: #5F4687;
                }
            }
        }
    }
`;

export default HomePage;
