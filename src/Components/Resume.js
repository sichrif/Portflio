import React from 'react';
import styled from 'styled-components';
import {InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import SmallTitle from '../Components/SmallTitle';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SchoolIcon from '@material-ui/icons/School';
import ResumeItem from '../Components/ResumeItem';

function Resume() {
    const briefcase = <BusinessCenterIcon />
    const school = <SchoolIcon />
    return (
        <ResumeStyled>
            <Title title={'Resume'} span={'resume'} />
            <InnerLayout>
                <div className="small-title">
                    <SmallTitle icon={briefcase} title={'Working Experience'} />
                </div>
                <div className="resume-content">
                 
                    <ResumeItem 
                        year={'2021 - Present'} 
                        title={'Web Master'}
                        subTitle={'Ab Serve'}
                        text={'Head of It Department'} 
                    />
                      <ResumeItem 
                        year={'01/07/2021 - 30/09/2021'} 
                        title={'Web Integrator '}
                        subTitle={'Atayen'}
                        text={'Angular Development'} 
                    />
                       <ResumeItem 
                        year={'01/02/2021 - 30/06/2021'} 
                        title={'Full Stack Developer Intern'}
                        subTitle={'Ab Serve'}
                        text={" • Design and develop server-side logic using Laravel • Build Innovative, state-of-[heart applications implementing User Experience (DX) design process • Implement fronbend components with Yue.js framework • Lead the entire web application development life cycle right from concept stage to delivery and port launch support • Document the development process, architecture, and standard components • Coordinate with cortevelopers and keeps project manager well informed of the status of development effort and serves as liaison between development staff and project manager • Keep abreast of new trends and best practices In web development • Design and build advanced applications for the Android platform. • Work with outside data sources and API's. • Implementing Artificial Intelligence within the android app to build a face recognition neural network and use it. • Work on bug fixing and improving application performance. • Define and maintain MySql database."} 
                    />
                    <ResumeItem 
                        year={'01/01/2020 - 30/02/2020'} 
                        title={'Mern Developer - Intern'}
                        subTitle={'Aurax'}
                        text={'Building interactive consumer data from multiple systems and RESTfully abstract to the UI through  NodeJs backend, Define code architecture decisions to support a high-performance and scalable product with a minimal footprint And Address and improve any technical issues                   '} 
                    />
                </div>
                <div className="small-title u-small-title-margin">
                    <SmallTitle icon={school} title={'Educational Qualifications'} />
                </div>
                <div className="resume-content ">
                <ResumeItem 
                        year={'Present => 2023'} 
                        title={"Master's Degree in Open Source Software Engineering (MP2L)"}
                        subTitle={'ISI Ariana'}
                        text={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil impedit natus nostrum? Velit accusantium id quos, nihil vel quod.Quas, magni mollitia, aspernatur consequatur accusamus vero eum facere exercitationem velit suscipit ipsam placeat libero. '} 
                    />
                <ResumeItem 
                        year={'2018 - 2021'} 
                        title={'Bachelor Degree in Information Systems Development (DSI)'}
                        subTitle={'ISET BIZERTE'}
                        text={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil impedit natus nostrum? Velit accusantium id quos, nihil vel quod.Quas, magni mollitia, aspernatur consequatur accusamus vero eum facere exercitationem velit suscipit ipsam placeat libero. '} 
                    />
                    <ResumeItem 
                        year={'2014 - 2018'} 
                        title={'High School Degree in Computer Science'}
                        subTitle={'Habib Thameur , Bizerte'}
                        text={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil impedit natus nostrum? Velit accusantium id quos, nihil vel quod.Quas, magni mollitia, aspernatur consequatur accusamus vero eum facere exercitationem velit suscipit ipsam placeat libero. '} 
                    />
                </div>
            </InnerLayout>
        </ResumeStyled>    
    )
}

const ResumeStyled = styled.section`
    .small-title{
        padding-bottom: 3rem;
    }
    .u-small-title-margin{
        margin-top: 4rem;
    }

    .resume-content{
        border-left: 2px solid var(--border-color);
    }
`;
export default Resume
