import styled from "styled-components";

const ProjectCoverWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: grey;
    background-size: cover;
    background-image: url("/renders/18.jpg");
    background-position: left bottom;
    background-attachment: fixed;
`

const ProjectCover = () => {
    return (
        <ProjectCoverWrapper/>
    )
}

export default ProjectCover