import React, { useState } from 'react'
import 'assets/styles/project/projectdocs.css'
import plusBtn from 'assets/image/plusButton.png'
import InputUrlModal from './InputUrlModal'
import Notion from './Notion'

function ProjectDocs({ projectSeq }) {
  const [inputOpen1, setInputOpen1] = useState(false)
  const [inputOpen2, setInputOpen2] = useState(false)
  const [inputOpen3, setInputOpen3] = useState(false)
  const [inputOpen4, setInputOpen4] = useState(false)
  const [inputOpen5, setInputOpen5] = useState(false)
  const [inputOpen6, setInputOpen6] = useState(false)
  const handleToInput1 = () => {
    setInputOpen1(true)
  }
  const handleToInput2 = () => {
    setInputOpen2(true)
  }
  const handleToInput3 = () => {
    setInputOpen3(true)
  }
  const handleToInput4 = () => {
    setInputOpen4(true)
  }
  const handleToInput5 = () => {
    setInputOpen5(true)
  }
  const handleToInput6 = () => {
    setInputOpen6(true)
  }
  const handleToClose = () => {
    setInputOpen1(false)
    setInputOpen2(false)
    setInputOpen3(false)
    setInputOpen4(false)
    setInputOpen5(false)
    setInputOpen6(false)
  }

  const [value1, setValue1] = useState('')
  const handleSetValue1 = (a) => {
    setValue1(a)
  }
  const [value2, setValue2] = useState('')
  const handleSetValue2 = (a) => {
    setValue2(a)
  }
  const [value3, setValue3] = useState('')
  const handleSetValue3 = (a) => {
    setValue3(a)
  }
  const [value4, setValue4] = useState('')
  const handleSetValue4 = (a) => {
    setValue4(a)
  }
  const [value5, setValue5] = useState('')
  const handleSetValue5 = (a) => {
    setValue5(a)
  }
  const [value6, setValue6] = useState('')
  const handleSetValue6 = (a) => {
    setValue6(a)
  }

  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [visible4, setVisible4] = useState(false)
  const [visible5, setVisible5] = useState(false)
  const [visible6, setVisible6] = useState(false)
  const handleDisplayNone1 = () => {
    setVisible1(!visible1)
  }
  const handleDisplayNone2 = () => {
    setVisible2(!visible2)
  }
  const handleDisplayNone3 = () => {
    setVisible3(!visible3)
  }
  const handleDisplayNone4 = () => {
    setVisible4(!visible4)
  }
  const handleDisplayNone5 = () => {
    setVisible5(!visible5)
  }
  const handleDisplayNone6 = () => {
    setVisible6(!visible6)
  }

  return (
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-title">프로젝트 문서</div>
      </div>
      <div className="docs-list">
        <div className="docs-list-item" onClick={handleDisplayNone1}>
          <div className="docs-list-item-title">Git Convention</div>
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
        {visible1 && <Notion className="docs-notion" value={value1}></Notion>}
        {}
        <div className="docs-list-item" onClick={handleDisplayNone2}>
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
        {visible2 && <Notion className="docs-notion" value={value2}></Notion>}
        {}
        <div className="docs-list-item" onClick={handleDisplayNone3}>
          <div className="docs-list-item-title">Branch Rule</div>
          <div className="docs-list-item-plus" onClick={handleToInput3}>
            <img src={plusBtn} alt="" />
          </div>
          <InputUrlModal
            open={inputOpen3}
            onClose={handleToClose}
            inputTitle="Branch Rule"
            handleSetValue={handleSetValue3}
          ></InputUrlModal>
        </div>
        {visible3 && <Notion className="docs-notion" value={value3}></Notion>}
        {}
      </div>
      <div className="docs-list-item" onClick={handleDisplayNone4}>
        <div className="docs-list-item-title">요구 사항 명세서</div>
        <div className="docs-list-item-plus" onClick={handleToInput4}>
          <img src={plusBtn} alt="" />
        </div>
        <InputUrlModal
          open={inputOpen4}
          onClose={handleToClose}
          inputTitle="요구 사항 명세서"
          handleSetValue={handleSetValue4}
        ></InputUrlModal>
      </div>
      {visible4 && <Notion className="docs-notion" value={value4}></Notion>}
      {}
      <div className="docs-list-item" onClick={handleDisplayNone5}>
        <div className="docs-list-item-title">기능 명세서</div>
        <div className="docs-list-item-plus" onClick={handleToInput5}>
          <img src={plusBtn} alt="" />
        </div>
        <InputUrlModal
          open={inputOpen5}
          onClose={handleToClose}
          inputTitle="기능 명세서"
          handleSetValue={handleSetValue5}
        ></InputUrlModal>
      </div>
      {visible5 && <Notion className="docs-notion" value={value5}></Notion>}
      {}
      <div className="docs-list-item" onClick={handleDisplayNone6}>
        <div className="docs-list-item-title">와이어 프레임</div>
        <div className="docs-list-item-plus" onClick={handleToInput6}>
          <img src={plusBtn} alt="" />
        </div>
        <InputUrlModal
          open={inputOpen6}
          onClose={handleToClose}
          inputTitle="와이어 프레임"
          handleSetValue={handleSetValue6}
        ></InputUrlModal>
      </div>
      {visible6 && <Notion className="docs-notion" value={value6}></Notion>}
      {}
    </div>
  )
}

export default ProjectDocs
