import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectBody from '../../components/project/ProjectBody';
import { getProjects, portfolioProject } from '../../modules/portfolioProject';

const ProjectBodyContainer = () => {
    const { projects } = useSelector((state) => state.portfolioProject);

    const dispatch = useDispatch();

    const onDeleteProject = (id) => {
        dispatch(portfolioProject.actions.deleteProject(id));
    };

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    return (
        <div>
            <ProjectBody
                projects={projects}
                onDeleteProject={onDeleteProject}
            />
        </div>
    );
};

export default ProjectBodyContainer;
