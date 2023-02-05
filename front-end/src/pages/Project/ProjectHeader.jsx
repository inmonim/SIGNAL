import React, { useState } from 'react'
import 'assets/styles/projectDetail.css'
import settings from 'assets/image/settings.png'
import ProjectDetail from '../../components/Project/ProjectDetail'
import ProjectMaintainPage from './ProjectMaintainPage'

function ProjectHeader() {
  // const navigate = useNavigate()

  // const location = useLocation()
  // const projectSeq = location.state.applySeq
  // const userSeq = sessionStorage.getItem('userSeq')

  const [mode, setMode] = useState(0)

  return (
    <div className="project-header-container">
      <div className="project-header-width">
        <img
          className="project-header-img-settings"
          src={settings}
          alt=""
          onClick={() => {
            setMode(1)
          }}
        />
        {mode === 0 ? <ProjectDetail></ProjectDetail> : <ProjectMaintainPage></ProjectMaintainPage>}
      </div>
    </div>
  )
}

export default ProjectHeader
