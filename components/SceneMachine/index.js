import { useEffect, useContext, useState } from 'react';
// /@ts-check
import Spinner from './Spinner';
import FieldView from '../../pages/creator/field/view/[slug]';
import SceneMachineTitle from './TitleArea';
import SceneMachineStripArea from './StripArea';
import SceneMachineLeftPanel from './LeftPanel';
import SceneMachineControlPanel from './ControlPanel';
import SceneMachineOverview from './SceneMachineOverview';
import SceneMachineBody from './SceneMachineBody';
import SceneMachineRightPanel from './RightPanel';
import ControlPanelButtons from './ControlPanel/ControlPanelButtons';
import ControlPanelDisplay from './ControlPanel/ControlPanelDisplay';
import ControlPanelContextualMenu from './ControlPanel/ControlPanelContextualMenu';
import { machineView, machineType } from '../../dataModels';
import axios from 'axios';

import {
  TitleButtonProvider,
  ControlPanelButtonsProvider,
  PreviewContextProvider,
  ViewerProvider,
  MachineStateContext,
  ModalProvider,
  DetailViewProvider,
  BoardsProvider,
  ProjectProvider,
  ProjectScenesProvider,
  ShotsProvider,
  ControlPanelButtonsContext,
  ProjectContext,
  TitleButtonContext,
  setProjectContext,
} from '../../contexts/SceneMachineProviders';

/**
 * These Provider provide both the values and setters
 * The providers are split up to prevent unnecessary rerenders
 * @returns context values and setters
 */
const Providers = ({ children }) => {
  return (
    <>
      <BoardsProvider>
        <MachineStateContext>
          <ModalProvider>
            <ViewerProvider>
              {/* <PreviewContextProvider> */}
              <TitleButtonProvider>
                <ControlPanelButtonsProvider>
                  <DetailViewProvider>
                    <ShotsProvider>
                      <ProjectScenesProvider>{children}</ProjectScenesProvider>
                    </ShotsProvider>
                  </DetailViewProvider>
                </ControlPanelButtonsProvider>
              </TitleButtonProvider>
              {/* </PreviewContextProvider> */}
            </ViewerProvider>
          </ModalProvider>
        </MachineStateContext>
      </BoardsProvider>
    </>
  );
};

const FieldOverview = () => {
  const project = useContext(ProjectContext);
  const dispatch = useContext(setProjectContext);
  const [deleteField, setDeleteField] = useState();

  const handleDeleteField = async () => {
    setDeleteField('');
    const { data } = await axios.delete(`/api/field/${project._id}`);
    const slug = data.slug;
    dispatch(['LOAD_PROJECT', { data, slug }]);
  };

  // console.log('PROJECT FIELD OVERVIEW: ', Object.keys(project).length === 0)
  return (
    <>
      {/* <SceneMachineRightPanel /> */}
      {project.name && (
        <div className="page">
          <img src={project.image?.Location} alt="" />

          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Project Name</td>
                <td>{project.name}</td>
              </tr>
              <tr>
                <td>Funded</td>
                <td>{JSON.stringify(project.funding.funded)}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>{JSON.stringify(project.funding.amount)}</td>
              </tr>
              <tr>
                <td>Scene Count</td>
                <td>{project.scenes?.length}</td>
              </tr>
              <tr>
                <td>Script Rev</td>
                <td>{project.script?.rev}</td>
              </tr>
              <tr>
                <td>Production Stage</td>
                <td>{project.production}</td>
              </tr>
              <tr>
                <td>Frame Rate</td>
                <td>{project.frameRate}</td>
              </tr>
              <tr>
                <td>Aspect Ratio</td>
                <td>{project.aspectRatio}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{project.category}</td>
              </tr>
              <tr>
                <td>Contributors</td>
                <td>{project.contributors}</td>
              </tr>
            </tbody>
          </table>
          {/* <pre>{JSON.stringify(project, null, 4)}</pre> */}

          {/* <h3>{machineView.view1.name}</h3> */}
          {/* <pre>{JSON.stringify(project, null, 4)}</pre> */}

          {Object.keys(project).length !== 0 && (
            <div className="delete-field-section">
              <label htmlFor="delete">Type 'delete field' to delete</label>
              <input
                type="text"
                value={deleteField}
                onChange={(e) => setDeleteField(e.target.value)}
              />
              <button
                disabled={deleteField != 'delete field'}
                onClick={handleDeleteField}>
                Delete Field
              </button>
            </div>
          )}

          {/* <label htmlFor="delete-button">Delete Field</label> */}
          {/* <button onClick={handleDeleteField} >Delete Field</button> */}
        </div>
      )}
      {!project.name && (
        <div className="page">
          <h3>Create A Project</h3>
          <div className="inner-page">
            Start by clicking the Add Button on the sidebar.
            <br />
            Fill out the form and submit to create a new project.
            <br />
            From there proceed to add scenes.
            <br />
            From there proceed to add breakdowns of the shots in the scenes.
            <br />
            From there proceed to add content (boards/panels/animation
            frames/videos).
            <br />
            As you do this, open your project to the classifieds. This will
            allow others to see your project and join in helping to complete it.
            
          </div>
        </div>
      )}

      <style jsx>{`
        h3 {
          padding: 20px;
        }
        button {
          padding: 10px;
          cursor: pointer;
        }
        input {
          padding: 10px;
        }
        label {
          padding: 20px;
        }
        img {
          width: 500px;
        }
        table {
          padding: 20px 0px;
          width: 60vw;
          min-width: 400px;
          // border-collapse: collapse;
          margin: 25px 0;
          table-layout: fixed;
          border: #1d1d1d solid 1px;
        }
        th,
        td {
          padding: 12px 15px;
        }
        tbody tr {
          border-bottom: 1px solid #aaaaaa;
        }
        tbody tr:nth-of-type(odd) {
          background-color: #f3f3f3;
        }
        .delete-field-section {
          display: flex;
          flex-direction: column;
        }
        .page {
          // background: rgb(133, 133, 133);

          padding: 40px;
          margin: 20px;
          background: #eee;
          color: #1d1d1d;
          width: 100%;
          display: flex;
          align-items: center;
          //justify-content: center;
          flex-direction: column;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          overflow: scroll;
          border-radius: 3px;
        }
        .inner-page {
          // background: rgb(133, 133, 133);
          line-height: 50px;
          padding: 50px;
          margin: 50px;
          background: #eee;
          color: #1d1d1d;
          width: 80%;
          display: flex;

          //justify-content: center;
          flex-direction: column;

          border: 1px solid #333333b9;
          //overflow: scroll;
          border-radius: 3px;
        }
      `}</style>
    </>
  );
};

