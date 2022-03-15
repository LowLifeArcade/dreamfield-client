import SceneMachine from "../../../components/SceneMachine"

const CreatorEdit = () => {
  return (

    <div className='body'>
      <SceneMachine />
      <style jsx>{`
        .body {
          display: flex;
          justify-content: center;
          // align-items: flex-end;
          background: linear-gradient(rgb(52, 75, 97), rgb(180, 216, 147));
          height: 100%;
          width: 100%;
        }
        .background {
          background: black;
        }
        `}</style>
    </div>
  )
}

export default CreatorEdit
