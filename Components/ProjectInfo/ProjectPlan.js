import styled from "styled-components";

const ProjectCoverWrapper = styled.div`
    width: 100vw;
    height: 86.8vw;
    margin-top: 5.5vw;
    background-color: grey;
    background-size: cover;
    background-image: url("/renders/19.jpg");
    background-position: left bottom;
`

const ProjectPlan = () => {
    return (
        <ProjectCoverWrapper/>
    )
}

export default ProjectPlan