const SceneMachineComponents = () => {
  const { display } = useContext(ControlPanelButtonsContext);
  const machine = useContext(TitleButtonContext);
  const [scene, setScene] = useState();

  return (
    <>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      {/* <Spinner opacity={0} /> */}
      <SceneMachineBody>
        <SceneMachineTitle />
        {machine.machine === machineType.asset && (
          <>
            <SceneMachineOverview>
              {/* <FieldOverview /> */}
              <div className="asset-container">
                <FieldView />
                <style jsx>{`
                  .asset-container {
                    margin: 10px;
                    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
                  }
                `}</style>
              </div>
            </SceneMachineOverview>
          </>
        )}
        {machine.machine === machineType.scene && (
          <>
            <SceneMachineStripArea scene={scene} />
            <SceneMachineControlPanel>
              <ControlPanelDisplay />
              <ControlPanelButtons />
              <ControlPanelContextualMenu />
            </SceneMachineControlPanel>
            <SceneMachineOverview>
              {display === machineView.view1.name && <FieldOverview />}
              {display === machineView.view4.name && (
                <>
                  {/* <SceneMachineRightPanel /> */}
                  <div className="page">
                    <h3>{machineView.view2.name}</h3>
                    <style jsx>{`
                      .page {
                        color: #e2e2e2;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      }
                    `}</style>
                  </div>
                </>
              )}
              {display === machineView.view3.name && (
                <>
                  {/* <SceneMachineRightPanel /> */}
                  <div className="page">
                    <h3>{machineView.view3.name}</h3>
                    <style jsx>{`
                      .page {
                        color: #e2e2e2;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      }
                    `}</style>
                  </div>
                </>
              )}
              {display === machineView.view2.name && (
                <>
                  <SceneMachineLeftPanel />
                  <SceneMachineRightPanel scene={scene} setScene={setScene} />
                </>
              )}
              {display === machineView.view5.name && (
                <>
                  {/* <SceneMachineRightPanel /> */}
                  <div className="page">
                    <h3>{machineView.view5.name}</h3>
                    <style jsx>{`
                      .page {
                        color: #e2e2e2;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      }
                    `}</style>
                  </div>
                </>
              )}
            </SceneMachineOverview>
          </>
        )}
      </SceneMachineBody>
    </>
  );
};

const SceneMachine = () => {
  return (
    <>
      <Providers>
        <SceneMachineComponents />
      </Providers>
    </>
  );
};

export default SceneMachine;
