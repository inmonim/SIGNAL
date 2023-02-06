import React, { useState } from 'react'
import 'assets/styles/project/projectdocs.css'
import plusBtn from 'assets/image/plusButton.png'
import InputUrlModal from './InputUrlModal'

function ProjectDocs() {
  const [inputOpen, setInputOpen] = useState(false)
  const handleToInput = () => {
    setInputOpen(true)
  }
  const handleToClose = () => {
    setInputOpen(false)
  }
  return (
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-title">프로젝트 문서</div>
      </div>
      <div className="docs-list">
        <div className="docs-list-item">
          <div className="docs-list-item-title">Git Convention</div>
          <div className="docs-list-item-plus" onClick={handleToInput}>
            <img src={plusBtn} alt="" />
          </div>
          <InputUrlModal open={inputOpen} onClose={handleToClose} inputTitle="Git Convention"></InputUrlModal>
        </div>
        <div className="docs-list-item">
          <div className="docs-list-item-title">Naming Convention</div>
          <div className="docs-list-item-plus">
            <img src={plusBtn} alt="" />
          </div>
        </div>
        <div className="docs-list-item">
          <div className="docs-list-item-title">Branch Rule</div>
          <div className="docs-list-item-plus">
            <img src={plusBtn} alt="" />
          </div>
        </div>
        <div className="docs-list-item">
          <div className="docs-list-item-title">요구 사항 명세서</div>
          <div className="docs-list-item-plus">
            <img src={plusBtn} alt="" />
          </div>
        </div>
        <div className="docs-list-item">
          <div className="docs-list-item-title">기능 명세서</div>
          <div className="docs-list-item-plus">
            <img src={plusBtn} alt="" />
          </div>
        </div>
        <div className="docs-list-item">
          <div className="docs-list-item-title">와이어 프레임</div>
          <div className="docs-list-item-plus">
            <img src={plusBtn} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDocs
