import React, { useState } from 'react'
import 'assets/styles/project/projectdocs.css'
import plusBtn from 'assets/image/plusButton.png'
import InputUrlModal from './InputUrlModal'
import Notion from './Notion'

function ProjectDocs() {
  const [inputOpen1, setInputOpen1] = useState(false)
  const [inputOpen2, setInputOpen2] = useState(false)
  const handleToInput1 = () => {
    setInputOpen1(true)
  }
  const handleToInput2 = () => {
    setInputOpen2(true)
  }
  const handleToClose = () => {
    setInputOpen1(false)
    setInputOpen2(false)
  }

  // const [inputTitle, setInputTitle] = useState('')

  const [value1, setValue1] = useState('')
  const handleSetValue1 = (a) => {
    setValue1(a)
    // setInputTitle('Git Convention')
  }
  const [value2, setValue2] = useState('')
  const handleSetValue2 = (a) => {
    setValue2(a)
    // setInputTitle('Naming Convention')
  }
  // const [value1, setValue1] = useState('')
  // const handleSetValue = (a) => {
  //   setValue1(a)
  // }
  // const [value1, setValue1] = useState('')
  // const handleSetValue = (a) => {
  //   setValue1(a)
  // }
  // const [value1, setValue1] = useState('')
  // const handleSetValue = (a) => {
  //   setValue1(a)
  // }
  // const [value1, setValue1] = useState('')
  // const handleSetValue = (a) => {
  //   setValue1(a)
  // }

  const [visible, setVisible] = useState(true)
  const handleDisplayNone = () => {
    setVisible(!visible)
    console.log(visible)
  }

  return (
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-title">프로젝트 문서</div>
      </div>
      <div className="docs-list">
        <div className="docs-list-item">
          <div className="docs-list-item-title" onClick={handleDisplayNone}>
            Git Convention
          </div>
          <div className="docs-list-item-plus" onClick={handleToInput1}>
            <img src={plusBtn} alt="" />
          </div>
          <InputUrlModal
            open={inputOpen1}
            onClose={handleToClose}
            inputTitle="Git Convention"
            handleSetValue={handleSetValue1}
          ></InputUrlModal>
        </div>
        {visible && <Notion className="docs-notion" value={value1}></Notion>}
        {}
        <div className="docs-list-item">
          <div className="docs-list-item-title">Naming Convention</div>
          <div className="docs-list-item-plus" onClick={handleToInput2}>
            <img src={plusBtn} alt="" />
          </div>
          <InputUrlModal
            open={inputOpen2}
            onClose={handleToClose}
            inputTitle="Naming Convention"
            handleSetValue={handleSetValue2}
          ></InputUrlModal>
        </div>
        <div>
          <Notion value={value2}></Notion>
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
