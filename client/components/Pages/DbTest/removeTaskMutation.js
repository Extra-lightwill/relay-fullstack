import Relay from 'react-relay';


export default class removeTaskMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Mark complete as optional
    Task: () => Relay.QL`
      fragment on Task {
        id,
        text
        }
    `,
    // TODO: Mark completedCount and totalCount as optional
    viewer: () => Relay.QL`
      fragment on User {
       tasks (first: 10) {
          edges
        }
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{removeTask}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on removeTaskPayload @relay(pattern: true) {
        deletedTaskId,
        viewer {
          tasks {
            edges
          }
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'Task',
      deletedIDFieldName: 'deletedTaskId',
    }];
  }
  getVariables() {
    return {
      id: this.props.Task.id,
    };
  }
}

  /*getOptimisticResponse() {
    const viewerPayload = {id: this.props.viewer.id};
    if (this.props.viewer.completedCount != null) {
      viewerPayload.completedCount = this.props.todo.complete === true ?
        this.props.viewer.completedCount - 1 :
        this.props.viewer.completedCount;
    }
    if (this.props.viewer.totalCount != null) {
      viewerPayload.totalCount = this.props.viewer.totalCount - 1;
    }
    return {
      deletedTodoId: this.props.todo.id,
      viewer: viewerPayload,
    };
  }*/